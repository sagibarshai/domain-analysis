import { Router } from "express";
import { body, param } from "express-validator";
import { domainRegex } from "../../constants/regex";
import { requestValidationErrorMiddleware } from "../../middlewares/request-validation";
import { createDomainController, getDomainController, getDomainsController, updateDomainController } from "../../controllers/domain";

const router = Router();

router.post("/", body("domain").matches(domainRegex).withMessage("Domain is not valid"), requestValidationErrorMiddleware, createDomainController);

router.get(
  "/:domain",
  param("domain").matches(domainRegex).withMessage("Domain is not valid"),
  requestValidationErrorMiddleware,
  getDomainController
);

router.get("/", getDomainsController);

router.put("/", body("domain").matches(domainRegex).withMessage("Domain is not valid"), requestValidationErrorMiddleware, updateDomainController);

export { router as domainsRouter };
