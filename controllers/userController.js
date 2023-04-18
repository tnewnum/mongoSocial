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
        const user = await User.findOne({_id: req.params.userId})
        if (!user) return res.status(404).json({message: 'No user with that ID'})
        res.json(user)

        } catch (err) {
            res.status(500).json(err);
        } 
    },

    //create a user
    async createUser(req, res) {
        try {
            const newUser = await User.create(req.body)
            res.json(`${newUser} has been created`)

        } catch (err) {
            res.status(500).json(err)
        }
      
    },

    //Delete a user
    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndRemove({_id: req.params.id})
            if (!user) return res.status(404).json({ message: 'No user with that ID' });
            res.json(`${user} has been deleted`)

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
}