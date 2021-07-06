DROP TABLE IF EXISTS interests CASCADE;

CREATE TABLE interests (
  id SERIAL PRIMARY KEY NOT NULL,
  category_id INT REFERENCES categories(id) ON DELETE CASCADE,
  name VARCHAR(50) NOT NULL,
  image TEXT
);