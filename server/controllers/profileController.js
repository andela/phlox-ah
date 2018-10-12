
import Model from '../models';

const { Profile, User } = Model;

/**
  * @class ProfileController
  * @description CRUD operations on Profile
  */
export default class ProfileController {
  /**
  * @description -This method creates profile for a authenticated user
  * @param {object} req - The request payload sent from the router
  * @param {object} res - The response payload sent back from the controller
  * @returns {object} - status, message and profile detail
  */
  static createOrUpdateProfile(req, res) {
    const body = ProfileController.updateReqBody(req);

    return Profile.findOne({
      where: { username: req.user.username },
    })
      .then((profile) => {
        if (profile) {
          return profile.update(body)
            .then(data => ({ created: false, data }));
        }
        return Profile.create(body)
          .then(data => ({ created: true, data }));
      })
      .then(({ created, data }) => {
        if (created) {
          return res.status(201).json({ success: true, message: 'Profile created successfully', profile: data });
        }
        return res.status(200).json({ success: true, message: 'Profile updated successfully', profile: data });
      })
      .catch(() => res.status(500).json({ success: false, error: 'Profile could not be updated' }));
  }

  /**
   * @description -This method get profile detail by id
   * @param {object} req - The request payload sent to the router
   * @param {object} res - The response payload sent back from the controller
   * @returns {object} - status, message and profile detail
   */
  static getOneProfile(req, res) {
    return Profile.findOne({
      where: { username: req.user.username },
      include: [{
        model: User,
        attributes: ['username', 'email', 'createdAt', 'updatedAt']
      }]
    })
      .then((profile) => {
        res.status(200).json({ success: true, message: 'Profile fetched successfully', profile });
      })
      .catch(() => res.status(500).json({ success: false, error: 'Failed to fetch profile' }));
  }

  /**
   * @description -This method get all profile details
   * @param {object} req - The request payload sent from the router
   * @param {object} res - The response payload sent back from the controller
   * @returns {object} - status, message and profile detail
   */
  static getAllProfile(req, res) {
    return Profile.findAll({
      include: [{
        model: User,
        attributes: ['username', 'email', 'createdAt', 'updatedAt']
      }]
    })
      .then((profiles) => {
        res.status(200).json({ success: true, message: 'Profiles fetched successfully', profiles });
      })
      .catch(err => res.status(500).json({ success: false, error: 'Failed to fetch profiles', err }));
  }

  /**
   * @description -This method get profile detail of a authenticated user
   * @param {object} req - The request payload sent from the router
   * @param {object} res - The response payload sent back from the controller
   * @returns {object} - status, message and profile detail
   */
  static getProfileByUsername(req, res) {
    return Profile.findOne({
      where: { username: req.params.username },
      include: [{
        model: User,
        attributes: ['username', 'email', 'createdAt', 'updatedAt']
      }]
    })
      .then((profile) => {
        res.status(200).json({ success: true, message: 'Profile fetched successfully', profile });
      })
      .catch(() => res.status(500).json({ success: false, error: 'Failed to fetch profile' }));
  }

  /**
   * @description -This method updates user profile
   * @param {object} req - The request payload sent from the router
   * @param {object} res - The response payload sent back from the controller
   * @returns {object} - status, message and profile detail
   */
  static updateProfile(req, res) {
    const body = ProfileController.updateReqBody(req);

    return Profile.findOne({
      where: { username: req.user.username },
    })
      .then((profile) => {
        if (profile) {
          return profile.update(body);
        }
        return null;
      })
      .then((profile) => {
        if (profile) {
          return res.status(200).json({ success: true, message: 'Profile updated successfully', profile });
        }
        return res.status(404).json({ success: false, message: 'Profile not found', profile });
      })
      .catch(() => res.status(500).json({ success: false, error: 'Profile could not be updated' }));
  }

  /**
   * @description -This method add profile image url and userid to payload object
   * @param {object} req - The request payload sent from the router
   * @param {object} user - user detail of the logged in user
   * @returns {object} - object contain userid, username and profile image url
   */
  static updateReqBody(req) {
    const data = Object.assign(
      {},
      {
        profileImage: req.file ? req.file.secure_url : '',
        username: req.user.username,
        userId: req.user.id,
      },
      req.body,
    );

    if (!data.profileImage) {
      delete data.profileImage;
    }

    return data;
  }
}
