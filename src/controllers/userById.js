const jwt = require('jsonwebtoken');
const express = require('express');
const { User } = require('../database/models');
require('dotenv').config();

const router = express.Router();

router.get('/:id', async (req, res) => {
  const { authorization: token } = req.headers;
  try {
    const { id } = req.params;

    if (!token) {
      return res.status(401).json({ message: 'Token not found' });
    }

    const user = await User.findByPk(id, { attributes: { exclude: ['password'] } });

    if (!user) {
      return res.status(404).json({ message: 'User does not exist' });
    }

    console.log(user);
  
    jwt.verify(token, process.env.JWT_SECRET);
    return res.status(200).json(user);  
  } catch (error) {
      return res.status(401).json({ message: 'Expired or invalid token' });
  }
});

module.exports = router;