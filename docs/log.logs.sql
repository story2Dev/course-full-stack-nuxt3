create schema if not exists log;

CREATE TABLE IF NOT EXISTS log.logs(
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    tag character varying NOT NULL,
    title character varying NOT NULL,
    data jsonb NULL,
    user_id uuid NOT NULL REFERENCES auth.users(id),
    int_id int NULL,
    uuid_id uuid NULL,
    ip character varying NULL,
    user_agent character varying NULL,
    created_at timestamp  DEFAULT now(),
    updated_at timestamp  DEFAULT now()
);