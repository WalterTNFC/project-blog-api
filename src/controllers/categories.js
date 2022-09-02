const jwt = require('jsonwebtoken');
const express = require('express');
const { Category } = require('../database/models');

const router = express.Router();

router.post('/', async (req, res) => {
  const { authorization: token } = req.headers;
  try {
    const { name } = req.body;

    if (!token) {
      return res.status(401).json({ message: 'Token not found' });
    }

    if (!name) {
      return res.status(400).json({ message: '"name" is required' });
    }

    const { id } = await Category.create({ name });
    jwt.verify(token, process.env.JWT_SECRET);
    console.log(` ///////////////////////////// NOVOS ID E NAME ${id} e ${name}`);
    return res.status(201).json({ id, name });
  } catch (e) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
});

module.exports = router;