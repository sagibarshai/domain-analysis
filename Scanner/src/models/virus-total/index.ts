import axios from "axios";
import { VirusTotalData, VirusTotalRow } from "./types";

const virusTotal = async (payload: VirusTotalData): Promise<VirusTotalRow> => {
  return (
    await axios.post(`http://data:4001/api/virustotal`, {
      ...payload,
    })
  ).data.data as VirusTotalRow;
};
export { virusTotal as virusTotalModel };
