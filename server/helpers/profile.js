
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
      success: false,
      error: 'Profile does not exist'
    });
  })
  .catch(() => res.status(500).json({ success: false, error: 'Profile could not be fetched' }));
