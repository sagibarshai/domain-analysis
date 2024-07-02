import { pgClient } from "../../db/init-db";
import { SavedWhoisDomain, WhoisPayload } from "./types";

const whoIs = async (data: WhoisPayload): Promise<SavedWhoisDomain> => {
  const { domainName, createdDate, updatedDate, expiresDate, registrantOrganization } = data;

  return (
    await pgClient.query(
      `
        INSERT INTO whois_data
        (domain, created_date, updated_date, expires_date, registrant_organization)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *
      `,
      [domainName, createdDate, updatedDate, expiresDate, registrantOrganization]
    )
  ).rows[0] as SavedWhoisDomain;
};

export { whoIs as whoIsModel };
