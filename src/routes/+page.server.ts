import { db } from "$lib/server/db";
import type { Actions } from "./$types";
import {
  type NewRegistrant,
  type Gender,
  type YearLevel,
  type College,
  registrants as registrantsTable,
} from "$lib/server/db/schema";

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

    const fInitial = firstName.charAt(0);
    const mInitial = middleName ? middleName.charAt(0) : "";
    const lInitial = lastName.charAt(0);

    const suffix = `${fInitial}${mInitial}${lInitial}`.toUpperCase();

    const newRegistrant: NewRegistrant = {
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

    await db.insert(registrantsTable).values(newRegistrant);

    await db.select().from(registrantsTable);
  },
};
