import Model from '../models';
import reqReportParams from '../helpers/report';

const { Report, User, Article } = Model;

/**
 * @class ReportController
 * @description CRUD operations on Report Article
 */
export default class ReportController {
  /**
   * @description -This method adds report to a particular article
   * @param {object} req - The request payload sent from the router
   * @param {object} res - The response payload sent back from the controller
   * @returns {object} - status, message and report detail
   */
  static createReport(req, res) {
    const data = reqReportParams(req);

    return Article.findOne({
      where: {
        userId: data.userId,
        slug: data.articleSlug
      }
    })
      .then((article) => {
        if (article) {
          return Report.create(data);
        }
        return null;
      })
      .then((report) => {
        if (report) {
          return res.status(201).json({ success: true, message: 'Report added successfully', report });
        }
        return res.status(404).json({ success: false, message: 'Article could not be found' });
      })
      .catch(() => res.status(500).json({ success: false, message: 'Report could not be added' }));
  }

  /**
   * @description -This method fetches report of a particular article
   * @param {object} req - The request payload sent from the router
   * @param {object} res - The response payload sent back from the controller
   * @returns {object} - status, message and reports array
   */
  static getArticleReport(req, res) {
    const data = reqReportParams(req);

    return Article.findOne({
      where: {
        slug: data.articleSlug
      }
    })
      .then((article) => {
        if (article) {
          return Report.findAll({
            where: { articleSlug: data.articleSlug },
            order: [
              ['createdAt', 'DESC'],
            ],
            include: [
              {
                model: User,
                attributes: ['username', 'email']
              },
            ]
          });
        }
        return null;
      })
      .then((reports) => {
        if (reports) {
          return res.status(200).json({ success: true, message: 'Report fetched successfully', reports });
        }
        return res.status(404).json({ success: false, message: 'Report could not be found' });
      })
      .catch(() => res.status(500).json({ success: false, message: 'Report could not be fetched' }));
  }

  /**
   * @description -This method fetches all report
   * @param {object} req - The request payload sent from the router
   * @param {object} res - The response payload sent back from the controller
   * @returns {object} - status, message and reports array
   */
  static getAllReport(req, res) {
    return Report.findAll({
      order: [
        ['createdAt', 'DESC'],
      ],
      include: [
        {
          model: User,
          attributes: ['username', 'email']
        },
      ]
    })
      .then(reports => res.status(200).json({ success: true, message: 'Report fetched successfully', reports }))
      .catch(() => res.status(500).json({ success: false, message: 'Report could not be fetched' }));
  }

  /**
   * @description -This method edits report of a particular article
   * @param {object} req - The request payload sent from the router
   * @param {object} res - The response payload sent back from the controller
   * @returns {object} - status, message and report detail
   */
  static editReport(req, res) {
    const data = reqReportParams(req);

    return Article.findOne({
      where: {
        userId: data.userId,
        slug: data.articleSlug
      }
    })
      .then((article) => {
        if (article) {
          return Report.update({
            title: data.title,
            body: data.body,
          }, {
            where: {
              id: data.reportId,
              userId: data.userId,
            },
            returning: true,
          });
        }
        return null;
      })
      .then((report) => {
        if (report) {
          return res.status(200).json({ success: true, message: 'Report updated successfully', report: report[1][0] });
        }
        return res.status(404).json({ success: false, message: 'Report could not be found' });
      })
      .catch(() => res.status(500).json({ success: false, message: 'Report could not be updated' }));
  }

  /**
   * @description -This method resolves report of a particular article
   * @param {object} req - The request payload sent from the router
   * @param {object} res - The response payload sent back from the controller
   * @returns {object} - status, message and report detail
   */
  static resolveReport(req, res) {
    const data = reqReportParams(req);

    return Article.findOne({
      where: {
        slug: data.articleSlug
      }
    })
      .then((article) => {
        if (article) {
          return Report.update({
            resolved: true,
          }, {
            where: {
              id: data.reportId
            },
            returning: true,
          });
        }
        return null;
      })
      .then((report) => {
        if (report) {
          return res.status(200).json({ success: true, message: 'Report resolved successfully', report: report[1][0] });
        }
        return res.status(404).json({ success: false, message: 'Report could not be found' });
      })
      .catch(() => res.status(500).json({ success: false, message: 'Report could not be resolved' }));
  }

  /**
   * @description -This method get resolved report of a particular article
   * @param {object} req - The request payload sent from the router
   * @param {object} res - The response payload sent back from the controller
   * @returns {object} - status, message and report detail
   */
  static getResolvedArticleReport(req, res) {
    const data = reqReportParams(req);

    return Article.findOne({
      where: {
        slug: data.articleSlug
      }
    })
      .then((article) => {
        if (article) {
          return Report.findAll({
            order: [
              ['createdAt', 'DESC'],
            ],
            where: {
              articleSlug: data.articleSlug,
              resolved: true,
            }
          });
        }
        return null;
      })
      .then((reports) => {
        if (reports) {
          return res.status(200).json({ success: true, message: 'Resolved report fetched successfully', reports });
        }
        return res.status(404).json({ success: false, message: 'Report could not be found' });
      })
      .catch(() => res.status(500).json({ success: false, message: 'Resolved report could not be fetched' }));
  }

  /**
   * @description -This method get unresolved report of a particular article
   * @param {object} req - The request payload sent from the router
   * @param {object} res - The response payload sent back from the controller
   * @returns {object} - status, message and report detail
   */
  static getUnresolvedArticleReport(req, res) {
    const data = reqReportParams(req);

    return Article.findOne({
      where: {
        slug: data.articleSlug
      }
    })
      .then((article) => {
        if (article) {
          return Report.findAll({
            order: [
              ['createdAt', 'DESC'],
            ],
            where: {
              articleSlug: data.articleSlug,
              resolved: false,
            }
          });
        }
        return null;
      })
      .then((reports) => {
        if (reports) {
          return res.status(200).json({ success: true, message: 'Unresolved report fetched successfully', reports });
        }
        return res.status(404).json({ success: false, message: 'Report could not be found' });
      })
      .catch(() => res.status(500).json({ success: false, message: 'Unresolved report could not be fetched' }));
  }

  /**
   * @description -This method get resolved report
   * @param {object} req - The request payload sent from the router
   * @param {object} res - The response payload sent back from the controller
   * @returns {object} - status, message and report detail
   */
  static getAllResolvedReport(req, res) {
    return Report.findAll({
      order: [
        ['createdAt', 'DESC'],
      ],
      where: {
        resolved: true,
      }
    })
      .then(reports => res.status(200).json({ success: true, message: 'Resolved report fetched successfully', reports }))
      .catch(() => res.status(500).json({ success: false, message: 'Resolved report could not be fetched' }));
  }

  /**
   * @description -This method get all unresolved report
   * @param {object} req - The request payload sent from the router
   * @param {object} res - The response payload sent back from the controller
   * @returns {object} - status, message and report detail
   */
  static getAllUnresolvedReport(req, res) {
    return Report.findAll({
      order: [
        ['createdAt', 'DESC'],
      ],
      where: {
        resolved: false,
      }
    })
      .then(reports => res.status(200).json({ success: true, message: 'Unresolved report fetched successfully', reports }))
      .catch(() => res.status(500).json({ success: false, message: 'Unresolved report could not be fetched' }));
  }
}
