const express = require('express');
// const axios = require('axios');
const config = require('config');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
// bring in normalize to give us a proper url, regardless of what user entered
const normalize = require('normalize-url');
const checkObjectId = require('../../middleware/checkObjectId');

const Profile = require('../../models/Profile');
const User = require('../../models/User');
// const credit = require('../../models/credit');

// @route    GET api/profile/me
// @desc     Get current users profile
// @access   Private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id
    }).populate('user', ['companyName', 'avatar']);

    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    credit api/profile
// @desc     Create or update user profile
// @access   Private
router.post(
  '/',
  auth,
  check('status', 'Status is required').notEmpty(),
  check('services', 'Skills is required').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // destructure the request
    const {
      website,
      address1,
      address2,
      companyType,
      status,
      services,
      bio,
      // spread the rest of the fields we don't need to check
      ...rest
    } = req.body;
    

    // build a profile
    const profileFields = {
      user: req.user.id,
      address1,
      address2,
      companyType,
      status,
      bio,
      website:
        website && website !== ''
          ? normalize(website, { forceHttps: true })
          : '',
      services: Array.isArray(services)
        ? services
        : services.split(',').map((service) => ' ' + service.trim()),
      ...rest
    };

    
    try {
      // Using upsert option (creates new doc if no match is found):
      let profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true, upsert: true, setDefaultsOnInsert: true }
      );
      return res.json(profile);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send('Server Error');
    }
  }
);

// @route    GET api/profile
// @desc     Get all profiles
// @access   Public
router.get('/all', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['companyName', 'avatar']);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


// @route   GET api/profile/handle/:handle
// @desc    Get profile by handle
// @access  Public

// router.get('/handle/:handle', (req, res) => {
//   const errors = {};

//   Profile.findOne({ handle: req.params.handle })
//     .populate('user', ['companyName', 'avatar'])
//     .then(profile => {
//       if (!profile) {
//         errors.noprofile = 'There is no profile for this user';
//         res.status(404).json(errors);
//       }

//       res.json(profile);
//     })
//     .catch(err => res.status(404).json(err));
// });



// @route    GET api/profile/user/:user_id
// @desc     Get profile by user ID
// @access   Public
router.get(
  '/user/:user_id',
  checkObjectId('user_id'),
  async ({ params: { user_id } }, res) => {
    try {
      const profile = await Profile.findOne({
        user: user_id
      }).populate('user', ['companyName', 'avatar']);

      if (!profile) return res.status(400).json({ msg: 'Profile not found' });

      return res.json(profile);
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({ msg: 'Server error' });
    }
  }
);

// @route    DELETE api/profile
// @desc     Delete profile, user & credits
// @access   Private
router.delete('/', auth, async (req, res) => {
  try {
    // Remove user credits
    // Remove profile
    // Remove user
    await Promise.all([
      credit.deleteMany({ user: req.user.id }),
      Profile.findOneAndRemove({ user: req.user.id }),
      User.findOneAndRemove({ _id: req.user.id })
    ]);

    res.json({ msg: 'User deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});







module.exports = router;
