import type {
  InferEnum,
  InferInsertModel,
  InferSelectModel,
} from "drizzle-orm";
import {
  pgTable,
  text,
  serial,
  varchar,
  date,
  pgEnum,
  timestamp,
} from "drizzle-orm/pg-core";

export const genderEnum = pgEnum("gender", ["female", "male", "non_binary", "other"]);
export const yearLevelEnum = pgEnum("year_level", [
  "freshman",
  "sophomore",
  "junior",
  "senior",
]);
export const collegeEnum = pgEnum("college", [
  "CAFA",
  "CAL",
  "CBEA",
  "CCJE",
  "CHTM",
  "CICT",
  "CIT",
  "CLaw",
  "CN",
  "COE",
  "CPTEd",
  "CS",
  "CSER",
  "CSSP",
  "GS",
]);

export const registrations = pgTable("registrations", {
  id: serial("id").primaryKey(),
  firstName: varchar("first_name", { length: 255 }).notNull(),
  middleName: varchar("middle_name", { length: 255 }),
  lastName: varchar("last_name", { length: 255 }).notNull(),
  suffix: varchar("suffix", { length: 10 }),
  email: varchar("email", { length: 255 }).notNull(),
  birthdate: date("birthdate").notNull(),
  gender: genderEnum("gender").notNull(),
  studentNumber: varchar("student_number", { length: 10 }).notNull(),
  yearLevel: yearLevelEnum("year_level").notNull(),
  college: collegeEnum("college").notNull(),
  program: varchar("program", { length: 255 }).notNull(),
  contactNumber: varchar("contact_number", { length: 11 }).notNull(),
  address: text("address").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export type Gender = InferEnum<typeof genderEnum>;
export type YearLevel = InferEnum<typeof yearLevelEnum>;
export type College = InferEnum<typeof collegeEnum>;

export type Registration = InferSelectModel<typeof registrations>;
export type NewRegistration = InferInsertModel<typeof registrations>;
