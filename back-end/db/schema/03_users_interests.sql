DROP TABLE IF EXISTS users_interests CASCADE;

CREATE TABLE users_interests (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  interest_id INT REFERENCES interests(id) ON DELETE CASCADE,
  level INT  NOT NULL
);