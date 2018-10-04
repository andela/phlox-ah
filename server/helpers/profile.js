
import Model from '../models/index';

const { Profile } = Model;

export default (req, res, next) => Profile.findOne({
  where: { id: req.params.id },
})
  .then((profile) => {
    if (profile) {
      return next();
    }
    return res.status(404).json({
      error: 'Profile does not exist'
    });
  })
  .catch(err => res.status(500).json(err));
