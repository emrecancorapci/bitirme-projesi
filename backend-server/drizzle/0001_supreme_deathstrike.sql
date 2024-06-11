ALTER TABLE "sensor_data" ALTER COLUMN "sensor_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "sensor_data" ALTER COLUMN "value" SET DATA TYPE smallint;--> statement-breakpoint
ALTER TABLE "sensor_data" ALTER COLUMN "value" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "sensor_data" ALTER COLUMN "time" SET DATA TYPE bigint;--> statement-breakpoint
ALTER TABLE "sensor_data" ALTER COLUMN "time" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "sensors" ALTER COLUMN "name" SET NOT NULL;