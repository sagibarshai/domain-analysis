import { pgClient } from "../../db/init-db";
import { SavedDomainData } from "./types";
import { SaveDomainPayloadRequest, UpdateDomainPayloadRequest } from "../../routes/domain/types";

const createDomain = async (domainPayload: SaveDomainPayloadRequest["body"]): Promise<SavedDomainData> => {
  return (
    await pgClient.query(
      `
      INSERT INTO domains_to_scan ( domain, status,last_scan, request_id ) VALUES ($1, $2, $3, $4) RETURNING *
      `,
      [domainPayload.domain, "pending", undefined, domainPayload.requestId]
    )
  ).rows[0] as SavedDomainData;
};
const updateDomain = async (domainPayload: UpdateDomainPayloadRequest["body"]): Promise<SavedDomainData> => {
  return (
    await pgClient.query(
      `
      UPDATE domains_to_scan SET last_scan=$1, status=$2 WHERE domain=$3 RETURNING *
      `,
      [domainPayload.last_scan, domainPayload.status, domainPayload.domain]
    )
  ).rows[0] as SavedDomainData;
};

const getDomain = async (domainPayload: Omit<SaveDomainPayloadRequest["body"], "requestId">): Promise<SavedDomainData | null> => {
  const domain = (
    await pgClient.query(
      `
    SELECT * FROM domains_to_scan WHERE domain=$1
    `,
      [domainPayload.domain]
    )
  ).rows as SavedDomainData[];

  if (!domain.length) return null;

  return domain[0];
};
const getDomains = async (): Promise<SavedDomainData[]> => {
  return (
    await pgClient.query(
      `
    SELECT * FROM domains_to_scan
    `
    )
  ).rows as SavedDomainData[];
};

export { createDomain as createDomainModel, getDomain as getDomainModel, getDomains as getDomainsModel, updateDomain as updateDomainModel };
