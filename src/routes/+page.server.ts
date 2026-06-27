import { db } from "$lib/server/db";
import { fail } from "@sveltejs/kit";
import type { Actions } from "./$types";
import {
  type NewRegistration,
  type Suffix,
  type Gender,
  type YearLevel,
  type College,
  registrations as registrationsTable,
} from "$lib/server/db/schema";

export const actions: Actions = {
  submit: async (event) => {
    const formData: FormData = await event.request.formData();
    const firstName = formData.get("first_name")?.toString() ?? "";
    const middleName = formData.get("middle_name")?.toString() ?? "";
    const lastName = formData.get("last_name")?.toString() ?? "";
    let suffix: string | null = formData.get("suffix")?.toString() ?? "";
    const email = formData.get("email")?.toString() ?? "";
    const birthdate= formData.get("birthdate")?.toString() ?? "";
    const gender = formData.get("gender")?.toString() ?? "";
    const studentNumber = formData.get("student_number")?.toString() ?? "";
    const yearLevel = formData.get("year_level")?.toString() ?? "";
    const college = formData.get("college")?.toString() ?? "";
    const program= formData.get("program")?.toString() ?? "";
    const contactNumber = formData.get("contact_number")?.toString() ?? "";
    const address = formData.get("address")?.toString() ?? "";
    const receiptNumber = formData.get("receipt_number")?.toString() ?? "";

    if (suffix === "") {
      suffix = null;
    }

    try {

      const newRegistration: NewRegistration = {
        firstName: firstName,
        middleName: middleName,
        lastName: lastName,
        suffix: suffix as Suffix | null,
        email: email,
        birthdate: birthdate,
        gender: gender as Gender,
        studentNumber: studentNumber,
        yearLevel: yearLevel as YearLevel,
        college: college as College,
        program: program,
        contactNumber: contactNumber,
        address: address,
        receiptNumber: receiptNumber,
    };

      const insertedRows = await db.insert(registrationsTable).values(newRegistration).returning();

      console.log("=== DATABASE INSERTION ATTEMPT ===");
      console.log("Inserted rows returned from Postgres:", insertedRows);

      if (!insertedRows || insertedRows.length === 0) {
        return fail(500, {
          success: false,
          message: "The database accepted the query but did not save the record.",
        });
      }

      return {
        success: true,
        message: "You have successfully registered.",
      };
    } catch (error: any) {
      console.error("CRITICAL DRIZZLE ERROR:", error);
      return fail(500, {
        success: false,
        message: `Registration failed: ${error.cause || error.message || "Unknown error"}`,
      });
    }
  },
};