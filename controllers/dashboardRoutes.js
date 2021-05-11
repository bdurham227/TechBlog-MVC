const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');


router.get('/', async (req, res) => {
    try {
        const dbPostData = await Post.findAll({
            // where: {
            //     user_id: req.session.user_id,
            // },
            attributes: ["id", "post_title", "post_content", "date_created"],
            include: [
                {
                    model: User,
                    attributes: { exclude: ['password'] },
                },
            ],
        });

        // const user = dbPostData.get({ plain: true });
        const posts = dbPostData.map((post) => post.get({ plain: true }));
        console.log(...posts);


        res.render('dashboard', {
            ...posts,
        //   logged_in: true,
        });



    } catch (err) {
        res.status(500).json(err)
    }
});













module.exports = router;