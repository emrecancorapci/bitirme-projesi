CREATE TABLE IF NOT EXISTS "sensor_data" (
	"id" serial PRIMARY KEY NOT NULL,
	"sensor_id" integer,
	"value" integer,
	"time" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "sensors" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(64),
	"short" varchar(2),
	"unit" varchar(16)
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "sensor_data" ADD CONSTRAINT "sensor_data_sensor_id_sensors_id_fk" FOREIGN KEY ("sensor_id") REFERENCES "public"."sensors"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
