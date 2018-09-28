import Model from '../models';

const { User } = Model;

export default class UserController {

  /* Create new controller */ 
  static create(req, res) {
    const {
      email, password
    } = req.body;

    User.create({
      email,
      password
    })
    .then((user) => res.status(201).json(user))
    .catch((err) => res.status(500).json(err));
  }
}


