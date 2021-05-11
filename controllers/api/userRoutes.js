const router = require('express').Router();
const { User, Post, Comment } = require('../../models');


//get all user data
router.get('/', async (req, res) => {
    try {
        const userData = await User.findAll({
            attributes: { exclude: ["password"]}
        });

        res.status(200).json(userData);


    } catch (err) {
        res.status(500).json(err)
    }
});

//get user by id
router.get('/:id', async (req, res) => {
    try {
        const userData = await User.findOne({
            attributes: { exclude: ["password"]},
            where: {
                id: req.params.id,
            },
            include: [
                {
                    model: Post,
                    attributes: ["id", "post_title", "post_content", "date_created"],
                },
            ],
        });

        if(!userData) {
            res.status(404).json({ message: `No user with the ID ${req.params.id} found` });
            return;
        }
        res.status(200).json(userData);


    } catch (err) {
        res.status(500).json(err)
    }
})








router.post('/', async (req, res) => {
    try {
        const dbUserData = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        })

        req.session.save(() => {
            req.session.user_id = dbUserData.id;
            req.session.email = dbUserData.email;
            req.session.logged_in = true;

            res.status(200).json(dbUserData);
        })
    } catch (err) {
        res.status(500).json(err)
    }
});

router.post('/login', async (req, res) => {
    try {
        const dbUserData = await User.findOne({
            where: {
                email: req.body.email,
            },
        });

        if(!dbUserData) {
            res
            .status(400)
            .json({ message: 'Incorrect Email or Password, please try again' });
            return;
        }

        const validPassword = await dbUserData.checkPassword(req.body.password);

        if(!validPassword) {
            res
            .status(400)
            .json({ message: 'Incorrect Email or Password, please try again' });
            return;
        }

        req.session.save(() => {
            req.session.user_id = dbUserData.id;
            req.session.email = dbUserData.email;
            req.session.logged_in = true;

            res.json({ user: dbUserData, message: 'You are now logged in' });
        })

    } catch (err) {
        res.status(500).json(err)
    }
});

router.post('/logout', (req, res) => {
   if (req.session.logged_in) {
       req.session.destroy(() => {
           res.status(204).end();
       });
   } else {
       res.status(404).end();
   }
})






module.exports = router;