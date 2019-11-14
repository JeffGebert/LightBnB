const properties = require('./json/properties.json');
const users = require('./json/users.json');

const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  return pool.query(`
  SELECT * FROM users
  where email = $1;
  `, [email])
}
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  return pool.query(`
  SELECT * FROM users
  where id = $1;
  `, [id])
}
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {
  let values = [`${user.name}`, `${user.email}`, `${user.password}`]
  return pool.query(`
  INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *`, values)
  .then (res => res.rows);
}
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {

  return pool.query(`
  select properties.*, reservations.*, avg(property_reviews.rating) as average_rating
  FROM reservations
  JOIN properties ON property_id = properties.id 
  JOIN property_reviews ON properties.id = property_reviews.property_id
  WHERE reservations.guest_id = $1 and end_date <= now()::date
  GROUP BY properties.id,reservations.id
  ORDER BY start_date asc
  LIMIT $2;`, [guest_id, limit])
  .then(res => res.rows);
}
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function(options, limit = 10) {
    const queryParams = [];
  // 2
    let queryString = `
    SELECT properties.*, avg(property_reviews.rating) as average_rating
    FROM properties
    JOIN property_reviews ON properties.id = property_id
    `;

    if (options.city) {
      queryParams.push(`%${options.city}%`);
      queryString += `WHERE city LIKE $${queryParams.length} `;
    }

    if (options.owner_id) {
      queryParams.push(`${options.owner_id}`);
      queryString += `AND owner_id = $${queryParams.length} `
    }

    if ((options.minimum_price_per_night) && (options.maximum_price_per_night)) {
      queryParams.push(`${options.minimum_price_per_night}`, `${options.maximum_price_per_night}`);
      queryString += `AND cost_per_night between $${queryParams.length-1} and $${queryParams.length} `
    }

    if (options.minimum_rating) {
      queryParams.push(`${options.minimum_rating}`);
      queryString += `AND rating >= $${queryParams.length}`
    }

    queryParams.push(limit);
    queryString += `
    GROUP BY properties.id
    ORDER BY cost_per_night
    LIMIT $${queryParams.length};
    `;

    // 6
    return pool.query(queryString, queryParams)
    .then(res => res.rows);


}
exports.getAllProperties = getAllProperties;

/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  const queryParams =[];
  if (property.owner_id) {
    queryParams.push(`${property.owner_id}`);
  }
  if (property.title) {
    queryParams.push(`${property.title}`);
  }
  if (property.description) {
    queryParams.push(`${property.description}`);
  }
  if (property.thumbnail_photo_url) {
    queryParams.push(`${property.thumbnail_photo_url}`);
  }
  if (property.cover_photo_url) {
    queryParams.push(`${property.cover_photo_url}`);
  }
  if (property.cost_per_night) {
    queryParams.push(`${property.cost_per_night}`);
  }
  if (property.parking_spaces) {
    queryParams.push(`${property.parking_spaces}`);
  }
  if (property.number_of_bathrooms) {
    queryParams.push(`${property.number_of_bathrooms}`);
  }
  if (property.number_of_bedrooms) {
    queryParams.push(`${property.number_of_bedrooms}`);
  }
  if (property.country) {
    queryParams.push(`${property.country}`);
  }
  if (property.street) {
    queryParams.push(`${property.street}`);
  }
  if (property.city) {
    queryParams.push(`${property.city}`);
  }
  if (property.province) {
    queryParams.push(`${property.province}`);
  }
  if (property.post_code) {
    queryParams.push(`${property.post_code}`);
  }



  let queryString = `INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms,number_of_bedrooms,country, street, city,province,post_code)
  values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14) RETURNING *`
  
  return pool.query(queryString, queryParams)
  .then (res => res.rows);

}
exports.addProperty = addProperty;
