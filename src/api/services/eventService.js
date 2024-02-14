const { Op } = require('sequelize');
const { Event } = require('../models');
const CustomErrors = require('../../errors');
const pagination = require('../../utils/pagination');

// return user with custom fields
const getById = async (id, requiredFields = null) => {
  const options = {};
  if (requiredFields) {
    options.attributes = ['id', ...requiredFields];
  }
  const user = await Event.findByPk(id, options);
  if (!user) {
    throw CustomErrors.NotFoundError('User not found');
  }
  return user;
};

const createNewEvent = async (payload) => {
//   if (!payload.roleId) {
//     const role = await Role.findOne({ where: { name: 'user' } });
//     if (!role) {
//       throw CustomErrors.NotFoundError('Role not found');
//     }
//     payload.roleId = role.id;
//   }
  const event = await Event.create(payload);
  return event;
};

const getEvents = async (payload) => {
  // const allowedSortFields = ['username', 'createdAt'];
  // const sortByField = allowedSortFields.includes(payload.sortBy)
  //   ? payload.sortBy
  //   : 'username';
  const { limit, offset } = pagination(payload.page, payload.limit);
  const users = await Event.findAll({
    where: {
      username: {
        [Op.iLike]: `%${payload.search}%`,
      },
    },
    order: [[payload.sortBy, 'ASC']],
    limit,
    offset,
  });
  return users;
};

const getEvent = async (userId) => {
  const user = await Event.findByPk(userId, {
    attributes: ['id', 'email', 'username', 'createdAt'],
  });
  if (!user) {
    throw CustomErrors.NotFoundError('User not found');
  }
  return user;
};

const updateEvent = async (eventId, payload) => {
  const event = await getById(eventId);
  if (payload.name) {
    event.name = payload.name;
  }

  await event.save();
  return event;
};

const deleteEvent = async (userId) => {
  const user = await getById(userId);
  await user.destroy();
};

module.exports = {
  createNewEvent,
  getById,
  getEvents,
  getEvent,
  updateEvent,
  deleteEvent,
};