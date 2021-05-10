const router = require('express').Router();

const { User, Post } = require('../models');

//get all users and their posts
router.get('/', async (req, res) => {
    try {
      const dbPostData = await Post.findAll({
          
          include: [
              {
                  model: User,
                  attributes: ["username"],
              },
          ],
      });
      //serialize data so the template can read it
      const posts = dbPostData.map((post) => post.get({ plain: true }));

    //   res.status(200).json(posts);
    //pass serialized data into template
      res.render('homepage', {
          posts,
      });


    } catch (err) {
        res.status(500).json(err)
    }
});

//get
router.get('/posts/:id', async ( req, res) => {
    try {
        const dbPostData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ["username"],
                },
            ],
        });

        const posts = dbPostData.get({ plain: true });
        //in the future will probably include/join comments table too
        //res.render(dashboard)
        res.status(200).json(posts);


    } catch (err) {
        res.status(500).json(err)
    }
});




//get request to users profile page
// router.get('/profile', async (req, res) => {
//     try {
//         const dbUserData = await User.findByPk



//     } catch (err) {
//         res.status(500).json(err)
//     }
// });








module.exports = router;