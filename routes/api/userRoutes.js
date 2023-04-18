const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  deleteUser,
  updateUser,
  newFriend,
  removeFriend
} = require('../../controllers/userController.js');

// /api/user
router.route('/').get(getUsers).post(createUser);

// /api/users/:id
router.route('/:id')
  .get(getSingleUser)
  .put(updateUser)
  .delete(deleteUser);

  router.route('/:id/friends/:friendId')
    .post(newFriend)
    .delete(removeFriend)

module.exports = router;
