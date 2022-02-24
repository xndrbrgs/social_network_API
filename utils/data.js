const usernames = [
  "Xander",
  "Courtney",
  "Gillian",
  "Clark",
  "Jared",
  "Grace",
  "Kelsey",
  "Tamar",
  "Alex",
  "Mark",
  "John",
  "Example"
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


const getRandomPerson = (i) => {
  return usernames[i];
};

// Function to generate random emails that we can add to student object.
const getRandomEmail = (i) => {
  return emails[i];
};

// Export the functions for use in seed.js
module.exports = { getRandomPerson, getRandomEmail };
