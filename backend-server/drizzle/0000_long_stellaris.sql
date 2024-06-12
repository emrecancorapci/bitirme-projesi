CREATE TABLE IF NOT EXISTS "sensor_data" (
	"id" serial PRIMARY KEY NOT NULL,
	"time" bigint NOT NULL,
	"tp" smallint,
	"hd" smallint,
	"ph" numeric(4, 2),
	"gh" smallint,
	"aq" smallint,
	"lt" smallint
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "sensors" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(64) NOT NULL,
	"short" varchar(2),
	"unit" varchar(16)
);
