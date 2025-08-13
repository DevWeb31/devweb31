--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4
-- Dumped by pg_dump version 17.4 (Debian 17.4-1.pgdg120+2)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: audit_log_entries; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) FROM stdin;
00000000-0000-0000-0000-000000000000	da45bbbc-4291-4533-a258-1a8788a815ca	{"action":"user_invited","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"contact@devweb31.fr","user_id":"293cb60d-8fe4-4502-b4fa-c0e4dcb156cc"}}	2025-08-11 02:15:51.25351+00	
00000000-0000-0000-0000-000000000000	861eda75-8ae2-4279-b55c-793a05b1cd9c	{"action":"user_signedup","actor_id":"293cb60d-8fe4-4502-b4fa-c0e4dcb156cc","actor_username":"contact@devweb31.fr","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-08-11 02:16:27.494081+00	
00000000-0000-0000-0000-000000000000	113a7463-2494-42cb-8e3b-09078637cecc	{"action":"user_recovery_requested","actor_id":"293cb60d-8fe4-4502-b4fa-c0e4dcb156cc","actor_username":"contact@devweb31.fr","actor_via_sso":false,"log_type":"user"}	2025-08-11 02:17:50.229456+00	
00000000-0000-0000-0000-000000000000	7c30b74e-587d-4cb4-9307-530ec13c936b	{"action":"login","actor_id":"293cb60d-8fe4-4502-b4fa-c0e4dcb156cc","actor_username":"contact@devweb31.fr","actor_via_sso":false,"log_type":"account"}	2025-08-11 02:18:02.712564+00	
00000000-0000-0000-0000-000000000000	a7998ca2-5b0a-4269-ace1-3e97e03f3d2d	{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"contact@devweb31.fr","user_id":"293cb60d-8fe4-4502-b4fa-c0e4dcb156cc","user_phone":""}}	2025-08-11 02:19:03.843262+00	
00000000-0000-0000-0000-000000000000	a225fcf1-db71-44bd-8cca-3dcbeccfadff	{"action":"user_signedup","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"provider":"email","user_email":"contact@devweb31.fr","user_id":"68f3b271-c18d-4433-9ab3-5447651b7536","user_phone":""}}	2025-08-11 02:20:27.360766+00	
00000000-0000-0000-0000-000000000000	2477340a-cbe8-4baf-bfa7-dba010b82bf2	{"action":"login","actor_id":"68f3b271-c18d-4433-9ab3-5447651b7536","actor_username":"contact@devweb31.fr","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-08-11 02:22:02.842783+00	
00000000-0000-0000-0000-000000000000	a05d1842-ca9c-4122-85d4-266b028372be	{"action":"logout","actor_id":"68f3b271-c18d-4433-9ab3-5447651b7536","actor_username":"contact@devweb31.fr","actor_via_sso":false,"log_type":"account"}	2025-08-11 02:29:31.29313+00	
00000000-0000-0000-0000-000000000000	1fb3abdb-b641-484c-b99f-070015a41a40	{"action":"login","actor_id":"68f3b271-c18d-4433-9ab3-5447651b7536","actor_username":"contact@devweb31.fr","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-08-11 02:30:09.394792+00	
00000000-0000-0000-0000-000000000000	705c0472-d60d-4ffa-8fc5-1279fbf23568	{"action":"logout","actor_id":"68f3b271-c18d-4433-9ab3-5447651b7536","actor_username":"contact@devweb31.fr","actor_via_sso":false,"log_type":"account"}	2025-08-11 02:35:10.023784+00	
00000000-0000-0000-0000-000000000000	650d6308-bcca-4c8c-91c2-282bfaa8a81b	{"action":"login","actor_id":"68f3b271-c18d-4433-9ab3-5447651b7536","actor_username":"contact@devweb31.fr","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-08-11 02:36:10.605315+00	
00000000-0000-0000-0000-000000000000	ff2757fd-7169-45e9-a1d1-19c1466060e2	{"action":"logout","actor_id":"68f3b271-c18d-4433-9ab3-5447651b7536","actor_username":"contact@devweb31.fr","actor_via_sso":false,"log_type":"account"}	2025-08-11 03:21:50.727064+00	
00000000-0000-0000-0000-000000000000	b74aeee9-f7a9-48da-a267-3bae2fa65ba5	{"action":"login","actor_id":"68f3b271-c18d-4433-9ab3-5447651b7536","actor_username":"contact@devweb31.fr","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-08-11 03:22:49.16533+00	
00000000-0000-0000-0000-000000000000	eabd546a-829d-48cc-8279-9b57ea3aabc4	{"action":"login","actor_id":"68f3b271-c18d-4433-9ab3-5447651b7536","actor_username":"contact@devweb31.fr","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-08-12 14:20:22.513253+00	
00000000-0000-0000-0000-000000000000	0278a329-69cf-42a5-b3c8-47736c1d1fb0	{"action":"login","actor_id":"68f3b271-c18d-4433-9ab3-5447651b7536","actor_username":"contact@devweb31.fr","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-08-12 14:20:40.270915+00	
00000000-0000-0000-0000-000000000000	eaf0259f-ad8a-4adf-b5e4-51d5d5c0bf42	{"action":"token_refreshed","actor_id":"68f3b271-c18d-4433-9ab3-5447651b7536","actor_username":"contact@devweb31.fr","actor_via_sso":false,"log_type":"token"}	2025-08-12 16:27:27.269586+00	
00000000-0000-0000-0000-000000000000	c5ef76b6-2785-42cb-9f55-d57cd2dcbeb3	{"action":"token_revoked","actor_id":"68f3b271-c18d-4433-9ab3-5447651b7536","actor_username":"contact@devweb31.fr","actor_via_sso":false,"log_type":"token"}	2025-08-12 16:27:27.291724+00	
00000000-0000-0000-0000-000000000000	9b5e11f3-964d-49b9-82e7-cfcda9ea94d8	{"action":"login","actor_id":"68f3b271-c18d-4433-9ab3-5447651b7536","actor_username":"contact@devweb31.fr","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-08-12 17:23:44.295057+00	
00000000-0000-0000-0000-000000000000	bb4a5a74-26cb-45da-8bca-5731a380d043	{"action":"token_refreshed","actor_id":"68f3b271-c18d-4433-9ab3-5447651b7536","actor_username":"contact@devweb31.fr","actor_via_sso":false,"log_type":"token"}	2025-08-12 17:26:10.240288+00	
00000000-0000-0000-0000-000000000000	1de40d43-2380-4570-99b3-2571e2f015a2	{"action":"token_revoked","actor_id":"68f3b271-c18d-4433-9ab3-5447651b7536","actor_username":"contact@devweb31.fr","actor_via_sso":false,"log_type":"token"}	2025-08-12 17:26:10.243303+00	
00000000-0000-0000-0000-000000000000	1afea9e8-9070-40ea-9c63-b5bf10f53e82	{"action":"token_refreshed","actor_id":"68f3b271-c18d-4433-9ab3-5447651b7536","actor_username":"contact@devweb31.fr","actor_via_sso":false,"log_type":"token"}	2025-08-12 18:22:24.556882+00	
00000000-0000-0000-0000-000000000000	b4108708-19c1-4201-856e-fa037f65c38b	{"action":"token_revoked","actor_id":"68f3b271-c18d-4433-9ab3-5447651b7536","actor_username":"contact@devweb31.fr","actor_via_sso":false,"log_type":"token"}	2025-08-12 18:22:24.575011+00	
\.


--
-- Data for Name: flow_state; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.flow_state (id, user_id, auth_code, code_challenge_method, code_challenge, provider_type, provider_access_token, provider_refresh_token, created_at, updated_at, authentication_method, auth_code_issued_at) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, invited_at, confirmation_token, confirmation_sent_at, recovery_token, recovery_sent_at, email_change_token_new, email_change, email_change_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data, is_super_admin, created_at, updated_at, phone, phone_confirmed_at, phone_change, phone_change_token, phone_change_sent_at, email_change_token_current, email_change_confirm_status, banned_until, reauthentication_token, reauthentication_sent_at, is_sso_user, deleted_at, is_anonymous) FROM stdin;
00000000-0000-0000-0000-000000000000	68f3b271-c18d-4433-9ab3-5447651b7536	authenticated	authenticated	contact@devweb31.fr	$2a$10$dWfOzV5fpefRCWzuvbyaruf8C.BGSmRZLvfySFSINmImRAKlIGmTu	2025-08-11 02:20:27.362265+00	\N		\N		\N			\N	2025-08-12 17:23:44.31468+00	{"provider": "email", "providers": ["email"]}	{"email_verified": true}	\N	2025-08-11 02:20:27.357811+00	2025-08-12 18:22:24.605754+00	\N	\N			\N		0	\N		\N	f	\N	f
\.


--
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.identities (provider_id, user_id, identity_data, provider, last_sign_in_at, created_at, updated_at, id) FROM stdin;
68f3b271-c18d-4433-9ab3-5447651b7536	68f3b271-c18d-4433-9ab3-5447651b7536	{"sub": "68f3b271-c18d-4433-9ab3-5447651b7536", "email": "contact@devweb31.fr", "email_verified": false, "phone_verified": false}	email	2025-08-11 02:20:27.359751+00	2025-08-11 02:20:27.359806+00	2025-08-11 02:20:27.359806+00	397a90f5-2284-4a64-b126-a7e3ecc9487d
\.


--
-- Data for Name: instances; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.instances (id, uuid, raw_base_config, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.sessions (id, user_id, created_at, updated_at, factor_id, aal, not_after, refreshed_at, user_agent, ip, tag) FROM stdin;
eb0da8b1-5bde-450b-81f8-57a028291c4a	68f3b271-c18d-4433-9ab3-5447651b7536	2025-08-11 03:22:49.17409+00	2025-08-11 03:22:49.17409+00	\N	aal1	\N	\N	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36	212.195.95.143	\N
9cb924d4-776e-4054-bd8b-0b5057b53c57	68f3b271-c18d-4433-9ab3-5447651b7536	2025-08-12 14:20:22.533213+00	2025-08-12 14:20:22.533213+00	\N	aal1	\N	\N	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36	212.195.95.143	\N
f2a4236a-a50b-4dac-b8a6-94d562718d3a	68f3b271-c18d-4433-9ab3-5447651b7536	2025-08-12 14:20:40.276406+00	2025-08-12 17:26:10.254081+00	\N	aal1	\N	2025-08-12 17:26:10.254008	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36	212.195.95.143	\N
b0237359-5c8f-4eac-a195-5201253f8838	68f3b271-c18d-4433-9ab3-5447651b7536	2025-08-12 17:23:44.316045+00	2025-08-12 18:22:24.61886+00	\N	aal1	\N	2025-08-12 18:22:24.618744	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36	212.195.95.143	\N
\.


--
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.mfa_amr_claims (session_id, created_at, updated_at, authentication_method, id) FROM stdin;
eb0da8b1-5bde-450b-81f8-57a028291c4a	2025-08-11 03:22:49.195961+00	2025-08-11 03:22:49.195961+00	password	2790937f-9a6b-441f-9c0d-f9df5b458d5a
9cb924d4-776e-4054-bd8b-0b5057b53c57	2025-08-12 14:20:22.571185+00	2025-08-12 14:20:22.571185+00	password	e548acc9-51c2-468a-9d9c-0ca55a3c4405
f2a4236a-a50b-4dac-b8a6-94d562718d3a	2025-08-12 14:20:40.281077+00	2025-08-12 14:20:40.281077+00	password	1649a153-94d0-47bc-a10a-6c5548638bce
b0237359-5c8f-4eac-a195-5201253f8838	2025-08-12 17:23:44.360654+00	2025-08-12 17:23:44.360654+00	password	bd38064c-835b-406d-8e1f-365c8cb38fcf
\.


--
-- Data for Name: mfa_factors; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.mfa_factors (id, user_id, friendly_name, factor_type, status, created_at, updated_at, secret, phone, last_challenged_at, web_authn_credential, web_authn_aaguid) FROM stdin;
\.


--
-- Data for Name: mfa_challenges; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.mfa_challenges (id, factor_id, created_at, verified_at, ip_address, otp_code, web_authn_session_data) FROM stdin;
\.


--
-- Data for Name: one_time_tokens; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.one_time_tokens (id, user_id, token_type, token_hash, relates_to, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.refresh_tokens (instance_id, id, token, user_id, revoked, created_at, updated_at, parent, session_id) FROM stdin;
00000000-0000-0000-0000-000000000000	6	blvz66krtg6a	68f3b271-c18d-4433-9ab3-5447651b7536	f	2025-08-11 03:22:49.182188+00	2025-08-11 03:22:49.182188+00	\N	eb0da8b1-5bde-450b-81f8-57a028291c4a
00000000-0000-0000-0000-000000000000	7	vtogqj5tpl35	68f3b271-c18d-4433-9ab3-5447651b7536	f	2025-08-12 14:20:22.545204+00	2025-08-12 14:20:22.545204+00	\N	9cb924d4-776e-4054-bd8b-0b5057b53c57
00000000-0000-0000-0000-000000000000	8	mvnn74tqflr4	68f3b271-c18d-4433-9ab3-5447651b7536	t	2025-08-12 14:20:40.278118+00	2025-08-12 16:27:27.293754+00	\N	f2a4236a-a50b-4dac-b8a6-94d562718d3a
00000000-0000-0000-0000-000000000000	9	ivzrknt6vshn	68f3b271-c18d-4433-9ab3-5447651b7536	t	2025-08-12 16:27:27.316234+00	2025-08-12 17:26:10.244627+00	mvnn74tqflr4	f2a4236a-a50b-4dac-b8a6-94d562718d3a
00000000-0000-0000-0000-000000000000	11	6p626rksnfio	68f3b271-c18d-4433-9ab3-5447651b7536	f	2025-08-12 17:26:10.247453+00	2025-08-12 17:26:10.247453+00	ivzrknt6vshn	f2a4236a-a50b-4dac-b8a6-94d562718d3a
00000000-0000-0000-0000-000000000000	10	opyhenghlfzy	68f3b271-c18d-4433-9ab3-5447651b7536	t	2025-08-12 17:23:44.329019+00	2025-08-12 18:22:24.578837+00	\N	b0237359-5c8f-4eac-a195-5201253f8838
00000000-0000-0000-0000-000000000000	12	uj4yutmtjl4t	68f3b271-c18d-4433-9ab3-5447651b7536	f	2025-08-12 18:22:24.597098+00	2025-08-12 18:22:24.597098+00	opyhenghlfzy	b0237359-5c8f-4eac-a195-5201253f8838
\.


--
-- Data for Name: sso_providers; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.sso_providers (id, resource_id, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: saml_providers; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.saml_providers (id, sso_provider_id, entity_id, metadata_xml, metadata_url, attribute_mapping, created_at, updated_at, name_id_format) FROM stdin;
\.


--
-- Data for Name: saml_relay_states; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.saml_relay_states (id, sso_provider_id, request_id, for_email, redirect_to, created_at, updated_at, flow_state_id) FROM stdin;
\.


--
-- Data for Name: schema_migrations; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.schema_migrations (version) FROM stdin;
20171026211738
20171026211808
20171026211834
20180103212743
20180108183307
20180119214651
20180125194653
00
20210710035447
20210722035447
20210730183235
20210909172000
20210927181326
20211122151130
20211124214934
20211202183645
20220114185221
20220114185340
20220224000811
20220323170000
20220429102000
20220531120530
20220614074223
20220811173540
20221003041349
20221003041400
20221011041400
20221020193600
20221021073300
20221021082433
20221027105023
20221114143122
20221114143410
20221125140132
20221208132122
20221215195500
20221215195800
20221215195900
20230116124310
20230116124412
20230131181311
20230322519590
20230402418590
20230411005111
20230508135423
20230523124323
20230818113222
20230914180801
20231027141322
20231114161723
20231117164230
20240115144230
20240214120130
20240306115329
20240314092811
20240427152123
20240612123726
20240729123726
20240802193726
20240806073726
20241009103726
\.


--
-- Data for Name: sso_domains; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.sso_domains (id, sso_provider_id, domain, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: site_settings; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.site_settings (id, key, value, updated_at) FROM stdin;
2	site_title	DevWeb31	2025-08-11 02:28:52.102968+00
3	site_description	Développement Web Moderne	2025-08-11 02:28:52.102968+00
10	maintenance_mode	true	2025-08-12 17:25:34.394+00
1	maintenance	false	2025-08-11 03:26:09.328+00
\.


--
-- Data for Name: messages_2025_08_10; Type: TABLE DATA; Schema: realtime; Owner: -
--

COPY realtime.messages_2025_08_10 (topic, extension, payload, event, private, updated_at, inserted_at, id) FROM stdin;
\.


--
-- Data for Name: messages_2025_08_11; Type: TABLE DATA; Schema: realtime; Owner: -
--

COPY realtime.messages_2025_08_11 (topic, extension, payload, event, private, updated_at, inserted_at, id) FROM stdin;
\.


--
-- Data for Name: messages_2025_08_12; Type: TABLE DATA; Schema: realtime; Owner: -
--

COPY realtime.messages_2025_08_12 (topic, extension, payload, event, private, updated_at, inserted_at, id) FROM stdin;
\.


--
-- Data for Name: messages_2025_08_13; Type: TABLE DATA; Schema: realtime; Owner: -
--

COPY realtime.messages_2025_08_13 (topic, extension, payload, event, private, updated_at, inserted_at, id) FROM stdin;
\.


--
-- Data for Name: messages_2025_08_14; Type: TABLE DATA; Schema: realtime; Owner: -
--

COPY realtime.messages_2025_08_14 (topic, extension, payload, event, private, updated_at, inserted_at, id) FROM stdin;
\.


--
-- Data for Name: messages_2025_08_15; Type: TABLE DATA; Schema: realtime; Owner: -
--

COPY realtime.messages_2025_08_15 (topic, extension, payload, event, private, updated_at, inserted_at, id) FROM stdin;
\.


--
-- Data for Name: schema_migrations; Type: TABLE DATA; Schema: realtime; Owner: -
--

COPY realtime.schema_migrations (version, inserted_at) FROM stdin;
20211116024918	2025-08-11 00:39:20
20211116045059	2025-08-11 00:39:23
20211116050929	2025-08-11 00:39:25
20211116051442	2025-08-11 00:39:26
20211116212300	2025-08-11 00:39:28
20211116213355	2025-08-11 00:39:30
20211116213934	2025-08-11 00:39:32
20211116214523	2025-08-11 00:39:34
20211122062447	2025-08-11 00:39:36
20211124070109	2025-08-11 00:39:38
20211202204204	2025-08-11 00:39:39
20211202204605	2025-08-11 00:39:41
20211210212804	2025-08-11 00:39:47
20211228014915	2025-08-11 00:39:49
20220107221237	2025-08-11 00:39:50
20220228202821	2025-08-11 00:39:52
20220312004840	2025-08-11 00:39:54
20220603231003	2025-08-11 00:39:56
20220603232444	2025-08-11 00:39:58
20220615214548	2025-08-11 00:40:00
20220712093339	2025-08-11 00:40:02
20220908172859	2025-08-11 00:40:04
20220916233421	2025-08-11 00:40:05
20230119133233	2025-08-11 00:40:07
20230128025114	2025-08-11 00:40:09
20230128025212	2025-08-11 00:40:11
20230227211149	2025-08-11 00:40:13
20230228184745	2025-08-11 00:40:14
20230308225145	2025-08-11 00:40:16
20230328144023	2025-08-11 00:40:18
20231018144023	2025-08-11 00:40:20
20231204144023	2025-08-11 00:40:23
20231204144024	2025-08-11 00:40:25
20231204144025	2025-08-11 00:40:26
20240108234812	2025-08-11 00:40:28
20240109165339	2025-08-11 00:40:30
20240227174441	2025-08-11 00:40:33
20240311171622	2025-08-11 00:40:35
20240321100241	2025-08-11 00:40:39
20240401105812	2025-08-11 00:40:44
20240418121054	2025-08-11 00:40:46
20240523004032	2025-08-11 00:40:52
20240618124746	2025-08-11 00:40:54
20240801235015	2025-08-11 00:40:56
20240805133720	2025-08-11 00:40:57
20240827160934	2025-08-11 00:40:59
20240919163303	2025-08-11 00:41:01
20240919163305	2025-08-11 00:41:03
20241019105805	2025-08-11 00:41:05
20241030150047	2025-08-11 00:41:11
20241108114728	2025-08-11 00:41:14
20241121104152	2025-08-11 00:41:15
20241130184212	2025-08-11 00:41:17
20241220035512	2025-08-11 00:41:19
20241220123912	2025-08-11 00:41:21
20241224161212	2025-08-11 00:41:22
20250107150512	2025-08-11 00:41:24
20250110162412	2025-08-11 00:41:26
20250123174212	2025-08-11 00:41:27
20250128220012	2025-08-11 00:41:29
20250506224012	2025-08-11 00:41:31
20250523164012	2025-08-11 00:41:32
20250714121412	2025-08-11 00:41:34
\.


--
-- Data for Name: subscription; Type: TABLE DATA; Schema: realtime; Owner: -
--

COPY realtime.subscription (id, subscription_id, entity, filters, claims, created_at) FROM stdin;
\.


--
-- Data for Name: buckets; Type: TABLE DATA; Schema: storage; Owner: -
--

COPY storage.buckets (id, name, owner, created_at, updated_at, public, avif_autodetection, file_size_limit, allowed_mime_types, owner_id, type) FROM stdin;
\.


--
-- Data for Name: buckets_analytics; Type: TABLE DATA; Schema: storage; Owner: -
--

COPY storage.buckets_analytics (id, type, format, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: migrations; Type: TABLE DATA; Schema: storage; Owner: -
--

COPY storage.migrations (id, name, hash, executed_at) FROM stdin;
0	create-migrations-table	e18db593bcde2aca2a408c4d1100f6abba2195df	2025-08-11 00:39:17.761238
1	initialmigration	6ab16121fbaa08bbd11b712d05f358f9b555d777	2025-08-11 00:39:17.905104
2	storage-schema	5c7968fd083fcea04050c1b7f6253c9771b99011	2025-08-11 00:39:17.919947
3	pathtoken-column	2cb1b0004b817b29d5b0a971af16bafeede4b70d	2025-08-11 00:39:18.133212
4	add-migrations-rls	427c5b63fe1c5937495d9c635c263ee7a5905058	2025-08-11 00:39:18.560331
5	add-size-functions	79e081a1455b63666c1294a440f8ad4b1e6a7f84	2025-08-11 00:39:18.566154
6	change-column-name-in-get-size	f93f62afdf6613ee5e7e815b30d02dc990201044	2025-08-11 00:39:18.761329
7	add-rls-to-buckets	e7e7f86adbc51049f341dfe8d30256c1abca17aa	2025-08-11 00:39:18.768018
8	add-public-to-buckets	fd670db39ed65f9d08b01db09d6202503ca2bab3	2025-08-11 00:39:18.774106
9	fix-search-function	3a0af29f42e35a4d101c259ed955b67e1bee6825	2025-08-11 00:39:18.779965
10	search-files-search-function	68dc14822daad0ffac3746a502234f486182ef6e	2025-08-11 00:39:18.788407
11	add-trigger-to-auto-update-updated_at-column	7425bdb14366d1739fa8a18c83100636d74dcaa2	2025-08-11 00:39:18.794268
12	add-automatic-avif-detection-flag	8e92e1266eb29518b6a4c5313ab8f29dd0d08df9	2025-08-11 00:39:18.815178
13	add-bucket-custom-limits	cce962054138135cd9a8c4bcd531598684b25e7d	2025-08-11 00:39:18.820946
14	use-bytes-for-max-size	941c41b346f9802b411f06f30e972ad4744dad27	2025-08-11 00:39:18.831556
15	add-can-insert-object-function	934146bc38ead475f4ef4b555c524ee5d66799e5	2025-08-11 00:39:18.891805
16	add-version	76debf38d3fd07dcfc747ca49096457d95b1221b	2025-08-11 00:39:18.89718
17	drop-owner-foreign-key	f1cbb288f1b7a4c1eb8c38504b80ae2a0153d101	2025-08-11 00:39:18.902601
18	add_owner_id_column_deprecate_owner	e7a511b379110b08e2f214be852c35414749fe66	2025-08-11 00:39:18.912144
19	alter-default-value-objects-id	02e5e22a78626187e00d173dc45f58fa66a4f043	2025-08-11 00:39:18.918469
20	list-objects-with-delimiter	cd694ae708e51ba82bf012bba00caf4f3b6393b7	2025-08-11 00:39:18.92947
21	s3-multipart-uploads	8c804d4a566c40cd1e4cc5b3725a664a9303657f	2025-08-11 00:39:18.943663
22	s3-multipart-uploads-big-ints	9737dc258d2397953c9953d9b86920b8be0cdb73	2025-08-11 00:39:19.051064
23	optimize-search-function	9d7e604cddc4b56a5422dc68c9313f4a1b6f132c	2025-08-11 00:39:19.088569
24	operation-function	8312e37c2bf9e76bbe841aa5fda889206d2bf8aa	2025-08-11 00:39:19.099552
25	custom-metadata	d974c6057c3db1c1f847afa0e291e6165693b990	2025-08-11 00:39:19.104562
26	objects-prefixes	ef3f7871121cdc47a65308e6702519e853422ae2	2025-08-11 01:35:35.443581
27	search-v2	33b8f2a7ae53105f028e13e9fcda9dc4f356b4a2	2025-08-11 01:35:35.552709
28	object-bucket-name-sorting	ba85ec41b62c6a30a3f136788227ee47f311c436	2025-08-11 01:35:35.565473
29	create-prefixes	a7b1a22c0dc3ab630e3055bfec7ce7d2045c5b7b	2025-08-11 01:35:35.576001
30	update-object-levels	6c6f6cc9430d570f26284a24cf7b210599032db7	2025-08-11 01:35:35.584236
31	objects-level-index	33f1fef7ec7fea08bb892222f4f0f5d79bab5eb8	2025-08-11 01:35:35.591781
32	backward-compatible-index-on-objects	2d51eeb437a96868b36fcdfb1ddefdf13bef1647	2025-08-11 01:35:35.599689
33	backward-compatible-index-on-prefixes	fe473390e1b8c407434c0e470655945b110507bf	2025-08-11 01:35:35.608161
34	optimize-search-function-v1	82b0e469a00e8ebce495e29bfa70a0797f7ebd2c	2025-08-11 01:35:35.61119
35	add-insert-trigger-prefixes	63bb9fd05deb3dc5e9fa66c83e82b152f0caf589	2025-08-11 01:35:35.620993
36	optimise-existing-functions	81cf92eb0c36612865a18016a38496c530443899	2025-08-11 01:35:35.627845
37	add-bucket-name-length-trigger	3944135b4e3e8b22d6d4cbb568fe3b0b51df15c1	2025-08-11 01:35:35.641977
38	iceberg-catalog-flag-on-buckets	19a8bd89d5dfa69af7f222a46c726b7c41e462c5	2025-08-11 01:35:35.649419
\.


--
-- Data for Name: objects; Type: TABLE DATA; Schema: storage; Owner: -
--

COPY storage.objects (id, bucket_id, name, owner, created_at, updated_at, last_accessed_at, metadata, version, owner_id, user_metadata, level) FROM stdin;
\.


--
-- Data for Name: prefixes; Type: TABLE DATA; Schema: storage; Owner: -
--

COPY storage.prefixes (bucket_id, name, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: s3_multipart_uploads; Type: TABLE DATA; Schema: storage; Owner: -
--

COPY storage.s3_multipart_uploads (id, in_progress_size, upload_signature, bucket_id, key, version, owner_id, created_at, user_metadata) FROM stdin;
\.


--
-- Data for Name: s3_multipart_uploads_parts; Type: TABLE DATA; Schema: storage; Owner: -
--

COPY storage.s3_multipart_uploads_parts (id, upload_id, size, part_number, bucket_id, key, etag, owner_id, version, created_at) FROM stdin;
\.


--
-- Data for Name: schema_migrations; Type: TABLE DATA; Schema: supabase_migrations; Owner: -
--

COPY supabase_migrations.schema_migrations (version, statements, name) FROM stdin;
20250812211812	\N	remote_schema
20250812213539	{"drop extension if exists \\"pg_net\\"","create sequence \\"public\\".\\"site_settings_id_seq\\"","create table \\"public\\".\\"site_settings\\" (\n    \\"id\\" bigint not null default nextval('site_settings_id_seq'::regclass),\n    \\"key\\" text not null,\n    \\"value\\" text not null,\n    \\"updated_at\\" timestamp with time zone default now()\n      )","alter table \\"public\\".\\"site_settings\\" enable row level security","alter sequence \\"public\\".\\"site_settings_id_seq\\" owned by \\"public\\".\\"site_settings\\".\\"id\\"","CREATE UNIQUE INDEX site_settings_key_key ON public.site_settings USING btree (key)","CREATE UNIQUE INDEX site_settings_pkey ON public.site_settings USING btree (id)","alter table \\"public\\".\\"site_settings\\" add constraint \\"site_settings_pkey\\" PRIMARY KEY using index \\"site_settings_pkey\\"","alter table \\"public\\".\\"site_settings\\" add constraint \\"site_settings_key_key\\" UNIQUE using index \\"site_settings_key_key\\"","grant delete on table \\"public\\".\\"site_settings\\" to \\"anon\\"","grant insert on table \\"public\\".\\"site_settings\\" to \\"anon\\"","grant references on table \\"public\\".\\"site_settings\\" to \\"anon\\"","grant select on table \\"public\\".\\"site_settings\\" to \\"anon\\"","grant trigger on table \\"public\\".\\"site_settings\\" to \\"anon\\"","grant truncate on table \\"public\\".\\"site_settings\\" to \\"anon\\"","grant update on table \\"public\\".\\"site_settings\\" to \\"anon\\"","grant delete on table \\"public\\".\\"site_settings\\" to \\"authenticated\\"","grant insert on table \\"public\\".\\"site_settings\\" to \\"authenticated\\"","grant references on table \\"public\\".\\"site_settings\\" to \\"authenticated\\"","grant select on table \\"public\\".\\"site_settings\\" to \\"authenticated\\"","grant trigger on table \\"public\\".\\"site_settings\\" to \\"authenticated\\"","grant truncate on table \\"public\\".\\"site_settings\\" to \\"authenticated\\"","grant update on table \\"public\\".\\"site_settings\\" to \\"authenticated\\"","grant delete on table \\"public\\".\\"site_settings\\" to \\"service_role\\"","grant insert on table \\"public\\".\\"site_settings\\" to \\"service_role\\"","grant references on table \\"public\\".\\"site_settings\\" to \\"service_role\\"","grant select on table \\"public\\".\\"site_settings\\" to \\"service_role\\"","grant trigger on table \\"public\\".\\"site_settings\\" to \\"service_role\\"","grant truncate on table \\"public\\".\\"site_settings\\" to \\"service_role\\"","grant update on table \\"public\\".\\"site_settings\\" to \\"service_role\\"","create policy \\"Allow authenticated users to insert\\"\n  on \\"public\\".\\"site_settings\\"\n  as permissive\n  for insert\n  to public\nwith check ((auth.role() = 'authenticated'::text))","create policy \\"Allow authenticated users to update\\"\n  on \\"public\\".\\"site_settings\\"\n  as permissive\n  for update\n  to public\nusing ((auth.role() = 'authenticated'::text))","create policy \\"Allow public read access\\"\n  on \\"public\\".\\"site_settings\\"\n  as permissive\n  for select\n  to public\nusing (true)"}	remote_schema
20250812214739	{"revoke select on table \\"storage\\".\\"iceberg_namespaces\\" from \\"anon\\"","revoke select on table \\"storage\\".\\"iceberg_namespaces\\" from \\"authenticated\\"","revoke delete on table \\"storage\\".\\"iceberg_namespaces\\" from \\"service_role\\"","revoke insert on table \\"storage\\".\\"iceberg_namespaces\\" from \\"service_role\\"","revoke references on table \\"storage\\".\\"iceberg_namespaces\\" from \\"service_role\\"","revoke select on table \\"storage\\".\\"iceberg_namespaces\\" from \\"service_role\\"","revoke trigger on table \\"storage\\".\\"iceberg_namespaces\\" from \\"service_role\\"","revoke truncate on table \\"storage\\".\\"iceberg_namespaces\\" from \\"service_role\\"","revoke update on table \\"storage\\".\\"iceberg_namespaces\\" from \\"service_role\\"","revoke select on table \\"storage\\".\\"iceberg_tables\\" from \\"anon\\"","revoke select on table \\"storage\\".\\"iceberg_tables\\" from \\"authenticated\\"","revoke delete on table \\"storage\\".\\"iceberg_tables\\" from \\"service_role\\"","revoke insert on table \\"storage\\".\\"iceberg_tables\\" from \\"service_role\\"","revoke references on table \\"storage\\".\\"iceberg_tables\\" from \\"service_role\\"","revoke select on table \\"storage\\".\\"iceberg_tables\\" from \\"service_role\\"","revoke trigger on table \\"storage\\".\\"iceberg_tables\\" from \\"service_role\\"","revoke truncate on table \\"storage\\".\\"iceberg_tables\\" from \\"service_role\\"","revoke update on table \\"storage\\".\\"iceberg_tables\\" from \\"service_role\\"","alter table \\"storage\\".\\"iceberg_namespaces\\" drop constraint \\"iceberg_namespaces_bucket_id_fkey\\"","alter table \\"storage\\".\\"iceberg_tables\\" drop constraint \\"iceberg_tables_bucket_id_fkey\\"","alter table \\"storage\\".\\"iceberg_tables\\" drop constraint \\"iceberg_tables_namespace_id_fkey\\"","alter table \\"storage\\".\\"iceberg_namespaces\\" drop constraint \\"iceberg_namespaces_pkey\\"","alter table \\"storage\\".\\"iceberg_tables\\" drop constraint \\"iceberg_tables_pkey\\"","drop index if exists \\"storage\\".\\"iceberg_namespaces_pkey\\"","drop index if exists \\"storage\\".\\"iceberg_tables_pkey\\"","drop index if exists \\"storage\\".\\"idx_iceberg_namespaces_bucket_id\\"","drop index if exists \\"storage\\".\\"idx_iceberg_tables_namespace_id\\"","drop table \\"storage\\".\\"iceberg_namespaces\\"","drop table \\"storage\\".\\"iceberg_tables\\""}	remote_schema
\.


--
-- Data for Name: seed_files; Type: TABLE DATA; Schema: supabase_migrations; Owner: -
--

COPY supabase_migrations.seed_files (path, hash) FROM stdin;
\.


--
-- Data for Name: secrets; Type: TABLE DATA; Schema: vault; Owner: -
--

COPY vault.secrets (id, name, description, secret, key_id, nonce, created_at, updated_at) FROM stdin;
\.


--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: -
--

SELECT pg_catalog.setval('auth.refresh_tokens_id_seq', 12, true);


--
-- Name: site_settings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.site_settings_id_seq', 41, true);


--
-- Name: subscription_id_seq; Type: SEQUENCE SET; Schema: realtime; Owner: -
--

SELECT pg_catalog.setval('realtime.subscription_id_seq', 1, false);


--
-- PostgreSQL database dump complete
--

