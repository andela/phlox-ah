import fs from 'fs';
import path from 'path';
import Model from '../models';


const { Profile, User } = Model;

export default class ProfileController {

  static createOrUpdate(req, res) {

    const userId = req.user.id || req.body.userId
    const body = ProfileController.updateReqBody(req, userId);

    return Profile.findOne({
      where: {userId},
    })
      .then(profile => {
        if(profile){
          return profile.update(body)
            .then(profile => {
              return {
                created: false,
                profile,
              }
            });
        }
        return Profile.create(body)
          .then(profile => {
            return {
              created: true,
              profile,
            }
          });
      })
      .then(({created, profile}) => {
        if(created) {
          return res.status(201).json({
            success: true,
            message: "Profile created successfully",
            profile,
          })
        }
        return res.status(200).json({
          success: true,
          message: "Profile updated successfully",
          profile,
        })
      })
      .catch((err) => {
        return res.status(500)
          .json({error: "Profile could not be updated"});
      });
  }

  static getAll(req, res) {
    Profile.findAll({ 
      include: [{
        model: User,
        attributes: ["email"]
      }]
    })  
      .then((profiles) => res.status(200).json({profiles}))
      .catch((err) => res.status(500).json(err));
  }

  static updateReqBody(req, userId) {
    return Object.assign(
      {},
      {profileImage: req.file.secure_url, userId}, 
      req.body,
    );
  }

}


