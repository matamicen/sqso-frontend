// Any route that comes in, send it to the universalLoader

import express from "express";
import replace_qra_tags from "../replace_qra_tags";
import replace_qso_tags from "../replace_qso_tags";
import universalLoader from "../universal";
const router = express.Router();



router.get("/", universalLoader);
router.use("/qso/:idQSO", replace_qso_tags);
router.use("/:idQRA", replace_qra_tags);




export default router;
