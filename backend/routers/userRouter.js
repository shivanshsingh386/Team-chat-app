const express = require('express');
const router = express.Router();
const Model = require('../models/userModel');
router.post('/add', (req, res) => {
    console.log(req.body);
    new Model(req.body).save()
        .then((result) => {
            res.json(result);

        }).catch((err) => {
            res.json(err);
        });
});
router.get('/getall', (req, res) => {
    Model.find({})
        .then((result) => {

            res.json(result);
        }).catch((err) => {
            res.json(err);
        });
})
//:donates a url parameter
router.get('/getbyemail/:useremail', (req, res) => {
    Model.find({ email: req.params.useremail })
        .then((result) => {
            res.json(result);

        }).catch((err) => {
            res.json(err);

        });
})
router.get('/getbyname/:name', (req, res) => {
    Model.findOne({ name: req.params.name })
        .then((result) => {
            res.json(result);

        }).catch((err) => {
            res.status(500).json(err);

        });
})
router.get('/getbyid/:userid', (req, res) => {
    Model.findById(req.params.userid)
        .then((result) => {
            res.json(result);

        }).catch((err) => {
            res.status(500).json(err);


        });
})
router.delete('/delete/:userid', (req, res) => {
    Model.findByIdAndDelete(req.params.userid)
        .then((result) => {
            res.json(result);

        }).catch((err) => {
            res.status(500).json(err);

        });
});
router.post('/authenticate', (req, res) => {
    const formdata = req.body;
    Model.findOne(formdata)
        .then((result) => {
            if (result) res.json(result);
            else res.status(401).json({ status: 'error' });

        }).catch((err) => {
            res.status(500).json(err);

        });
});
router.put('/update/:id', (req, res) => {
    const formData = req.body;
    Model.findByIdAndUpdate(req.params.id, formData)
        .then((result) => {
            res.json(result);
        }).catch((err) => {
            console.log( err);
            res.status(500).json(err);
        });
})
module.exports = router;