const jwt = require('jsonwebtoken');
const express = require('express');
const { User } = require('../database/models');
const { userValidation } = require('../validation/newUserValidation'); 
require('dotenv').config();

const router = express.Router();
router.post('/', async (req, res) => {
  const { displayName, email, password, image } = req.body; 
  const { error: joiError } = userValidation.validate({ displayName, email, password });
  console.log(`Aquiiiiiiiiiiiiiiiiiiiiiiiiii ${email}`);
  if (joiError) {
    return res.status(400).json({ message: joiError.details[0].message });
  }
  
  const user = await User.findOne({ where: { email } });
  if (user) {
    return res.status(409).json({ message: 'User already registered' });
  }

  await User.create({ displayName, email, password, image });

  const token = jwt.sign({ displayName, email, image }, process.env.JWT_SECRET);
  return res.status(201).json({ token });
});

module.exports = router;
