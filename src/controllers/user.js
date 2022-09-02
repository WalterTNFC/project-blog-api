const jwt = require('jsonwebtoken');
const express = require('express');
const { User } = require('../database/models');
const { userValidation } = require('../validation/newUserValidation'); 
require('dotenv').config();

const router = express.Router();
router.post('/', async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body; 
    const user = await User.findOne({ where: { email } });
    const { error: joiError } = userValidation.validate({ displayName, email, password, image });
    console.log(`Aquiiiiiiiiiiiiiiiiiiiiiiiiii ${email}`);
    if (joiError) {
      return res.status(400).json({ message: joiError.details[0].message });
    }

    if (user) {
      return res.status(409).json({ message: 'User already registered' });
    }

    await User.create({ displayName, email, password, image });

    const token = jwt.sign({ email }, process.env.JWT_SECRET);
    return res.status(201).json({ token });
  } catch (e) {
      res.status(500).json({ message: 'Algo deu errado' });
  } 
});

module.exports = router;