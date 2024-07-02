import axios from "axios";
import { fetchVirusTotalData } from "../apis/virus-total";
import { updateDomainModel } from "../models/domains-to-scan";
import { DomainsToScan } from "../models/domains-to-scan/types";
import { virusTotalModel } from "../models/virus-total";
import { fetchWhoisData } from "../apis/who-is";
import { whoIsModelModel } from "../models/who-is";

export const scanDomains = async () => {
  try {
    const domainsToScanResponse = await axios.get("http://data:4001/api/domain");
    const domainsToScan: DomainsToScan[] = domainsToScanResponse.data.data;
    for (const domain of domainsToScan) {
      try {
        const virusTotalData = await fetchVirusTotalData(domain.domain);
        const whoIsData = await fetchWhoisData(domain.domain);

        if (!virusTotalData && !whoIsData) {
          domain.status = "failure";
          domain.last_scan = new Date();
          const updatedDomain = await updateDomainModel({ domain: domain.domain, last_scan: domain.last_scan, status: domain.status });

          console.log("Update domain_to_scan on the domain ", updatedDomain);
        } else {
          if (virusTotalData) await virusTotalModel({ ...virusTotalData });
          if (whoIsData) {
            const whoIsRecord = await whoIsModelModel({ ...whoIsData });
            console.log("whoIsRecord ", whoIsRecord);
          }

          domain.status = "scanned";
          domain.last_scan = new Date();

          const updatedDomain = await updateDomainModel({ domain: domain.domain, last_scan: domain.last_scan, status: domain.status });
          console.log("Update domain_to_scan on the domain ", updatedDomain);
        }
      } catch (err) {
        console.log(`Error scanning domain ${domain.domain}:`, err);
      }
    }

    console.log("Domain scanning completed.");
  } catch (err) {
    console.log("Error fetching domains to scan from virustotal:", err);
    throw err;
  }
};
