// import Sequelize from 'sequelize';
import Model from '../../models';

const { Tag } = Model;
const tagArray = [];

const findOrCreateTag = (req, res) => {
  const preTags = req.body.tags;
  preTags.forEach((ta) => {
    Tag.findOrCreate({
      where: {
        name: ta
      },
    })
    // eslint-disable-next-line
      .spread((tag, created) => {
        console.log(created);
        console.log(tag.dataValues.id);
        tagArray.push(tag.dataValues.id);
      })
      .catch(error => res.status(500).json(error));
  });
  console.log(tagArray);
  return 'cool';
};

export default findOrCreateTag;
