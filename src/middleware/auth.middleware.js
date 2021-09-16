const jwt = require('jsonwebtoken');
// Generacion de token
const payload = {
    iss: process.env.APIKEY,
    exp: ((new Date()).getTime() + 5000)
};

const token = jwt.sign(payload, process.env.APISECRET);

module.exports = token;