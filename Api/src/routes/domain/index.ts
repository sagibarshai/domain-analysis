import { Router } from "express";
import { body, param } from "express-validator";
import { domainRegex } from "../../constants/regex";
import { getDomainController } from "../../controllers/domains/get-domain";
import { createDomainController } from "../../controllers/domains/create-domain";
import { requestValidationErrorMiddleware } from "../../middlewares/request-validation";

const router = Router();

router.get(
  "/:domain",
  param("domain").matches(domainRegex).withMessage("Domain is not valid"),
  requestValidationErrorMiddleware,
  getDomainController
);

router.post("/", body("domain").matches(domainRegex).withMessage("Domain is not valid"), requestValidationErrorMiddleware, createDomainController);

export { router as domainRouter };
