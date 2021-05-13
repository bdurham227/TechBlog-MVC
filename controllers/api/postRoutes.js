const router = require('express').Router();
const { Post, User, Comment } = require('../../models');


router.get('/', async (req, res) => {
    try {
        
        const postData = await Post.findAll({
            attributes: ["id", "post_title", "post_content", "date_created"],
            include: [
                {
                    model: User,
                    attributes: ["username"],
                },
            ],
        });
        const posts = postData.map((post) => post.get({ plain: true }));
        res.status(200).json(posts);



    } catch (err) {
        res.status(500).json(err)
    }
});

router.get('/:id', async (req, res) => {
    try {
        const postData = await Post.findOne({
            where: {
                id: req.params.id,
            },
            attributes: ["id", "post_title", "post_content", "date_created"],
            include: [
                {
                    model: User,
                    attributes: ["username"],
                },
            ],
        });

        if (!postData) {
            res.status(400).json({ message: `No id of ${req.params.id} found` });
            return;
        }
        res.status(200).json(postData);


    } catch (err) {
        res.status(500).json(err)
    }
});

router.post('/', async (req, res) => {
    try {

        const postData = await Post.create({
            post_title: req.body.post_title,
            post_content: req.body.post_content,
            // user_id: req.session.user_id,
        });

        res.status(200).json(postData);



    } catch (err) {
        res.status(500).json(err)
    }
})









// router.post('/', async (req, res) => {
//     try {
//         const newPost = await Post.create({
//             ...req.body,
//             user_id: req.session.user_id,

//         });
//         console.log(newPost);
//         res.status(200).json(newPost);
//         console.log(newPost);
//     } catch (err) {
//         res.status(500).json(err)
//     }
// })






module.exports = router;