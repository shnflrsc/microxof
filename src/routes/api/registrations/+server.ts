import { db } from '$lib/server/db';
import { registrations } from '$lib/server/db/schema';
import { json } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

export async function DELETE({ params, request }) {
    const { id } = params;

    try {
        const deletedRows = await db.delete(registrations).where(eq(registrations.id, Number(id)));

        if (deletedRows.length === 0) {
            return json({ error: 'Registration not found' }, { status: 404 });
        }

        return json({ message: 'Registration deleted successfully' }, { status: 200 });
    } catch (error) {
        return json({ error: 'Internal Server Error' }, { status: 500 });
    }
}