import multer from 'multer';
import { AVATAR_MIME_TYPES } from '@portbullio/shared/src/constants/index';

export default multer({
	fileFilter: (req, file, cb) => {
		if (file.mimetype in AVATAR_MIME_TYPES) {
			return cb(null, true);
		}

		return cb(new Error('Invalid MIME type of the avatar file.'));
	}
});
