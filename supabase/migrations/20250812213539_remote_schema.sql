drop extension if exists "pg_net";

create sequence "public"."site_settings_id_seq";


  create table "public"."site_settings" (
    "id" bigint not null default nextval('site_settings_id_seq'::regclass),
    "key" text not null,
    "value" text not null,
    "updated_at" timestamp with time zone default now()
      );


alter table "public"."site_settings" enable row level security;

alter sequence "public"."site_settings_id_seq" owned by "public"."site_settings"."id";

CREATE UNIQUE INDEX site_settings_key_key ON public.site_settings USING btree (key);

CREATE UNIQUE INDEX site_settings_pkey ON public.site_settings USING btree (id);

alter table "public"."site_settings" add constraint "site_settings_pkey" PRIMARY KEY using index "site_settings_pkey";

alter table "public"."site_settings" add constraint "site_settings_key_key" UNIQUE using index "site_settings_key_key";

grant delete on table "public"."site_settings" to "anon";

grant insert on table "public"."site_settings" to "anon";

grant references on table "public"."site_settings" to "anon";

grant select on table "public"."site_settings" to "anon";

grant trigger on table "public"."site_settings" to "anon";

grant truncate on table "public"."site_settings" to "anon";

grant update on table "public"."site_settings" to "anon";

grant delete on table "public"."site_settings" to "authenticated";

grant insert on table "public"."site_settings" to "authenticated";

grant references on table "public"."site_settings" to "authenticated";

grant select on table "public"."site_settings" to "authenticated";

grant trigger on table "public"."site_settings" to "authenticated";

grant truncate on table "public"."site_settings" to "authenticated";

grant update on table "public"."site_settings" to "authenticated";

grant delete on table "public"."site_settings" to "service_role";

grant insert on table "public"."site_settings" to "service_role";

grant references on table "public"."site_settings" to "service_role";

grant select on table "public"."site_settings" to "service_role";

grant trigger on table "public"."site_settings" to "service_role";

grant truncate on table "public"."site_settings" to "service_role";

grant update on table "public"."site_settings" to "service_role";


  create policy "Allow authenticated users to insert"
  on "public"."site_settings"
  as permissive
  for insert
  to public
with check ((auth.role() = 'authenticated'::text));



  create policy "Allow authenticated users to update"
  on "public"."site_settings"
  as permissive
  for update
  to public
using ((auth.role() = 'authenticated'::text));



  create policy "Allow public read access"
  on "public"."site_settings"
  as permissive
  for select
  to public
using (true);



