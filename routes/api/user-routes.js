const router = require('express').Router();
const { getAllUsers, getUserById, createUser, updateUser, removeUser, addFriend, removeFriend } = require('../../controllers/user-controller');

router.route('/').get(getAllUsers).post(createUser);

router.route('/:userId').get(getUserById).put(updateUser).delete(removeUser).put(addFriend);

router.route('/:userId/friends/:friendsId').delete(removeFriend);

module.exports = router;