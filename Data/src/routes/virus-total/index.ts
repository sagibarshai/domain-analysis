// virusTotalController

import { Router } from "express";
import { virusTotalController } from "../../controllers/virus-total";
import { body } from "express-validator";
import { domainRegex } from "../../constants/regex";
import { requestValidationErrorMiddleware } from "../../middlewares/request-validation";

const router = Router();

router.post(
  "/",
  body("domain").matches(domainRegex).withMessage("Domain is not valid"),
  body("lastAnalysisDate").exists().withMessage("lastAnalysisDate must be included"),
  body("reputation").isNumeric().withMessage("reputation must be of type INT"),
  body("lastHttpsCertificateDate").exists().withMessage("lastHttpsCertificateDate must be included"),
  body("creationDate").exists().withMessage("creationDate must be included"),
  body("harmless").isNumeric().withMessage("harmless must be of type INT"),
  body("malicious").isNumeric().withMessage("malicious must be of type INT"),
  body("suspicious").isNumeric().withMessage("suspicious must be of type INT"),
  body("undetected").isNumeric().withMessage("undetected must be of type INT"),
  requestValidationErrorMiddleware,
  virusTotalController
);

export { router as virusTotalRouter };
