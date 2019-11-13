DROP TABLE users
DROP TABLE property_reviews
DROP TABLE reservations
DROP TABLE guest_reviews
DROP TABLE properties 
DROP TABLE rates 


CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(8) NOT NULL
)

CREATE TABLE properties (
  id SERIAL PRIMARY KEY,
  owner_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  thumbnail_photo_url VARCHAR(255) NOT NULL,
  cover_photo_url VARCHAR(255) NOT NULL,
  cost_per_night SMALLINTEGER NOT NULL,
  street VARCHAR(255) NOT NULL,
  parking_spaces SMALLINT NOT NULL,
  number_of_bathrooms SMALLINT NOT NULL,
  number_of_bedrooms SMALLINT NOT NULL,
  country VARCHAR(255) NOT NULL,
  city VARCHAR(255) NOT NULL,
  province VARCHAR(255) NOT NULL,
  post_code VARCHAR(255) NOT NULL,
  active BOOLEAN NOT NULL,

)

CREATE TABLE rates (
  id SERIAL PRIMARY KEY,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  cost_per_night SMALLINT NOT NULL
)

CREATE TABLE reservations (
  id SERIAL PRIMARY KEY,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  property_id INTEGER NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
  guest_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE
)

CREATE TABLE guest_reviews (
  id SERIAL PRIMARY KEY,
  guest_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  owner_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  reservation_id INTEGER NOT NULL REFERENCES reservations(id) ON DELETE CASCADE
  rating SMALLINT NOT NULL,
  message TEXT NOT NULL
)

CREATE TABLE property_reviews(
  id = SERIAL PRIMARY KEY,
  guest_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  reservation_id INTEGER NOT NULL REFERENCES reservations(id) ON DELETE CASCADE,
  property_id INTEGER NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
  rating SMALLINT NOT NULL,
  message TEXT NOT NULL
)