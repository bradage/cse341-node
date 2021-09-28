//TA02 PLACEHOLDER
// Remember, you can make more of these placeholders yourself!
const express = require('express');
const router = express.Router();

const users = ["User1", "User2", "User3"];

let addError = false;
let removeError = false;

router.get('/', (req, res, next) => {
  res.render('pages/ta02', {
    title: 'Team Activity 02',
    path: '/ta02', // For pug, EJS
    activeTA03: true, // For HBS
    contentCSS: true, // For HBS
    users: users
  });
});

router.post("/addUser", (req, res, next) => {
  if (users.includes(req.body.addUser)) {
    addError = true;
  } else {
    users.push(req.body.addUser);

  }

  res.render('pages/ta02', {
    title: 'Team Activity 02',
    path: '/ta02', // For pug, EJS
    //activeTA03: true, // For HBS
    //contentCSS: true, // For HBS
    users: users,
    addError: addError,
    removeError: false
  });
});

router.post("/removeUser", (req, res, next) => {
  const index = users.indexOf(req.body.removeUser);
  let removeError = false;
  if (index > -1) {
    users.splice(index, 1);
  } else {
    removeError = true;
  }
  res.render('pages/ta02', {
    title: 'Team Activity 02',
    path: '/ta02', // For pug, EJS
    //activeTA03: true, // For HBS
    //contentCSS: true, // For HBS
    users: users,
    addError: false,
    removeError: removeError
  });
});

module.exports = router;