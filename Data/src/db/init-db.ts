import { Pool } from "pg";

export const pgClient = new Pool({
  user: "postgres",
  password: "postgres",
  database: "domains",
  port: 5432,
  host: "postgres",
  ssl: false,
});

pgClient.on("connect", async (client) => {
  console.log("CONNECTED TO DATABASE!!! ");

  try {
    await client.query("CREATE TYPE domain_status AS ENUM ('pending', 'scanned', 'failure')");

    await client.query(`CREATE TABLE IF NOT EXISTS requests (
        id SERIAL PRIMARY KEY,
        method VARCHAR(8) NOT NULL,
        url VARCHAR(255) NOT NULL,
        ip VARCHAR(255) NOT NULL,
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
        params JSONB,
        body JSONB,
        domain_requested VARCHAR(255)
        )`);

    console.log("request table is just created !");

    await client.query(`CREATE TABLE IF NOT EXISTS domains_to_scan (
          id SERIAL PRIMARY KEY,
          domain VARCHAR(255) NOT NULL UNIQUE,
          status domain_status NOT NULL,
          last_scan TIMESTAMP,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
          request_id INT REFERENCES requests
        )`);

    console.log("domains_to_scan table is just created !");

    await client.query(`CREATE TABLE IF NOT EXISTS virus_total_data (
          id SERIAL PRIMARY KEY,
          domain VARCHAR(255) NOT NULL,
          last_analysis_date TIMESTAMP,
          reputation INT,
          last_https_certificate_date TIMESTAMP,
          creation_date TIMESTAMP,
          last_update_date TIMESTAMP,
          registrar VARCHAR(255),
          harmless INT,
          malicious INT,
          suspicious INT,
          undetected INT,
          timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
)`);
    console.log("virus_total_data table is just created !");

    client.query(`CREATE TABLE whois_data (
        id SERIAL PRIMARY KEY,
        domain VARCHAR(255) NOT NULL,
        created_date TIMESTAMP,
        updated_date TIMESTAMP,
        expires_date TIMESTAMP ,
        registrant_organization VARCHAR(1024),
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
)  `);
    console.log("whois_data table is just created !");
  } catch (err) {
    console.log("Error with init db: ", err);
  }
});
