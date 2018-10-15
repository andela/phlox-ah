import Sequelize from 'sequelize';
import Model from '../../models';

const { Tag } = Model;

/* eslint-disable no-unused-vars */
const getTagIds = (req, res) => {
  const promise = new Promise((resolve, reject) => {
    Tag.findAll({
      where: {
        name: {
          [Sequelize.Op.or]: req.body.tags
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
