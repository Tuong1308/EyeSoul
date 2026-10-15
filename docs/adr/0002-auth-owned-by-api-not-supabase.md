# Auth is owned by the API, not Supabase Auth

Supabase hosts our production Postgres and image Storage, but sign-in (email + password and Google) is implemented in the NestJS API rather than with Supabase Auth. Supabase Auth would be less work; we keep auth in the API so the backend is self-contained, not locked to Supabase, and because building it is part of what the project is meant to teach.
