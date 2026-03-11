CREATE TABLE "users" (
	"clerk_id" text PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"api_key" text,
	"calorie_min" integer DEFAULT 1200,
	"calorie_goal" integer DEFAULT 2000,
	"protein_goal" integer DEFAULT 150 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "users_api_key_unique" UNIQUE("api_key")
);
--> statement-breakpoint
ALTER TABLE "entries" ALTER COLUMN "created_at" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "entries" ALTER COLUMN "created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "entries" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "entries" ADD COLUMN "userId" text NOT NULL;