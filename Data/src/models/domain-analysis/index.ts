import { pgClient } from "../../db/init-db";
import { DomainAnalysisData } from "./types";

export const getDomainAnalysisData = async (domain: string): Promise<DomainAnalysisData | null> => {
  const domainAnalysis = (
    await pgClient.query(
      `
        SELECT 
            vtd.id AS virus_total_id,
            vtd.domain,
            vtd.last_analysis_date,
            vtd.reputation,
            vtd.last_https_certificate_date,
            vtd.creation_date AS virus_total_creation_date,
            vtd.last_update_date,
            vtd.registrar,
            vtd.harmless,
            vtd.malicious,
            vtd.suspicious,
            vtd.undetected,
            vtd.timestamp AS virus_total_timestamp,
            whois.id AS whois_id,
            whois.domain,
            whois.created_date AS whois_created_date,
            whois.updated_date AS whois_updated_date,
            whois.expires_date,
            whois.registrant_organization,
            whois.timestamp AS whois_timestamp
        FROM 
            virus_total_data vtd
        LEFT JOIN 
            whois_data whois 
        ON 
            vtd.domain = whois.domain
        WHERE 
            vtd.domain = $1
        AND 
            whois.domain = $1
        AND 
            vtd.timestamp = (
                SELECT MAX(timestamp) 
                FROM virus_total_data 
                WHERE domain = vtd.domain
            )
        AND 
            whois.timestamp = (
                SELECT MAX(timestamp) 
                FROM whois_data 
                WHERE domain = whois.domain
            )
        ORDER BY vtd.timestamp DESC
        LIMIT 1;
      `,
      [domain]
    )
  ).rows[0];

  if (!domainAnalysis) {
    console.log("domainAnalysis ", domainAnalysis);
    return null;
  }

  const virusTotalData: DomainAnalysisData["virusTotal"] = {
    id: domainAnalysis.virus_total_id,
    domain: domainAnalysis.domain,
    lastAnalysisDate: domainAnalysis.last_analysis_date,
    reputation: domainAnalysis.reputation,
    lastHttpsCertificateDate: domainAnalysis.last_https_certificate_date,
    creationDate: domainAnalysis.virus_total_creation_date,
    lastUpdateDate: domainAnalysis.last_update_date,
    registrar: domainAnalysis.registrar,
    harmless: domainAnalysis.harmless,
    malicious: domainAnalysis.malicious,
    suspicious: domainAnalysis.suspicious,
    undetected: domainAnalysis.undetected,
  };

  const whoisData: DomainAnalysisData["whoIs"] = {
    id: domainAnalysis.whois_id,
    domain: domainAnalysis.domain,
    createdDate: domainAnalysis.whois_created_date,
    updatedDate: domainAnalysis.whois_updated_date,
    expiresDate: domainAnalysis.expires_date,
    registrantOrganization: domainAnalysis.registrant_organization,
  };

  const domainAnalysisJoinedData: DomainAnalysisData = {
    timestamp: domainAnalysis.timestamp,
    virusTotal: virusTotalData,
    whoIs: whoisData,
  };
  console.log("domainAnalysisJoinedData ", domainAnalysisJoinedData);
  return domainAnalysisJoinedData;
};

export { getDomainAnalysisData as getDomainAnalysisDataModel };
