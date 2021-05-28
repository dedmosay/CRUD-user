const { Router } = require('express');
const router = Router();
const User = require("../models/User");

router.get('/users', (req, res) => {
    User.find({})
        .then(user => {
            res.send(user)
        })
});

router.post('/users', (req, res) => {
    try {
        const { name, age, company } = req.body;
        console.log(name, age, company);
        User.create(req.body)
            .then(
                (user) => {
                    res.send(user);
                })
    } catch (e) {
        res.status(500).json({ message: "Что-то пошло не так, попробуйте снова " });
    }
});

router.put('/users/:id', (req, res) => {
    User.findByIdAndUpdate({ _id: req.params.id }, req.body)
        .then(
            () => {
                User.findOne({ _id: req.params.id })
                    .then(
                        (user) => {
                            res.send(user)
                        });
            });
});
router.delete('/users/:id', (req, res) => {
    User.deleteOne({ _id: req.params.id })
        .then(
            (user) => {
                res.send(user);
            }
        )
});

module.exports = router;