import { Client } from 'pg';

const pool = new Client({
  connectionString: process.env.DATABASE_URL,
});

const createUserTable = () => {
  const userQuery = `CREATE TABLE IF NOT EXISTS
                      user(
                        id UUID primary key,
                        email VARCHAR(255) UNIQUE NOT NULL,
                        password VARCHAR(255) NOT NULL,
                        user_id UUID NOT NULL,
                        firstname VARCHAR(255) NOT NULL,
                        lastname VARCHAR(255),
                        created_at TIMESTAMP,
                        isAdmin BOOLEAN DEFAULT 'false' NOT NULL,
                      )`;

  pool.query(userQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

const createTripTable = () => {
  const tripQuery = `CREATE TABLE IF NOT EXISTS
                      trip(
                        id UUID PRIMARY KEY,
                        bus_id UUID NOT NULL
                        origin TEXT default 'active' UNIQUE NOT NULL,
                        destination VARCHAR(255) NOT NULL,
                        trip_date DATE,
                        fare TEXT NOT NULL,
                        status TEXT NOT NULL default 'active',
                        FOREIGN KEY (BUS_ID) REFERENCES user (ID) ON DELETE CASCADE
                      )`;

  pool.query(tripQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

const createBookingTable = () => {
  const bookingQuery = `CREATE TABLE IF NOT EXISTS
                      booking(
                        id UUID,
                        bus_id UUID primary key,
                        user_id UUID primary key,
                        created_on DATE,
                        PRIMARY KEY (id) REFERENCES user (id) trip (id) ON DELETE CASCADE,
                      )`;

  pool.query(bookingQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};
const dropUserTable = () => {
  const dropUserQuery = 'DROP TABLE IF EXISTS user returning *';
  pool.query(dropUserQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

const dropTripTable = () => {
  const dropTripQuery = 'DROP TABLE IF EXISTS trip returning *';
  pool.query(dropTripQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

const dropBookingTable = () => {
  const dropBookingQuery = 'DROP TABLE IF EXISTS booker returning *';
  pool.query(dropBookingQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

const createAllTable = () => {
  createUserTable();
  createTripTable();
  createBookingTable();
};

const dropAllTable = () => {
  dropUserTable();
  dropTripTable();
  dropBookingTable();
};
pool.on('connect', () => {
  createAllTable();
});

pool.on('remove', () => {
  console.log('client removed');
  process.exit(0);
});

module.exports = {
  createUserTable,
  createTripTable,
  createBookingTable,
  createAllTable,
  dropUserTable,
  dropTripTable,
  dropAllTable,
  dropBookingTable,
  pool,
};
