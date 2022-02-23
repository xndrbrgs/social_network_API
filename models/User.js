const { Schema, model } = require('mongoose');

const userSchema = new.Schema(
    {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: Boolean,
      required: true,
      unique: true,
    //   match: Check regex for validation in Mongoose docs [Must be an email address]
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought',
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  });

userSchema.virtuals('friendCount').get(function() {
  return this.friends.length;
})


const User = model('User', userSchema);

module.exports = User;