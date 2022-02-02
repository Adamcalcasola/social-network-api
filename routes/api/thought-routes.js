const router = require('express').Router();
const { getThoughts, getThoughtById, addThought, updateThought, removeThought, addReaction, removeReaction } = require('../../controllers/thought-controller');

router.route('/:userId').get(getThoughts).post(addThought);

router.route('/:thoughtId').get(getThoughtById).put(updateThought).put(addReaction).delete(removeThought);

router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

module.exports = router;