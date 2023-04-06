const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateUser,
  deleteUser,
} = require('../../controllers/userController.js');

// /api/thoughts
router.route('/').get(getThoughts).post(createThought);

// /api/courses/:courseId
router
  .route('/:userId')
  .get(getSingleThought)
  .put(updateUser)
  .delete(deleteUser);

module.exports = router;
