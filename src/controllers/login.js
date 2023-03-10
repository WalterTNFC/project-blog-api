const jwt = require('jsonwebtoken');
const express = require('express');
const { User } = require('../database/models');
require('dotenv').config();

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email, password } });
    console.log(user);
    if (!email || !password) {
      return res.status(400).json({ message: 'Some required fields are missing' });
    }

    if (!user) {
      return res.status(400).json({ message: 'Invalid fields' });
    }

    const token = jwt.sign({ id: user.id, email }, process.env.JWT_SECRET);
    console.log(`Aquiii ${process.env.JWT_SECRET} e token igual a ${token}`);
    return res.status(200).json({ token });
  } catch (e) {
      console.log(e.message);
      res.status(500).json({ message: 'Algo deu errado' });
  }  
});

module.exports = router;