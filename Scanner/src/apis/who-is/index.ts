import axios from "axios";
import { WhoisData } from "../../models/who-is/types";

export const fetchWhoisData = async (domain: string): Promise<WhoisData | null> => {
  try {
    const apiKey = process.env.WHO_IS_API_KEY; // Replace with your actual API key
    const response = await axios.get(`https://www.whoisxmlapi.com/whoisserver/WhoisService?apiKey=${apiKey}&domainName=${domain}&outputFormat=json`);

    const whoisResponse = response.data.WhoisRecord;

    const whoisData: WhoisData = {
      domainName: whoisResponse.domainName,
      createdDate: new Date(whoisResponse.createdDate),
      updatedDate: new Date(whoisResponse.updatedDate),
      expiresDate: new Date(whoisResponse.expiresDate),
      registrantOrganization: whoisResponse.registrant?.organization,
    };

    return whoisData;
  } catch (err) {
    console.log("Error fetching WHOIS data:", err);
    return null;
  }
};
