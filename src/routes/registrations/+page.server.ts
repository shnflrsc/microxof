import { desc, getTableColumns } from "drizzle-orm";
import { registrations as regisrationsTable } from "$lib/server/db/schema";
import { db } from "$lib/server/db";
import type { Registration } from "$lib/server/db/schema";

export const load = async () => {

    const columns = getTableColumns(regisrationsTable);
    const columnNames = Object.keys(columns);

    let registrations: Registration[] = [];

    try {
        registrations = await db
            .select()
            .from(regisrationsTable)
            .orderBy(desc(regisrationsTable.createdAt));
    } catch (error) {
        console.error("Failed to fetch registrations", error);
    }
  
    return {
        columns: columnNames,
        registrations: registrations || [],
  };
};