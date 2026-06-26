import { db } from "$lib/server/db";
import { fail } from "@sveltejs/kit";
import type { Actions } from "./$types";
import {
  type NewRegistration,
  type Gender,
  type YearLevel,
  type College,
  registrations as registrationsTable,
} from "$lib/server/db/schema";
import { createSuffix } from "$lib/utils";

export const actions: Actions = {
  submit: async (event) => {
    const formData = await event.request.formData();
    const firstName = formData.get("first_name")?.toString() ?? "";
    const middleName = formData.get("middle_name")?.toString() ?? "";
    const lastName = formData.get("last_name")?.toString() ?? "";
    const email = formData.get("email")?.toString() ?? "";
    const birthdate = formData.get("birthdate")?.toString() ?? "";
    const gender = formData.get("gender")?.toString() ?? "";
    const studentNumber = formData.get("student_number")?.toString() ?? "";
    const yearLevel = formData.get("year_level")?.toString() ?? "";
    const college = formData.get("college")?.toString() ?? "";
    const program = formData.get("program")?.toString() ?? "";
    const contactNumber = formData.get("contact_number")?.toString() ?? "";
    const address = formData.get("address")?.toString() ?? "";

    const suffix = createSuffix(firstName, lastName, middleName);

    const newRegistration: NewRegistration = {
      firstName: firstName,
      middleName: middleName,
      lastName: lastName,
      suffix: suffix,
      email: email,
      birthdate: birthdate,
      gender: gender as Gender,
      studentNumber: studentNumber,
      yearLevel: yearLevel as YearLevel,
      college: college as College,
      program: program,
      contactNumber: contactNumber,
      address: address,
    };

    try {
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
    } catch (error) {
      console.error("CRITICAL DRIZZLE ERROR:", error);
      return fail(500, {
        message: "Registration failed. Please try again.",
      });
    }
  },
};