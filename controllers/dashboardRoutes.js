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
})

router.get('/:id', async(req, res) => {
    try {
        const postData = await Post.findOne({
            where: {
                id: req.params.id,
            },
            include: [
                {
                    model: User,
                    attributes: ["username"],
                }
            ]
        });

        const posts = postData.get({ plain: true });
        res.render('post', {
            posts,
        });

    } catch (err) {
        res.status(500).json(err)
    }
});

router.post('/', async (req, res) => {
    try {

        const postData = await Post.create(req.body, {
            post_title: req.body.post_title,
            post_content: req.body.post_content,
            date_created: req.body.date_created,
        });
        res.status(200).json(postData);



    } catch (err) {
        res.status(500).json(err)
    }
})













module.exports = router;