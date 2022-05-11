import express from 'express';
import portfolio from './portfolio';
import holdings from './holdings';
import cash from './cash';

export default (): express.Router => {
	const router = express.Router();
	router.use('/', portfolio());
	router.use('/', holdings());
	router.use('/', cash());

	return router;
};
