import axios from "axios";
import { WhoisData, WhoisRow } from "./types";

const whoIsModel = async (payload: WhoisData): Promise<WhoisRow> => {
  return (
    await axios.post(`http://data:4001/api/whois`, {
      ...payload,
    })
  ).data.data as WhoisRow;
};
export { whoIsModel as whoIsModelModel };
