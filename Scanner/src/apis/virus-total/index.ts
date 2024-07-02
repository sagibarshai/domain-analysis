import axios from "axios";
import { VirusTotalData, VirusTotalResponse } from "../../models/virus-total/types";

export const fetchVirusTotalData = async (domain: string): Promise<VirusTotalData | null> => {
  try {
    const apiKey = process.env.VIRUS_TOTAL_API_KEY;

    const response = await axios.get<VirusTotalResponse>(`https://www.virustotal.com/api/v3/domains/${domain}`, {
      headers: {
        "x-apikey": apiKey,
      },
    });
    const { data } = response.data;

    const virusTotalData: VirusTotalData = {
      domain: data.id,
      lastAnalysisDate: data.attributes.registrar ? new Date(data.attributes.last_analysis_date * 1000) : null,
      reputation: data.attributes.reputation,
      lastHttpsCertificateDate: data.attributes.registrar ? new Date(data.attributes.last_https_certificate_date * 1000) : null,
      creationDate: data.attributes.registrar ? new Date(data.attributes.creation_date * 1000) : null,
      lastUpdateDate: data.attributes.registrar ? new Date(data.attributes.last_update_date * 1000) : null,
      registrar: data.attributes.registrar,
      harmless: data.attributes.last_analysis_stats.harmless,
      malicious: data.attributes.last_analysis_stats.malicious,
      suspicious: data.attributes.last_analysis_stats.suspicious,
      undetected: data.attributes.last_analysis_stats.undetected,
    };
    return virusTotalData;
  } catch (err) {
    console.log("Error fetching data from VirusTotal:", err);

    return null;
  }
};
