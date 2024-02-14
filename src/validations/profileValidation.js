const Joi = require('joi');

const createProfile = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    username: Joi.string().required(),
  }),
};

const getProfiles = {
  query: Joi.object().keys({
    search: Joi.string().empty(''),
    sortBy: Joi.string(),
    limit: Joi.number().integer().default(10),
    page: Joi.number().integer(),
  }),
};

const getProfile = {
  params: Joi.object().keys({
    userId: Joi.string().required(),
  }),
};

const updateProfile = {
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

const deleteProfile = {
  params: Joi.object().keys({
    userId: Joi.string().required(),
  }),
};

module.exports = {
  createProfile,
  getProfiles,
  getProfile,
  updateProfile,
  deleteProfile,
};