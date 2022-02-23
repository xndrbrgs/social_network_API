const connection = require("../config/connection");
const { User, Thought } = require("../models");
const { getRandomPerson, getRandomEmail } = require("./data");

connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("connected");

  // Drop existing thoughts
  await Thought.deleteMany({});

  // Drop existing users
  await User.deleteMany({});

  // Create empty array to hold the students
  const users = [];

  // Get some random emails using a helper function that we imported from ./data
  const emails = getRandomEmail(10);

  const username = getRandomPerson(10);

  users.push({
    username,
    emails,
  });

  // Add students to the collection and await the results
  await User.collection.insertMany(users);

  // Add courses to the collection and await the results
  await Thought.collection.insertOne({
    thoughtText: "Wow this is kinda sick!",
    createdAt: Date.now,
  });

  // Log out the seed data to indicate what should appear in the database
  console.table(users);
  console.table(emails);
  console.info("Seeding complete! 🌱");
  process.exit(0);
});
