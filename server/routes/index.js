// Any route that comes in, send it to the universalLoader

import express from 'express';
import universalLoader from '../universal';
import replace_qra_tags from '../replace_qra_tags'
import replace_qso_tags from '../replace_qso_tags'
const router = express.Router();

router.get('/', universalLoader);
router.get('/qso/:idQSO', replace_qso_tags);
router.get('/:idQRA', replace_qra_tags);

export default router;
