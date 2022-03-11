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
  const sanitizedEmail = email.toLowerCase().trim();
  return pool
    .query(`SELECT * FROM users WHERE email = $1`, [sanitizedEmail])
    .then((result) => {
      const rows = result.rows;
      if (rows.length === 0) {
        return Promise.resolve(null);
      }
      const user = rows[0];
      return Promise.resolve(user);
    })
    .catch((err) => {
      Promise.reject(err)
      console.log(err.message);
    });
}
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  return pool
    .query(`SELECT * FROM users WHERE id = $1`, [id])
    .then((result) => {
      return Promise.resolve(result.rows[0]);
    });
}
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {
  return pool.query(`INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *;`, [user.name, user.email, user.password])
}
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  console.log('guest id', guest_id);
  return pool.query(`SELECT reservations.*, properties.*, AVG(rating) as average_rating
  FROM reservations
  JOIN properties ON reservations.property_id = properties.id
  JOIN property_reviews ON property_reviews.property_id = properties.id
  WHERE reservations.guest_id = $1
  GROUP BY properties.id, reservations.id
  ORDER BY reservations.start_date
  LIMIT $2;`, [guest_id, limit])
  .then ((result => {
    return result.rows
  }))
}
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */

//refactored getAllProperties
const getAllProperties = (options, limit = 10) => {
    const queryParams = [];
  // 2
  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_id
  JOIN users ON properties.owner_id = users.id
  WHERE 1 = 1
  `;

  // 3
  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryString += `AND city LIKE $${queryParams.length} `;
  }

  if(options.owner_id) {
    queryParams.push(`${options.owner_id}`)
    queryString += `AND users.id = $${queryParams.length} `;
  }

  if(options.minimum_price_per_night) {
    const minPrice = parseInt(options.minimum_price_per_night) * 100;
    queryParams.push(minPrice);
    queryString += `AND properties.cost_per_night > $${queryParams.length} `;
  }

  if(options.maximum_price_per_night) {
    const maxPrice = parseInt(options.maximum_price_per_night) * 100;
    queryParams.push(maxPrice);
    queryString += `AND properties.cost_per_night < $${queryParams.length} `;
  }

  // 4
  queryString += `
  GROUP BY properties.id
  `
  if(options.minimum_rating) {
    queryParams.push(`${options.minimum_rating}`)
    queryString += `HAVING avg(property_reviews.rating) >= $${queryParams.length} `;
  }
  queryParams.push(limit);
  queryString += `ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `;

  // 5
  console.log(queryString, queryParams);

  // 6
  return pool.query(queryString, queryParams).then((res) => res.rows);
};
exports.getAllProperties = getAllProperties;

/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  const propertyId = Object.keys(properties).length + 1;
  property.id = propertyId;
  properties[propertyId] = property;
  return Promise.resolve(property);
}
exports.addProperty = addProperty;
