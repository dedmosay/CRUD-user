const { Router } = require('express');
const router = Router();
const User = require("../models/User");

router.get('/users', (req, res) => {

        try {
            User.find({})
            .then((user) => {
                res.send(user)
            })
            
        } catch (e) {
            res.status(500).json( "Проверьте подключение ",e.message );
        }
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
        res.status(500).json( "Что-то пошло не так, попробуйте снова ",e.message );
    }
});
 

router.put('/users/:id', (req, res) => {
    User.findByIdAndUpdate({ _id: req.params.id }, req.body)
        .then(
            () => {
                const {name, age, company} = req.body

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