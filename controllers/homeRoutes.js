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
      });


    } catch (err) {
        res.status(500).json(err)
    }
});

//get
router.get('/post/:id', async ( req, res) => {
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
     
        // res.status(200).json(posts);
        res.render('post', {
            ...posts
        });


    } catch (err) {
        res.status(500).json(err)
    }
});

// router.get('/dashboard', async (req, res) => {
//     try {
//         const dbUserData = await User.findByPk(req.session.user_id, {
//             attributes: { exclude: ['password'] },
//             include: [
//                 {
//                     model: Post,
//                 },
//             ],
//         });

//         const user = dbUserData.get({ plain: true });

//         res.render('dashboard', {
//             ...user,
          
//         });



//     } catch (err) {
//         res.status(500).json(err)
//     }
// });

router.get('/dashboard', async (req, res) => {
    try {
        const userData = await User.findAll({
            attributes: { exclude: ["password" ]},
            include: [
                {
                    model: Post
                },
            ],
        });
        
        const users = userData.map((user) => user.get({ plain: true }));


        res.render('dashboard', {
            ...users
        })

    } catch (err) {
        res.status(500).json(err)
    }
})








router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/post');
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