const { User } = require("../models");

const userController = {
  // GET all users
  getUsers({params}, res) {
    User.find({})
      .populate({ path: "thoughts", select: "-__v" })
      .populate({ path: "friends", select: "-__v" })
      .then(async (users) => {
        return res.json(users);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // GET a single user by its _id and populated thought and friend data
  getSingleUser({params}, res) {
    User.findOne({ _id: params.userId })
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
  createUser({ body }, res) {
    User.create(body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  
  // PUT to update a user by its _id
  updateUser({ params, body }, res) {
    User.findOneAndUpdate(
      {
        _id: params.userId,
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

  // DELETE to remove user by its _id
  deleteUser({ params }, res) {
    User.findOneAndDelete({
      _id: params.userId,
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
  addFriend({ params }, res) {
    console.log("Adding friend!");
    console.log(params);
    User.findOneAndUpdate(
      {
        _id: params.userId,
      },
      {
        $addToSet: { friends:  params.friendId },
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
  removeFriend({ params }, res) {
    User.findOneAndUpdate(
      {
        _id: params.userId,
      },
      {
        $pull: { friends: params.friendId },
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
};

module.exports = userController;
