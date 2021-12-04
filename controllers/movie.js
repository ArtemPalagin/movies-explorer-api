const Movie = require('../models/movie');
const {
  ForbiddenError, NotFoundError, RequestError,
} = require('../errors/export-errors');

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.send({ data: movies }))
    .catch(next);
};
module.exports.postMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: req.user._id,
  })
    .then((movie) => res.send({ data: movie }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        // eslint-disable-next-line no-throw-literal
        throw {
          statusCode: 400,
          message: err.errors,
        };
      }
      throw err;
    }).catch(next);
};
module.exports.deleteMovie = (req, res, next) => {
  Movie.findOne({ movieId: req.params.movieId })
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Такого фильма не существует');
      }
      if (`${req.user._id}` !== `${movie.owner}`) {
        throw new ForbiddenError('Чужой фильм удалять нельзя');
      }

      return Movie.findByIdAndRemove(movie.id)
        .then((removedMovie) => res.send(removedMovie))
        .catch((err) => {
          throw err;
        });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new RequestError('Невалидный id');
      }
      throw err;
    })
    .catch(next);
};
