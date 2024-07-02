export interface getDomainAnalysisDataPayload {
  domain: string;
}

interface SavedVirusTotalDomain {
  id: number;
  domain: string;
  lastAnalysisDate: Date;
  reputation: number;
  lastHttpsCertificateDate: Date;
  creationDate: Date;
  lastUpdateDate: Date;
  registrar: string;
  harmless: number;
  malicious: number;
  suspicious: number;
  undetected: number;
  timestamp: Date;
}
interface SavedWhoisDomain {
  id: number;
  domain: string;
  createdDate: Date;
  updatedDate: Date;
  expiresDate: Date | null;
  registrantOrganization: string | null;
  timestamp: Date;
}

export interface DomainAnalysisData {
  timestamp: Date;
  virusTotal: Omit<SavedVirusTotalDomain, "timestamp">;
  whoIs: Omit<SavedWhoisDomain, "timestamp">;
}
