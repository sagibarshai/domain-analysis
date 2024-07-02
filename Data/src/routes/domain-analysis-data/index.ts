import { Router } from "express";
import { param } from "express-validator";
import { domainRegex } from "../../constants/regex";
import { requestValidationErrorMiddleware } from "../../middlewares/request-validation";
import { domainAnalysisDataController } from "../../controllers/domain-analysis-data";

const router = Router();

router.get(
  "/:domain",
  param("domain").matches(domainRegex).withMessage("Domain is not valid"),
  requestValidationErrorMiddleware,
  domainAnalysisDataController
);

export { router as domainAnalysisDataRouter };
