const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const Credit = require('../../models/Credit');
const User = require('../../models/User');
const checkObjectId = require('../../middleware/checkObjectId');

// @route    credit api/credits
// @desc     Create a credit
// @access   Private
router.post(
  '/',
  auth,
  check('agreementLetter', 'agreement letter is required').notEmpty(),
  check('creditAmount', 'credit amount is required').notEmpty(),
  check('creditQuantity', 'credit quantity is required').notEmpty(),
  check('creditItem', 'credit item is required').notEmpty(),
  check('payback', 'payback is required').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');

      const newCredit = new Credit({
        agreementLetter: req.body.agreementLetter,
        creditAmount: req.body.creditAmount,
        creditQuantity: req.body.creditQuantity,
        creditItem: req.body.creditItem,
        payback: req.body.payback,
        companyName: user.companyName,
        avatar: user.avatar,
        user: req.user.id
      });

      const credit = await newCredit.save();

      res.json(credit);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    GET api/credits
// @desc     Get all credits
// @access   Private
router.get('/', async (req, res) => {
  try {
    const credits = await Credit.find().sort({ date: -1 });
    res.json(credits);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/credits/:id
// @desc     Get credit by ID
// @access   Private
router.get('/:id', checkObjectId('id'), async (req, res) => {
  try {
    const credit = await Credit.findById(req.params.id);

    if (!credit) {
      return res.status(404).json({ msg: 'Credit not found' });
    }

    res.json(credit);
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});

// @route    DELETE api/credits/:id
// @desc     Delete a credit
// @access   Private
router.delete('/:id', [auth, checkObjectId('id')], async (req, res) => {
  try {
    const credit = await Credit.findById(req.params.id);

    if (!credit) {
      return res.status(404).json({ msg: 'Credit not found' });
    }

    // Check user
    if (credit.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await credit.remove();

    res.json({ msg: 'Credit removed' });
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});


// @route    credit api/credits/comment/:id
// @desc     Comment on a credit
// @access   Private
router.post(
  '/comment/:id',
  auth,
  checkObjectId('id'),
  check('agreementLetter', auth, 'comment is required').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');
      const credit = await Credit.findById(req.params.id);

      const newComment = {
        agreementLetter: req.body.agreementLetter,
        companyName: user.companyName,
        avatar: user.avatar,
        user: req.user.id
      };

      credit.comments.unshift(newComment);

      await credit.save();

      res.json(credit);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    DELETE api/credits/comment/:id/:comment_id
// @desc     Delete comment
// @access   Private
router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
  try {
    const credit = await Credit.findById(req.params.id);

    // Pull out comment
    const comment = credit.comments.find(
      (comment) => comment.id === req.params.comment_id
    );
    // Make sure comment exists
    if (!comment) {
      return res.status(404).json({ msg: 'Comment does not exist' });
    }
    // Check user
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    credit.comments = credit.comments.filter(
      ({ id }) => id !== req.params.comment_id
    );

    await credit.save();

    return res.json(credit.comments);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
});

module.exports = router;
