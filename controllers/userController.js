const { User, Thought } = require("../models");

const userController = {
  // GET all users
  getUsers(req, res) {
    User.find()
      .then(async (users) => {
        return res.json(users);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // GET a single user by its _id and populated thought and friend data
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select("-__v")
      .lean()
      .then(async (users) =>
        !users
          ? res.status(404).json({ message: "No user with that ID" })
          : res.json({ users })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // POST a new user:
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  // PUT to update a user by its _id
  updateUser(req, res) {
    User.findOneAndUpdate(
      {
        _id: req.params.userId,
      },
      body,
      {
        new: true,
        runValidators: true,
      }
    )
      .select("-__v")
      .then(async (users) =>
        !users
          ? res.status(404).json({ message: "No user with that ID" })
          : res.json({ users })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  // // DELETE to remove user by its _id
  deleteUser(req, res) {
    User.findOneAndDelete({
      _id: req.params.userId,
    })
      .select("-__v")
      .then(async (users) =>
        !users
          ? res.status(404).json({ message: "No user with that ID" })
          : res.json({ users })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // POST to add a new friend to a user's friend list
  addFriend(req, res) {
    console.log("Adding friend!");
    console.log(req.body);
    User.findOneAndUpdate(
      {
        _id: req.params.userId,
      },
      {
        $addToSet: { friends: { friendsId: req.params.friendId } },
      },
      {
        new: true,
        runValidators: true,
      }
    )
      .then(async (users) =>
        !users
          ? res.status(404).json({ message: "No user with that ID" })
          : res.json({ users })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // DELETE to remove a friend from a user's friend list
  removeFriend(req, res) {
    User.findOneAndUpdate(
      {
        _id: req.params.userId,
      },
      {
        $pull: { friends: { friendsId: req.params.friendId } },
      },
      {
        new: true,
        runValidators: true,
      }
    )
      .then(async (users) =>
        !users
          ? res.status(404).json({ message: "No user with that ID" })
          : res.json({ users })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  }
};

module.exports = userController;
