const { User } = require('../models');

const userController = {
    getAllUsers(req, res) {
        User.find({})
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .populate({
                path: 'friends',
                select: '-__v'
            })
            .select('-__v')
            .sort({ _id: -1 })
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    getUserById({ params }, res) {
        User.findOne({ _id: params.userId })
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .populate({
                path: 'friends',
                select: '-__v'
            })
            .select('-__v')
            .then(dbUserData => {
                if (!dbUserData) {
                    return res.status(404).json({ message: 'No user found with this id!' });
                }
                res.json(dbUserData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            })
    },
    createUser({ body }, res) {
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.status(400).json(err))
    },
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.userId }, body, { new: true, runValidators: true })
            .then(dbUserData => {
                if (!dbUserData) {
                    return res.status(404).json({ message: 'No user found with this id!' });
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    },
    removeUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
            .then(dbUserData => {
                if (!dbUserData) {
                    return res.status(404).json({ message: 'No user found with this id!' });
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    },
    addFriend({ params, body }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $push: { friends: body } },
            { new: true }
        )
        .then(dbUserData => {
            if (!dbUserData) {
                return res.status(404).json({ message: 'No user found with this id!' });
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },
    removeFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $pull: { friends: { friendId: params.friendId } } },
            { new: true }
        )
        .then(dbUserData => {
            if (!dbUserData) {
                return res.status(404).json({ message: 'No user found with this id!'});
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },
};

module.exports = userController;