const router = require('express').Router();
let User = require('../models/user.model');

let counts = {
  addCount: 0,
  updateCount: 0
};

// Middleware to increment add count
router.use('/add', (req, res, next) => {
  counts.addCount++;
  next();
});

// Middleware to increment update count
router.use('/update', (req, res, next) => {
  counts.updateCount++;
  next();
});

// Endpoint to get counts
router.get('/counts', (req, res) => {
  res.json(counts);
});


router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post(async (req, res) => {
  const { username, name, address, phoneNumber } = req.body;

  const newUser = new User({ username, name, address, phoneNumber });
 
  await newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));

 
  // Save counts to the database (assuming you have a Counts model)

});
router.route('/getuserid/:id').get(async (req, res) => {
  try {
    const { id } = req.params;
    console.log('id check from backed')
    const singlestud = await User.findById({ _id: id });
    res.status(201).json(singlestud);
  } catch (err) {
    res.status(422).json(err);
  }
})

router.route('/update/:id').post(async (req, res) => {
  console.log('hi clicked from uodatesss')
  try {
    const { id } = req.params;
    const { username, name, address, phoneNumber } = req.body;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json('User not found');
    }

    user.username = username;
    user.name = name;
    user.address = address;
    user.phoneNumber = phoneNumber;

    await user.save();
    await Counts.updateOne({}, counts);
    res.json('User updated successfully');
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});


router.get('/counts', async (req, res) => {
  // Fetch counts from the database
  const counts = await Counts.findOne({});
  res.json(counts);
});




router.route('/id').get((req, res) => {
  const userId = req.params.id;
  User.findById(userId)
    .then(user => {
      if (!user) {
        return res.status(404).json('User not found');
      }
      res.json(user);
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;