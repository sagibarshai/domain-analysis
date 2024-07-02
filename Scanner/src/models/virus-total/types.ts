export interface VirusTotalResponse {
  data: {
    id: string;
    type: string;
    attributes: {
      last_analysis_date: number;
      reputation: number;
      last_https_certificate_date: number;
      creation_date: number;
      last_update_date: number;
      registrar: string;
      last_analysis_stats: {
        malicious: number;
        suspicious: number;
        undetected: number;
        harmless: number;
      };
    };
  };
}

export interface VirusTotalData {
  domain: string;
  lastAnalysisDate: Date | null;
  lastHttpsCertificateDate: Date | null;
  creationDate: Date | null;
  lastUpdateDate: Date | null;
  registrar: string | undefined;
  reputation: number;
  malicious: number;
  suspicious: number;
  undetected: number;
  harmless: number;
}

export interface VirusTotalRow {
  id: number;
  domain: string;
  lastAnalysisDate: Date | null;
  lastHttpsCertificateDate: Date | null;
  creationDate: Date | null;
  lastUpdateDate: Date | null;
  registrar: string | undefined;
  reputation: number;
  malicious: number;
  suspicious: number;
  undetected: number;
  harmless: number;
  timestamp: Date;
}
