const express = require('express');
const { BlogPost, User, Category } = require('../database/models');
require('dotenv').config();

const router = express.Router();

router.get('/', async (req, res) => {
    const blogPosts = await BlogPost.findAll({
      include: [
          {
              model: User,
              as: 'user',
              attributes: { exclude: ['password'] },
          },
          {
              model: Category,
              as: 'categories',
              through: { attributes: [] },
          },
      ],
  });
    return res.status(200).json(blogPosts);  
});

module.exports = router;