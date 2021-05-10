const User = require('../models/User');

const userData = [
    {
        username: "Brie",
        email: "bbradford@gmail.com",
        password: "password12345",
    },
    {
        username: "Vito",
        email: "vito@gmail.com",
        password: "password12345",
    },
    {
        username: "Patrick",
        email: "patrick@gmail.com",
        password: "password12345",
    },
    {
        username: "Ben",
        email: "ben@gmail.com",
        password: "password12345",
    },
];

const seedUsers = () => await User.bulkCreate(userData);

module.exports = seedUsers;