const { ObjectId } = require('mongoose').Types;
const { Thought, User } = require('../models');

// Aggregate function to get the number of users overall
const headCount = async () =>
  User.aggregate()
    .count('userCount')
    .then((numberOfUsers) => numberOfUsers);


module.exports = {
    //get all users
    getUsers(req, res) {
        User.find()
            .then(async (users) => {
                const userObj = {
                    users,
                    headCount: await headCount()
                };
                return res.json(userObj)
            })
            .catch((err) => {
                console.log(err)
                return res.status(500).json(err);
            });
    },
    //get a single user
    getSingleUser(req, res) {
        User.findOne({_id: req.params.userId})
        //By excluding this field, the code is making the response that gets sent back to the client cleaner and more focused on the actual data about the student, without including any unnecessary or technical fields.
        .select('-__v')
        .then(async (user) => 
        !user
            ? res.status(404).json({message: `No user with ${req.params.userID} found`})
            : res.json({user})
            )
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
        });    
    },
    //create a user
    createUser(req, res) {
        User.create(req.body)
        .then((user) => res.json(user))
        .catch((err) => res.status(500).json(err));
    },
    //Delete a user
    deleteUser(req, res) {
        User.findOneAndRemove({ _id: req.params.userId })
          .then((user) =>
            !user
              ? res.status(404).json({ message: 'No such user exists' })
              :  res.json({ message: 'User successfully deleted' })
          )
          .catch((err) => res.status(500).json(err));
    },
    updateUser(req, res) {
        User.updateOne(req.body)
        .then((user) => 
        !user
              ? res.status(404).json({ message: 'No such user exists' })
              :  res.json({ message: 'User successfully updated' })
         )    
        .catch((err) => res.status(500).json(err));
    },
}