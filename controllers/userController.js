const { User, Thought } = require('../models');

const userController = {
    // GET all users
    getUsers(req, res) {
        
    }
    // GET a single user by its _id and populated thought and friend data
    getSingleUser()
    // POST a new user:
    createUser()
    // PUT to update a user by its _id
    updateUser()
    // DELETE to remove user by its _id
    deleteUser()
    // POST to add a new friend to a user's friend list
    addFriend()
    // DELETE to remove a friend from a user's friend list
    removeFriend()
}

module.exports = userController;