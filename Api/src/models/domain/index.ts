import axios from "axios";
import { CreateDomainPayload, SavedDomainData } from "./types";

const createDomain = async (domainPayload: CreateDomainPayload): Promise<SavedDomainData> => {
  return (await axios.post("http://data:4001/api/domain", { domain: domainPayload.domain, requestId: domainPayload.requestId }))
    .data as SavedDomainData;
};

const getDomain = async (domainPayload: CreateDomainPayload): Promise<SavedDomainData> => {
  return (await axios.get(`http://data:4001/api/domain/${domainPayload.domain}`)).data as SavedDomainData;
};

export { createDomain as createDomainModel, getDomain as getDomainModel };
