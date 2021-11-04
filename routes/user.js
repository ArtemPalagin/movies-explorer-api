const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUser, patchProfile,
} = require('../controllers/user');

router.get('/users/me', getUser);
router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    emale: Joi.string().required().email(),
  }),
}), patchProfile);

module.exports = router;
