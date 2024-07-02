import axios from "axios";
import { DomainToScanUpdatePayload, DomainsToScan } from "./types";

const updateDomain = async (payload: DomainToScanUpdatePayload): Promise<DomainsToScan> => {
  return (
    await axios.put(`http://data:4001/api/domain/`, {
      domain: payload.domain,
      status: payload.status,
      last_scan: payload.last_scan,
    })
  ).data as DomainsToScan;
};
export { updateDomain as updateDomainModel };
