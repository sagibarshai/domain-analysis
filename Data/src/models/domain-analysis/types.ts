import { SavedVirusTotalDomain } from "../virus-total/types";
import { SavedWhoisDomain } from "../whois/types";

export interface DomainAnalysisData {
  timestamp: Date;
  virusTotal: Omit<SavedVirusTotalDomain, "timestamp">;
  whoIs: Omit<SavedWhoisDomain, "timestamp">;
}
