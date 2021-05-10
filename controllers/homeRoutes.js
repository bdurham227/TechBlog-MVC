const router = require('express').Router();

const { User, Post } = require('../models');


router.get('/', async (req, res) => {
    try {
      const dbUserData = await User.findAll({
          
          include: [
              {
                  model: Post,
                  attributes: ["post_title"],
              },
          ],
      });

      const users = dbUserData.map((user) => user.get({ plain: true }));

      res.status(200).json(users);



    } catch (err) {
        res.status(500).json(err)
    }
});






module.exports = router;