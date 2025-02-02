CREATE TABLE "momento_post" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"content" text,
	"image" text,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	"user_id" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "momento_user" DROP CONSTRAINT "momento_user_handle_unique";--> statement-breakpoint
ALTER TABLE "momento_post" ADD CONSTRAINT "momento_post_user_id_momento_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."momento_user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "momento_user" DROP COLUMN "handle";--> statement-breakpoint
ALTER TABLE "momento_user" ADD CONSTRAINT "momento_user_name_unique" UNIQUE("name");