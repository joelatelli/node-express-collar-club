const Joi = require('joi');

const createEvent = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    desc: Joi.string().required(),
    address: Joi.string().required(),
    url: Joi.string().required(),
    lat: Joi.number(),
    long: Joi.number(),
    private: Joi.boolean().required(),
    startDate: Joi.string().required(),
    endDate: Joi.string().required(),
    userId: Joi.string().required()
  }),
};

const getEvents = {
  query: Joi.object().keys({
    search: Joi.string().empty(''),
    sortBy: Joi.string(),
    limit: Joi.number().integer().default(10),
    page: Joi.number().integer(),
  }),
};

const getEvent = {
  params: Joi.object().keys({
    userId: Joi.string().required(),
  }),
};

const updateEvent = {
  params: Joi.object().keys({
    userId: Joi.required(),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
      email: Joi.string().email(),
    })
    .min(1),
};

const deleteEvent = {
  params: Joi.object().keys({
    userId: Joi.string().required(),
  }),
};

module.exports = {
  createEvent,
  getEvents,
  getEvent,
  updateEvent,
  deleteEvent,
};