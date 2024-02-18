create table if not exists terms(
    id serial PRIMARY KEY,
    name text NOT NULL,
    parent_id int null,
    group_id int null,
    created_at timestamp NOT NULL DEFAULT now(),
    updated_at timestamp NOT NULL DEFAULT now()
); 

create table if not exists products(
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name character varying(255) NOT NULL,
    description text,
    price numeric(10,2) NOT NULL,
    cost numeric(10,2) NOT NULL,
    stock int NOT NULL,
    image_url character varying null,
    category_id int NOT NULL REFERENCES terms(id),
    created_at timestamp NOT NULL DEFAULT now(),
    updated_at timestamp NOT NULL DEFAULT now()
);


create table if not exists product_stock(
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id uuid NOT NULL REFERENCES products(id),
    quantity int NOT NULL,
    stock int NOT NULL,
    price numeric(10,2) NOT NULL,
    cost numeric(10,2) NOT NULL,
    on_date date null default now(),
    created_at timestamp NOT NULL DEFAULT now(),
    updated_at timestamp NOT NULL DEFAULT now()
);

create table if not exists settings(
    id serial PRIMARY KEY,
    key character varying,
    current character varying,
    options jsonb
);