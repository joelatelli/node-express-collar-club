const express = require('express');
const validate = require('../middlewares/validate');
const profileValidation = require('../validations/profileValidation');
const { profileController } = require('../api/controllers');
const router = express.Router();

router.get('/', validate(profileValidation.getProfiles), profileController.getProfiles);
router.get('/:profileId', validate(profileValidation.getProfile), profileController.getProfile);

router.post('/', validate(profileValidation.createProfile), profileController.postProfile);

router.put('/:profileId', validate(profileValidation.updateProfile), profileController.updateProfile);

router.delete('/:profileId', validate(profileValidation.deleteProfile), profileController.deleteProfile);

module.exports = router;