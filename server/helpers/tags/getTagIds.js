import Sequelize from 'sequelize';
import Model from '../../models';

const { Tag } = Model;

/* eslint-disable no-unused-vars */
const getTagIds = (req, res) => {
  let tags;
  if (typeof req.body.tags === 'string') {
    tags = JSON.parse(req.body.tags);
  } else {
    // eslint-disable-next-line prefer-destructuring
    tags = req.body.tags;
  }
  const promise = new Promise((resolve, reject) => {
    Tag.findAll({
      where: {
        name: {
          [Sequelize.Op.or]: tags
        }
      },
      // eslint-disable-next-line
    }).then(tags => {
      const collectTagIds = tag => tag.id;
      const tagIds = tags.map(collectTagIds);
      resolve(tagIds);
    })
      .catch(error => res.status(500).json(error));
  });
  return promise;
};

export default getTagIds;
