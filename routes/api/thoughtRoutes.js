const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  postReaction,
  deleteReaction
} = require('../../controllers/thoughtController.js');

// /api/thoughts
router.route('/')
  .get(getThoughts)
  .post(createThought);

// /api/thoughts/:id
router.route('/:id')
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought)
  .post(postReaction);

  router.route('/:id/reactions/:reactionId')
    .delete(deleteReaction)

module.exports = router;
