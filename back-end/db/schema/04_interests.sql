DROP TABLE IF EXISTS interests CASCADE;

CREATE TABLE interests (
  id SERIAL PRIMARY KEY,
  category_id INT,
  name VARCHAR(50)
);