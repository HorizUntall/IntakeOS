CREATE INDEX "user_id_idx" ON "entries" USING btree ("userId");--> statement-breakpoint
CREATE INDEX "created_at_idx" ON "entries" USING btree ("created_at");