import { json } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

import { db } from '$lib/server/db';
import { registrations } from '$lib/server/db/schema';

export async function DELETE({ params }) {
	const id = Number(params.id);

	if (!Number.isInteger(id)) {
		return json({ error: 'Invalid registration id' }, { status: 400 });
	}

	try {
		const deletedRows = await db
			.delete(registrations)
			.where(eq(registrations.id, id))
			.returning({ id: registrations.id });

		if (deletedRows.length === 0) {
			return json({ error: 'Registration not found' }, { status: 404 });
		}

		return json({ message: 'Registration deleted successfully' }, { status: 200 });
	} catch (error) {
		return json({ error: 'Internal Server Error' }, { status: 500 });
	}
}