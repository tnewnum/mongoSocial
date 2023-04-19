const { Thought, User } = require('../models');


module.exports = {
    //get all users
    async getUsers(req, res) {
            try {
            const users = await User.find()
            res.json(users)        
        } catch (error) {
            res.status(500).json(err);
        }          
    },

    //get a single user
    async getSingleUser(req, res) {
        try {
            const user = await User.findById(req.params.id).populate('friends', 'userName');
            if (!user) {
                return res.status(404).json({ message: 'No user found with that ID' });
            }
            const friendNames = user.friends.map((friend) => friend.userName);
            res.json({ userName: user.userName, email: user.email, friends: friendNames });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    //create a user
    async createUser(req, res) {
        try {
            const newUser = await User.create(req.body)
            res.json(`New User has been created`)

        } catch (err) {
            res.status(500).json(err)
        }
      
    },

    //Delete a user
    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndRemove({_id: req.params.id})
            if (!user) return res.status(404).json({ message: 'No user with that ID' });
            res.json('User has been deleted')

        } catch (err) {
           res.status(500).json(err)
        }
      
    },

    //Update a user
    async updateUser(req, res) {
        try {
            const updatedUser = await User.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true, runValidators: true }
            );
            if (!updatedUser) return res.status(404).json({ message: 'No user with that ID' });
            res.json(updatedUser)

        } catch (err) {
            res.status(500).json(err)
        }
       
    },
    async newFriend(req, res) {
        try {
          const user = await User.findById(req.params.id);
          if (!user) return res.status(404).json({ message: 'No user with that ID' });
      
          const friend = await User.findOne({ userName: req.body.userName });
          if (!friend) return res.status(404).json({ message: 'No friend found with that username' });
      
          if (user.friends.some((friendId) => friendId.equals(friend._id))) {
            return res.status(400).json({ message: 'They are already your friend' });
          }
      
          const result = await User.findByIdAndUpdate(user._id, {
            $push: { friends: friend }
          });
          res.json(result);
        } catch (err) {
          res.status(500).json(err);
        }
      },
      
    async removeFriend(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.id });
            if (!user) return res.status(404).json({ message: 'No user with that ID' });

            const friend = await User.findOne({ _id: req.params.friendId });
            if (!friend) return res.status(404).json({ message: 'No friend with that ID' });

            if (user.friends.some((friendId) => friendId.equals(friend._id))) {
                const reaction = await User.findOneAndUpdate({ _id: req.params.id }, { $pull: { friends: friend._id } }, { new: true })
                return res.json(reaction)
            }
            res.status(400).json({ message: "This friend was not on your friend's list" })
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
}