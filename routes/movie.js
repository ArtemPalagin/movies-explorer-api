const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getMovies, postMovie, deleteMovie,
} = require('../controllers/movie');

router.get('/movies', getMovies);
router.post('/movies', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().uri({
      scheme: [
        'http', 'https',
      ],
    }),
    trailer: Joi.string().required().uri({
      scheme: [
        'http', 'https',
      ],
    }),
    thumbnail: Joi.string().required().uri({
      scheme: [
        'http', 'https',
      ],
    }),
    movieId: Joi.string().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
}), postMovie);
router.delete('/movies/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().alphanum().length(24),
  }),
}), deleteMovie);

module.exports = router;
