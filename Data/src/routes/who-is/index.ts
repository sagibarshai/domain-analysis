// virusTotalController

import { Router } from "express";
import { whoIsController } from "../../controllers/who-is";
import { body } from "express-validator";
import { domainRegex } from "../../constants/regex";
import { requestValidationErrorMiddleware } from "../../middlewares/request-validation";

const router = Router();

router.post(
  "/",
  body("domainName").matches(domainRegex).withMessage("Domain is not valid"),
  body("createdDate").exists().withMessage("createdDate must exists"),
  body("updatedDate").exists().withMessage("updatedDate must exists"),
  body("expiresDate").exists().withMessage("expiresDate must be exists"),
  // body("registrantOrganization").exists().
  requestValidationErrorMiddleware,
  whoIsController
);

export { router as whoIsRouter };
