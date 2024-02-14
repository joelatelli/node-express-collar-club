const express = require('express');
const validate = require('../middlewares/validate');
const eventValidation = require('../validations/eventValidation');
const { eventController } = require('../api/controllers');
const router = express.Router();

router.get('/', validate(eventValidation.getEvents), eventController.getEvents);
router.get('/:eventId', validate(eventValidation.getEvent), eventController.getEvent);

router.post('/', validate(eventValidation.createEvent), eventController.createEvent);

router.put('/:eventId', validate(eventValidation.updateEvent), eventController.updateEvent);

router.delete('/:eventId', validate(eventValidation.deleteEvent), eventController.deleteEvent);

module.exports = router;