'use strict';

/** @type {import('sequelize-cli').Migration} */

const bcrypt = require("bcryptjs");
const {
  player1uuid,
  player2uuid,
  player3uuid,
  player4uuid,
  player5uuid
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
      id: player1uuid,
      name: 'Phil',
      email: 'pcartwirght@email.com',
      hashedPassword: bcrypt.hashSync('password1', 13),
      profileImage: 'https://xsgames.co/randomusers/assets/avatars/male/35.jpg'
    },
    {
      id: player2uuid,
      name: 'Beatrice',
      email: 'bhobbs@email.com',
      hashedPassword: bcrypt.hashSync('password2', 13),
      profileImage: 'https://xsgames.co/randomusers/assets/avatars/female/33.jpg'
    },
    {
      id: player3uuid,
      name: 'Craig',
      email: 'cmackey@email.com',
      hashedPassword: bcrypt.hashSync('password3', 13),
      profileImage: 'https://xsgames.co/randomusers/assets/avatars/male/40.jpg'
    },
    {
      id: player4uuid,
      name: 'Marshall',
      email: 'mmitchell@email.com',
      hashedPassword: bcrypt.hashSync('password4', 13),
      profileImage: 'https://xsgames.co/randomusers/assets/avatars/male/3.jpg'
    },
    {
      id: player5uuid,
      name: 'Megan',
      email: 'mballion@email.com',
      hashedPassword: bcrypt.hashSync('password5', 13),
      profileImage: 'https://xsgames.co/randomusers/assets/avatars/female/3.jpg'
    },
   ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Users';
    await queryInterface.bulkDelete(options)
  }
};