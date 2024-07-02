import axios from "axios";
import { RequestPayload, SavedRequestData } from "./types";

const createRequest = async (RequestPayload: RequestPayload): Promise<SavedRequestData> => {
  return (await axios.post("http://data:4001/api/request", RequestPayload)).data.data;
};

export { createRequest as createRequestModel };
