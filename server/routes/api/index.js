import express from 'express';
import user from './user';
import article from './article';
import profile from './profile';

const router = express.Router();

router.use('/', user);
router.use('/', article);
router.use('/', profile);

router.use((err, req, res, next) => {
  if (err.name === 'ValidationError') {
    return res.status(422).json({
      errors: Object.keys(err.errors).reduce((errors, key) => {
        errors[key] = err.errors[key].message;
        return errors;
      }, {})
    });
  }

  return next(err);
});

export default router;
