export interface WhoisPayload {
  domainName: string;
  createdDate: Date;
  updatedDate: Date;
  expiresDate: Date | null;
  registrantOrganization: string | null;
}

export interface SavedWhoisDomain {
  id: number;
  domain: string;
  createdDate: Date;
  updatedDate: Date;
  expiresDate: Date | null;
  registrantOrganization: string | null;
  timestamp: Date;
}
