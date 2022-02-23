const usernames = [
  "Xander",
  "Jared",
  "Courtney",
  "Gillian",
  "Clark",
  "Jared",
  "Grace",
  "Kelsey",
  "Tamar",
  "Alex",
  "Mark",
  "Tamar",
  "Chamaco",
  "Genjibre",
];

const emails = [
  "ilikered@gmail.com",
  "chrwin@yahoo.com",
  "hamilton@aol.com",
  "birddog@aol.com",
  "bartak@yahoo.com",
  "jmcnamara@mac.com",
  "hedwig@yahoo.com",
  "louise@hotmail.com",
  "falcao@msn.com",
  "bmcmahon@icloud.com",
  "kannan@sbcglobal.com",
  "okroeger@verizon.com",
];

// Get a random item given an array
const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Gets a random name
// const getRandomPerson = () => `${getRandom(usernames)}`;

const getRandomPerson = (int) => {
  const results = [];
  for (let i = 0; i < int; i++) {
    results.push({
      person: getRandom(usernames),
    });
  }
  return results;
};

// Function to generate random assignments that we can add to student object.
const getRandomEmail = (int) => {
  const results = [];
  for (let i = 0; i < int; i++) {
    results.push({
      email: getRandom(emails),
    });
  }
  return results;
};

// Export the functions for use in seed.js
module.exports = { getRandomPerson, getRandomEmail };
