DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  email VARCHAR(50) NOT NULL,
  password VARCHAR(50) NOT NULL,
  postal_code VARCHAR(25),
  birthday DATE,
  profile_image VARCHAR(255),
  upload_image BYTEA,
  gender VARCHAR(50),
  socket_id VARCHAR(50) default NULL,
  created_at TIMESTAMP default current_timestamp NOT NULL
);

-- INSERT INTO users (first_name, last_name, email, password, postal_code, age, profile_image, gender)
-- VALUES ('Moses', 'Kim', 'moses@gmail.com', 'password', 'M9R1L1', 25, 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500', 'male');

-- INSERT INTO users (first_name, last_name, email, password, postal_code, age, profile_image, gender)
-- VALUES ('Claire', 'Devlin', 'claire@gmail.com', 'password', 'M9R1L1', 25, 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500', 'female');

-- INSERT INTO users (first_name, last_name, email, password, postal_code, age, profile_image, gender)
-- VALUES ('Jaemin', 'Jaemin', 'jaemin@gmail.com', 'password', 'M9R1L1', 25, 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500', 'male');

-- INSERT INTO users (first_name, last_name, email, password, postal_code, age, profile_image, gender)
-- VALUES ('Jaemin', 'Jaemin', 'jaemin@gmail.com', 'password', 'M9R1L1', 25, 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500', 'male');

-- INSERT INTO users (first_name, last_name, email, password, postal_code, age, profile_image, gender)
-- VALUES ('Jaemin', 'Jaemin', 'jaemin@gmail.com', 'password', 'M9R1L1', 25, 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500', 'male');

-- INSERT INTO users (first_name, last_name, email, password, postal_code, age, profile_image, gender)
-- VALUES ('Jaemin', 'Jaemin', 'jaemin@gmail.com', 'password', 'M9R1L1', 25, 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500', 'male');

-- INSERT INTO users (first_name, last_name, email, password, postal_code, age, profile_image, gender)
-- VALUES ('Jaemin', 'Jaemin', 'jaemin@gmail.com', 'password', 'M9R1L1', 25, 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500', 'male');

-- INSERT INTO users (first_name, last_name, email, password, postal_code, age, profile_image, gender)
-- VALUES ('Jaemin', 'Jaemin', 'jaemin@gmail.com', 'password', 'M9R1L1', 25, 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500', 'male');

-- INSERT INTO users (first_name, last_name, email, password, postal_code, age, profile_image, gender)
-- VALUES ('Jaemin', 'Jaemin', 'jaemin@gmail.com', 'password', 'M9R1L1', 25, 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500', 'male');

-- INSERT INTO users (first_name, last_name, email, password, postal_code, age, profile_image, gender)
-- VALUES ('Jaemin', 'Jaemin', 'jaemin@gmail.com', 'password', 'M9R1L1', 25, 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500', 'male');

-- INSERT INTO users (first_name, last_name, email, password, postal_code, age, profile_image, gender)
-- VALUES ('Jaemin', 'Jaemin', 'jaemin@gmail.com', 'password', 'M9R1L1', 25, 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500', 'male');

-- INSERT INTO users (first_name, last_name, email, password, postal_code, age, profile_image, gender)
-- VALUES ('Jaemin', 'Jaemin', 'jaemin@gmail.com', 'password', 'M9R1L1', 25, 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500', 'male');

-- INSERT INTO users (first_name, last_name, email, password, postal_code, age, profile_image, gender)
-- VALUES ('Jaemin', 'Jaemin', 'jaemin@gmail.com', 'password', 'M9R1L1', 25, 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500', 'male');

-- INSERT INTO users (first_name, last_name, email, password, postal_code, age, profile_image, gender)
-- VALUES ('Jaemin', 'Jaemin', 'jaemin@gmail.com', 'password', 'M9R1L1', 25, 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500', 'male');

-- INSERT INTO users (first_name, last_name, email, password, postal_code, age, profile_image, gender)
-- VALUES ('Jaemin', 'Jaemin', 'jaemin@gmail.com', 'password', 'M9R1L1', 25, 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500', 'male');

-- INSERT INTO users (first_name, last_name, email, password, postal_code, age, profile_image, gender)
-- VALUES ('Jaemin', 'Jaemin', 'jaemin@gmail.com', 'password', 'M9R1L1', 25, 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500', 'male');

-- INSERT INTO users (first_name, last_name, email, password, postal_code, age, profile_image, gender)
-- VALUES ('Jaemin', 'Jaemin', 'jaemin@gmail.com', 'password', 'M9R1L1', 25, 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500', 'male');