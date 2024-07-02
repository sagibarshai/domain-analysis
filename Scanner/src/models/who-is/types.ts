export interface WhoisData {
  domainName: string;
  createdDate: Date;
  updatedDate: Date;
  expiresDate: Date;
  registrantOrganization: string;
}
export interface WhoisRow {
  id: number;
  domainName: string;
  createdDate: Date;
  updatedDate: Date;
  expiresDate: Date | null;
  registrantOrganization: string | null;
  timestamp: Date;
}
