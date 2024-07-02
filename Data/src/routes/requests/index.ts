import { Router } from "express";
import { body } from "express-validator";
import { requestValidationErrorMiddleware } from "../../middlewares/request-validation";
import { requestsController } from "../../controllers/requests";

const router = Router();

router.post(
  "/",
  body("method").exists().withMessage("method property is must be include"),
  body("url").exists().withMessage("url property is must be include"),
  body("ip").exists().withMessage("ip property is must be include"),
  body("params").exists().withMessage("params property is must be include"),
  body("body").exists().withMessage("body property is must be include"),
  requestValidationErrorMiddleware,
  requestsController
);

export { router as requestsRouter };
