CREATE TABLE users (
   id SERIAL PRIMARY KEY,
   full_name VARCHAR(50) NOT NULL,
   email VARCHAR(50) NOT NULL,
   password VARCHAR(250) NOT NULL,
   is_deleted BOOLEAN DEFAULT FALSE,
   created_at DATE DEFAULT CURRENT_TIMESTAMP,
   updated_at DATE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE roles (
   id SERIAL PRIMARY KEY,
   name VARCHAR(50) NOT NULL,
   is_deleted BOOLEAN DEFAULT FALSE,
   created_at DATE DEFAULT CURRENT_TIMESTAMP,
   updated_at DATE DEFAULT CURRENT_TIMESTAMP
);