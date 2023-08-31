const { Thought, User, Reaction } = require('../models');

module.exports = {
    // get all thoughts
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // get single thought by id
    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId });

            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID' });
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err)
        }
    },
    // create a new thought
    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            const user = await User.findOneAndUpdate(
                { _id: req.body.userId },
                { $addToSet: { thoughts: thought._id } },
                { new: true }
            );

            if (!user) {
                return res
                    .status(404)
                    .json({ message: 'Thought created, but found no user with that ID' });
            }

            res.json('You created a thought! 🎉');
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    //update thought by id
    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { runValidators: true, new: true }
            );

            if (!thought) {
                return res.status(404).json({ message: 'No thought with this id!' });
            }

            res.json(thought);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    // delete thought by id
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndRemove({ _id: req.params.thoughtId });

            if (!thought) {
                return res.status(404).json({ message: 'No thought with this id!' });
            }

            const user = await User.findOneAndUpdate(
                { thoughts: req.params.thoughtId },
                { $pull: { thoughts: req.params.thoughtId } },
                { new: true }
            );


            res.json({ message: 'Thought successfully deleted!' });
        } catch (err) {
            res.status(500).json(err);
        }
    },
    /* async addFriend(req, res) {
        try {
          const video = await Video.findOneAndUpdate(
            { _id: req.params.videoId },
            { $addToSet: { responses: req.body } },
            { runValidators: true, new: true }
          );
    
          if (!video) {
            return res.status(404).json({ message: 'No video with this id!' });
          }
    
          res.json(video);
        } catch (err) {
          res.status(500).json(err);
        }
      },
      // Remove video response
      async removeFriend(req, res) {
        try {
          const video = await Video.findOneAndUpdate(
            { _id: req.params.videoId },
            { $pull: { reactions: { responseId: req.params.responseId } } },
            { runValidators: true, new: true }
          )
    
          if (!video) {
            return res.status(404).json({ message: 'No video with this id!' });
          }
    
          res.json(video);
        } catch (err) {
          res.status(500).json(err);
        }
      }, */
};
