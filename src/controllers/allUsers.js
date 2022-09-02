const jwt = require('jsonwebtoken');
const express = require('express');
const { User } = require('../database/models');
require('dotenv').config();

const router = express.Router();

router.get('/', async (req, res) => {
  const { authorization: token } = req.headers;
  try {
    if (!token) {
        return res.status(401).json({ message: 'Token not found' });
    }

    const user = await User.findAll({ attributes: { exclude: ['password'] } });
    console.log(user);
  
    jwt.verify(token, process.env.JWT_SECRET);
    return res.status(200).json(user);  
  } catch (error) {
      return res.status(401).json({ message: 'Expired or invalid token' });
  }
});

module.exports = router;