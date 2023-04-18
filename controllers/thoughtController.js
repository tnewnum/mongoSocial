const { ObjectId } = require('mongoose').Types;
const { Thought, User } = require('../models');

// Aggregate function to get the number of thoughts overall
const thoughtCount = async () =>
  Thought.aggregate()
    .count('thoughtCount')
    .then((numberOfThoughts) => numberOfThoughts);


module.exports = {
    //get all thoughts
     // get all thoughts
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find({});
      const thoughtObj = {
        thoughts,
        thoughtCount: await thoughtCount(),
      };
      return res.json(thoughtObj);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
    //get a single thought
    getSingleThought(req, res) {
        Thought.findOne({_id: req.params.thoughtId})
        //By excluding this field, the code is making the response that gets sent back to the client cleaner and more focused on the actual data about the student, without including any unnecessary or technical fields.
        .select('-__v')
        .then(async (thought) => 
        !thought
            ? res.status(404).json({message: `No thought with ID ${req.params.thoughtId} found`})
            : res.json({thought})
            )
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
        });    
    },
    //create a thought
    createThought(req, res) {
        // Validate the request body
        const { thoughtText, userName, reactions } = req.body;
        const errors = {};
      
        if (!thoughtText) {
          errors.thoughtText = 'Thought text is required';
        }
      
        if (!userName) {
          errors.userName = 'User name is required';
        }
      
        if (reactions && Array.isArray(reactions)) {
          reactions.forEach((reaction, index) => {
            if (!reaction.reactionBody) {
              errors[`reactions.${index}.reactionBody`] = 'Reaction body is required';
            }
      
            if (!reaction.userName) {
              errors[`reactions.${index}.userName`] = 'User name is required';
            }
          });
        }
      
        // If there are validation errors, return a 400 status code with the error object
        if (Object.keys(errors).length > 0) {
          return res.status(400).json({ errors });
        }
      
        // Create the thought
        Thought.create(req.body)
          .then((thought) => res.json(thought))
          .catch((err) => res.status(500).json(err));
      },
      
    //Delete a thought
    deleteThought(req, res) {
        Thought.findOneAndRemove({ _id: req.params.thoughtId })
          .then((thought) =>
            !thought
              ? res.status(404).json({ message: 'No such thought exists' })
              :  res.json({ message: 'Thought successfully deleted' })
          )
          .catch((err) => res.status(500).json(err));
    },
    //Update a thought
    updateThought(req, res) {
        Thought.updateOne(req.body)
        .then((thought) => 
        !thought
              ? res.status(404).json({ message: 'No such thought exists' })
              :  res.json({ message: 'Thought successfully updated' })
         )    
        .catch((err) => res.status(500).json(err));
    },
}