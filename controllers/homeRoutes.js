const router = require('express').Router();
const { User, Post } = require('../models');
const withAuth = require('../utils/auth');

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
          logged_in: req.session.logged_in,
      });


    } catch (err) {
        res.status(500).json(err)
    }
});

//get
router.get('/post/:id', async ( req, res) => {
    try {
        const dbPostData = await Post.findOne({
            where: {
                id: req.params.id,
            },
            attributes: ["id", "post_title", "post_content","date_created"],
            include: [
                {
                    model: User,
                    attributes: ["username"],
                },
            ],
        });

        const posts = dbPostData.get({ plain: true });
        console.log(posts)
     
        // res.status(200).json(posts);
        res.render('post', {
            posts,
            logged_in: req.session.logged_in 
        });


    } catch (err) {
        res.status(500).json(err)
    }
});



// router.get('/dashboard', async (req, res) => {
//     try {
//         const userData = await User.findAll({
//             attributes: { exclude: ["password" ]},
//             include: [
//                 {
//                     model: Post
//                 },
//             ],
//         });
        
//         const users = userData.map((user) => user.get({ plain: true }));


//         res.render('dashboard', {
//             ...users
//         })

//     } catch (err) {
//         res.status(500).json(err)
//     }
// });








router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }

    res.render('login');
})




//get request to users profile page
// router.get('/profile', async (req, res) => {
//     try {
//         const dbUserData = await User.findByPk



//     } catch (err) {
//         res.status(500).json(err)
//     }
// });








module.exports = router;