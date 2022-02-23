const { Thought, User } = require("../models");

const thoughtController = {
  // GET to get all thoughts

  getThoughts(req, res) {
    Thought.find()
      .then(async (thoughts) => {
        return res.json(thoughts);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  // GET to get a single thought by its _id

  getSingleThought(req, res) {
    Thought.findOne({
      _id: req.params.thoughtId,
    })
      .select("-__v")
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with that ID" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  // POST to create a new thought (don't forget to push the created thought's _id
  // to the associated thought's thoughts array field)

  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        res.json(thought);
      })
      .catch((err) => res.status(500).json(err));
  },

  // PUT to update a thought by its _id

  updateThought(req, res) {
    Thought.findOneAndUpdate(
      {
        _id: req.params.thoughtId,
      },
      body,
      {
        new: true,
        runValidators: true,
      }
    )
      .select("-__v")
      .then(async (thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with that ID" })
          : res.json({ thought })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  // DELETE to remove a thought by its _id

  deleteThought(req, res) {
    Thought.findOneAndDelete({
      _id: req.params.thoughtId,
    })
      .select("-__v")
      .then(async (thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with that ID" })
          : res.json({ thought })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  // POST to create a reaction stored in a single thought's reactions array field

  addReaction(req, res) {
    console.log("Adding reaction!");
    console.log(req.body);
    thought.findOneAndUpdate(
      {
        _id: req.params.thoughtId,
      },
      {
        $addToSet: { reactions: {reactionId: req.params.reactionId} },
      },
      {
        new: true,
        runValidators: true,
      }
    )
      .then(async (thought) =>
        !thought
          ? res.status(404).json({ message: "No reaction with that ID" })
          : res.json({ thought })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  // DELETE to pull and remove a reaction by the reaction's reactionId value

  removeReaction(req, res) {
    Thought.findOneAndUpdate(
      {
        _id: req.params.thoughtId,
      },
      {
        $pull: { reactions: {reactionId: req.params.reactionId} },
      },
      {
        new: true,
        runValidators: true,
      }
    )
      .then(async (thought) =>
        !thought
          ? res.status(404).json({ message: "No reaction with that ID" })
          : res.json({ thought })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
};

module.exports = thoughtController;
