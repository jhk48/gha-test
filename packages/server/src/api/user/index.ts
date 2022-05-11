import express from 'express';
import avatar from './avatar';
import assetChart from './assetChart';
import profile from './profile';

export default (): express.Router => {
	const router = express.Router();
	router.use('/avatar', avatar());
	router.use('/asset-chart', assetChart());
	router.use('/profile', profile());

	return router;
};
