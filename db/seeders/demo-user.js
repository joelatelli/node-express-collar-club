'use strict';

/** @type {import('sequelize-cli').Migration} */

const bcrypt = require("bcryptjs");
const {
  adminuuid
} = require('../seedUUIDs')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA
}

module.exports = {
  async up (queryInterface, Sequelize) {
   options.tableName = 'Users';
   await queryInterface.bulkInsert(options, [
    {
      id: adminuuid,
      name: 'Admin',
      email: 'admin@gmail.com',
      isAdmin: false,
      hashedPassword: bcrypt.hashSync('password123', 13),
      profileImage: 'https://xsgames.co/randomusers/assets/avatars/male/35.jpg'
    }
   ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Users';
    await queryInterface.bulkDelete(options)
  }
};