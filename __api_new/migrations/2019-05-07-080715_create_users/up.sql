-- Your SQL goes here
CREATE TABLE users (
  id INTEGER NOT NULL PRIMARY KEY,
  email VARCHAR NOT NULL,
  encrypted_password VARCHAR NOT NULL,
  created_date text NOT NULL,
  updated_date text NOT NULL
)