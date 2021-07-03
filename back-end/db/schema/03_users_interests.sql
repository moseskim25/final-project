DROP TABLE IF EXISTS users_interests CASCADE;


CREATE TABLE users_interests (
  id SERIAL PRIMARY KEY,
  user_id INT,
  interest_id INT,
  level INT
);