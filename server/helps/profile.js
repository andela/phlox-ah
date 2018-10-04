
import Model from "../models/index";

const { Profile } = Model;

export const profileExist = (req, res, next) => {

  return Profile.findOne({
    where: {id: req.params.id},
  })
    .then(profile => {
      if(profile) {
        return next();
      }
      return res.status(404).json({
        error: "Profile does not exist"
      });
    })
    .catch(err => {
      return res.status(500).json(err)
    });
}


