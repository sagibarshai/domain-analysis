export interface VirusTotalPayload {
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
}
export interface SavedVirusTotalDomain {
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
