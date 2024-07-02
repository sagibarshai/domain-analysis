import { pgClient } from "../../db/init-db";
import { SaveRequestPayloadRequest } from "../../routes/requests/types";

import { SavedRequestData } from "./types";

const createRequest = async (request: SaveRequestPayloadRequest["body"]): Promise<SavedRequestData> => {
  return (
    await pgClient.query(
      `INSERT INTO requests
     (method, url, ip, params, body, domain_requested)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING * 
    `,
      [request.method, request.url, request.ip, request.params, request.body, request.domain_requested]
    )
  ).rows[0] as SavedRequestData;
};

export { createRequest as createRequestModel };
