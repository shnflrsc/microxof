import { json } from "@sveltejs/kit";
import { AsyncParser } from '@json2csv/node';
import { db } from "$lib/server/db";
import { registrations } from "$lib/server/db/schema";
import { desc } from "drizzle-orm";

export async function GET() {
    try {
        const rows = await db.select().from(registrations).orderBy(desc(registrations.createdAt));

        if (!rows || rows.length === 0) {
            return json({ error: 'No data to export' }, { status: 400 });
        }

        const parser = new AsyncParser();
        const csv = await parser.parse(rows).promise();
        
        return new Response(csv, {
            status: 200,
            headers: {
                'Content-Type': 'text/csv',
                'Content-Disposition': 'attachment; filename="microxof_registrations_export.csv"',
                'Cache-Control': 'no-cache'
            }
        });
    } catch (error) {
        return json({ error: 'Internal Server Error' }, { status: 500 });
    }
}