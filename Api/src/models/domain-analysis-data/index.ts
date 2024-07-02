import axios from "axios";
import { DomainAnalysisData } from "./types";

const getDomainAnalysis = async (domain: string): Promise<DomainAnalysisData> => {
  return (await axios.get(`http://data:4001/api/domain/analysis/${domain}`)).data.data as DomainAnalysisData;
};

export { getDomainAnalysis as getDomainAnalysisModel };
