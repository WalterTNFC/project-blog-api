const jwt = require('jsonwebtoken');
const express = require('express');
const { User } = require('../database/models');
require('dotenv').config();

const router = express.Router();

router.delete('/', async (req, res) => {
  const { authorization: token } = req.headers;
  try {
    if (!token) {
        return res.status(401).json({ message: 'Token not found' });
    }
  
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    
    await User.destroy({ where: { id } });
    
    return res.status(204).end();
  } catch (error) {
      return res.status(401).json({ message: 'Expired or invalid token' });
  }
});

module.exports = router;