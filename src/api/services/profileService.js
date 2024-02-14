const { Op } = require('sequelize');
const { Profile, User } = require('../models');
const CustomErrors = require('../../errors');
const pagination = require('../../utils/pagination');

// return user with custom fields
const getById = async (id, requiredFields = null) => {
  const options = {};
  if (requiredFields) {
    options.attributes = ['id', ...requiredFields];
  }
  const profile = await Profile.findByPk(id, options);
  if (!profile) {
    throw CustomErrors.NotFoundError('Profile not found');
  }
  return profile;
};

const createNewProfile = async (payload) => {
//   if (!payload.roleId) {
//     const role = await Role.findOne({ where: { name: 'user' } });
//     if (!role) {
//       throw CustomErrors.NotFoundError('Role not found');
//     }
//     payload.roleId = role.id;
//   }
  const profile = await Profile.create(payload);
  return profile;
};

const getProfiles = async (payload) => {
  // const allowedSortFields = ['username', 'createdAt'];
  // const sortByField = allowedSortFields.includes(payload.sortBy)
  //   ? payload.sortBy
  //   : 'username';
  const { limit, offset } = pagination(payload.page, payload.limit);
  const profiles = await Profile.findAll({
    where: {
      username: {
        [Op.iLike]: `%${payload.search}%`,
      },
    },
    order: [[payload.sortBy, 'ASC']],
    limit,
    offset,
  });
  return profiles;
};

const getProfile = async (productId) => {
  const profile = await Profile.findByPk(productId, {
    attributes: ['id', 'name', 'createdAt'],
  });
  if (!profile) {
    throw CustomErrors.NotFoundError('Profile not found');
  }
  return profile;
};

const updateProfile = async (profileId, payload) => {
  const profile = await getById(profileId);
  if (payload.name) {
    profile.name = payload.name;
  }

  await profile.save();
  return profile;
};

const deleteProfile = async (profileId) => {
  const profile = await getById(profileId);
  await profile.destroy();
};

module.exports = {
  createNewProfile,
  getById,
  getProfiles,
  getProfile,
  updateProfile,
  deleteProfile,
};