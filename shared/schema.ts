import { pgTable, text, serial, integer, date } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const vehicles = pgTable("vehicles", {
  slNo: serial("sl_no").primaryKey(),
  regNo: text("reg_no").notNull().unique(),
  make: text("make").notNull(),
  model: text("model").notNull(),
  mfgYear: integer("mfg_year").notNull(),
  regDate: date("reg_date").notNull(),
  entityName: text("entity_name").notNull(),
  runningSite: text("running_site"),
  engineNo: text("engine_no").notNull(),
  chassisNo: text("chassis_no").notNull(),
  seatCapacity: integer("seat_capacity").notNull(),
  vehicleType: text("vehicle_type").notNull(), // Bus/Winger/TT
  acStatus: integer("ac_status").notNull().default(0), // 0=Non-AC, 1=AC
  status: text("status").notNull().default("Active"), // Active/Inactive
});

export const insertVehicleSchema = createInsertSchema(vehicles).omit({
  slNo: true,
});

export type InsertVehicle = z.infer<typeof insertVehicleSchema>;
export type Vehicle = typeof vehicles.$inferSelect;
