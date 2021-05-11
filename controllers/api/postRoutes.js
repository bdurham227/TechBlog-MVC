const router = require('express').Router();
const { Post, User, Comment } = require('../../models');









router.post('/', async (req, res) => {
    try {
        const newPost = await Post.create({
            ...req.body,
            user_id: req.session.user_id,

        });
        console.log(newPost);
        res.status(200).json(newPost);
        console.log(newPost);
    } catch (err) {
        res.status(500).json(err)
    }
})






module.exports = router;