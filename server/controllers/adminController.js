import Model from '../models';

const { User } = Model;
/**
  * @class AdminController
  * @description Admin priviledge operation
  */
export default class AdminController {
  /**
  * @description -This method change the role of a user by an admin
  * @param {object} req - The request payload sent to the router
  * @param {object} res - The response payload sent back from the controller
  * @returns {object} - status Message and change user role
  */
  static changeRole(req, res) {
    const { userId, role } = req.body;
    User.findOne({ where: { id: userId } })
      .then((user) => {
        if (!user) {
          res.status(404).json({ success: false, message: 'No User Found' });
        } else {
          user.role = role;
          user.save();
          res.status(200).json({ success: true, message: `Successfully Changed User to ${user.role}`, user });
        }
      })
      .catch(() => res.json({ success: false, message: 'Internal Server Error' }));
  }
}
