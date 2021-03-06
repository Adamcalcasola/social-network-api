const router = require('express').Router();
const { getThoughts, getThoughtById, addThought, updateThought, removeThought, addReaction, removeReaction } = require('../../controllers/thought-controller');

// Routes for Thought Model interactions
router.route('/').get(getThoughts);

router.route('/:userId').post(addThought);

router.route('/:thoughtId').get(getThoughtById).put(updateThought).delete(removeThought);

router.route('/:thoughtId/reactions').post(addReaction);

router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

module.exports = router;