const express = require('express');
const router = express.Router();
const passport = require('passport');

const Notification = require('../../models/Notification');

router.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {
    Notification.find({userID: req.user.id})
        .then(notification => {
            res.json({notification: notification});
        })
        .catch(err =>
            res.status(404).json({error: "Error in get api/notification/. " + err})
        );
});

router.delete('/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
    Notification.findById(req.params.id)
        .then(notification => {
            if(!notification){
                return res.status(404).json({error: 'This notification is not found'});
            }
            notification.remove().then(() => res.json({success: true}));
        })
        .catch(err =>
            res.status(404).json({error: "Error in get api/notification/. " + err})
        );
});

module.exports = router;