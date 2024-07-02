import { pgClient } from "../../db/init-db";
import { VirusTotalPayload, SavedVirusTotalDomain } from "./types";

const virusTotal = async (payload: VirusTotalPayload): Promise<SavedVirusTotalDomain> => {
  return (
    await pgClient.query(
      `
              INSERT INTO virus_total_data 
              (domain, last_analysis_date, reputation, last_https_certificate_date, 
              creation_date, last_update_date, registrar, harmless, malicious, 
              suspicious, undetected) 
              VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
              RETURNING *
          `,
      [
        payload.domain,
        payload.lastAnalysisDate,
        payload.reputation,
        payload.lastHttpsCertificateDate,
        payload.creationDate,
        payload.lastUpdateDate,
        payload.registrar,
        payload.harmless,
        payload.malicious,
        payload.suspicious,
        payload.undetected,
      ]
    )
  ).rows[0] as SavedVirusTotalDomain;
};

export { virusTotal as virusTotalModel };
