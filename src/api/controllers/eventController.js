const { successResponse } = require('../../utils/apiResponse');
const asyncWrapper = require('../../middlewares/asyncHandler');
const { eventService } = require('../services');

const createEvent = asyncWrapper(async (req, res, next) => {
    const event = await eventService.createNewEvent(req.body);
    return successResponse(res, statusCode.CREATED, event, 'Event Created Successfully');
});

const getEvents = asyncWrapper(async (req, res, next) => {
  const events = await eventService.getEvents(req.query);
  return successResponse(res, 200, events, 'Events Retrieved Successfully');
});

const getEvent = asyncWrapper(async (req, res, next) => {
  const { eventId } = req.params;
  const event = await eventService.getEvent(eventId);
  return successResponse(res, 200, event, 'Event Retrieved Successfully');
});

const updateEvent = asyncWrapper(async (req, res, next) => {
  const { eventId } = req.params;
  const event = await eventService.updateEvent(eventId, req.body);
  return successResponse(res, 200, event, 'Event Updated Successfully');
});

const deleteEvent = asyncWrapper(async (req, res, next) => {
  const { eventId } = req.params;
  await eventService.deleteEvent(eventId);
  return successResponse(res, 200, null, 'Event Deleted Successfully');
});

module.exports = {
  createEvent,
  getEvents,
  getEvent,
  updateEvent,
  deleteEvent,
};