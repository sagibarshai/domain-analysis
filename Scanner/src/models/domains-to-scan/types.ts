export interface DomainToScanUpdatePayload {
  domain: string;
  status: "pending" | "scanned" | "failure";
  last_scan: Date;
}
export interface DomainsToScan {
  id: number;
  domain: string;
  status: "pending" | "scanned" | "failure";
  last_scan: Date | undefined;
  created_at: Date;
  updated_at: Date;
}
