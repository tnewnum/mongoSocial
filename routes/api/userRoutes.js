const router = require('express').Router();
const {
  getUsers,//done
  getSingleUser,//done
  createUser,//done
  deleteUser,//done
  updateUser,//done
  newFriend,
  removeFriend
} = require('../../controllers/userController.js');

// /api/user
router.route('/').get(getUsers).post(createUser);

// /api/users/:id
router.route('/:id')
  .get(getSingleUser)
  .put(updateUser)
  .delete(deleteUser)
  .post(newFriend);

  router.route('/:id/friends/:friendId')
    .delete(removeFriend)

module.exports = router;
