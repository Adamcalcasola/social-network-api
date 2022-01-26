const router = require('express').Router();
const { getThoughts, getThoughtById, addThought, updateThought, removeThought, addReaction, removeReaction } = require('../../controllers/thought-controller');

router.route('/').get(getThoughts).post(addThought);

router.route('/:thoughtId').get(getThoughtById).put(updateThought);

router.route('/:thoughtId').put(addReaction).delete(removeThought);

router.route('/:thoughtId/:reactionId').delete(removeReaction);

module.exports = router;