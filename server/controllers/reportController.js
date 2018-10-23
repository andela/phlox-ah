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
        slug: data.articleSlug,
      }
    })
      .then((article) => {
        if (article) {
          return Report.create(data)
            .then(report => res.status(201).json({ success: true, message: 'Report added successfully', report }));
        }
        return res.status(400).json({ success: false, message: 'Report could not be added' });
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
    })
      .then(reports => res.status(200).json({ success: true, message: 'Report fetched successfully', reports }))
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

    return Report.update({
      title: data.title,
      body: data.body,
    }, {
      where: {
        id: data.reportId,
        userId: data.userId,
        articleSlug: data.articleSlug,
      },
      returning: true,
    })
      .then(report => res.status(200).json({ success: true, message: 'Report updated successfully', report: report[1][0] }))
      .catch(() => res.status(500).json({ success: false, message: 'Report could not be updated' }));
  }

  /**
   * @description -This method approves report of a particular article
   * @param {object} req - The request payload sent from the router
   * @param {object} res - The response payload sent back from the controller
   * @returns {object} - status, message and report detail
   */
  static approveReport(req, res) {
    const data = reqReportParams(req);

    return Report.update({
      approve: true,
    }, {
      where: {
        id: data.reportId,
        articleSlug: data.articleSlug,
      },
      returning: true,
    })
      .then((report) => {
        res.status(200).json({ success: true, message: 'Report approved successfully', report: report[1][0] });
      })
      .catch(() => res.status(500).json({ success: false, message: 'Report could not be approved' }));
  }

  /**
   * @description -This method get approved report of a particular article
   * @param {object} req - The request payload sent from the router
   * @param {object} res - The response payload sent back from the controller
   * @returns {object} - status, message and report detail
   */
  static getApproveArticleReport(req, res) {
    const data = reqReportParams(req);

    return Report.findAll({
      order: [
        ['createdAt', 'DESC'],
      ],
      where: {
        articleSlug: data.articleSlug,
        approve: true,
      }
    })
      .then(reports => res.status(200).json({ success: true, message: 'Approved report fetched successfully', reports }))
      .catch(() => res.status(500).json({ success: false, message: 'Approved report could not be fetched' }));
  }

  /**
   * @description -This method get disapprove report of a particular article
   * @param {object} req - The request payload sent from the router
   * @param {object} res - The response payload sent back from the controller
   * @returns {object} - status, message and report detail
   */
  static getDisapproveArticleReport(req, res) {
    const data = reqReportParams(req);

    return Report.findAll({
      order: [
        ['createdAt', 'DESC'],
      ],
      where: {
        articleSlug: data.articleSlug,
        approve: false,
      }
    })
      .then(reports => res.status(200).json({ success: true, message: 'Disapproved report fetched successfully', reports }))
      .catch(() => res.status(500).json({ success: false, message: 'Disapproved report could not be fetched' }));
  }

  /**
   * @description -This method get approved report
   * @param {object} req - The request payload sent from the router
   * @param {object} res - The response payload sent back from the controller
   * @returns {object} - status, message and report detail
   */
  static getAllApproveReport(req, res) {
    return Report.findAll({
      order: [
        ['createdAt', 'DESC'],
      ],
      where: {
        approve: true,
      }
    })
      .then(reports => res.status(200).json({ success: true, message: 'Approved report fetched successfully', reports }))
      .catch(() => res.status(500).json({ success: false, message: 'Approved report could not be fetched' }));
  }

  /**
   * @description -This method get all disapprove report
   * @param {object} req - The request payload sent from the router
   * @param {object} res - The response payload sent back from the controller
   * @returns {object} - status, message and report detail
   */
  static getAllDisapproveReport(req, res) {
    return Report.findAll({
      order: [
        ['createdAt', 'DESC'],
      ],
      where: {
        approve: false,
      }
    })
      .then(reports => res.status(200).json({ success: true, message: 'Disapproved report fetched successfully', reports }))
      .catch(() => res.status(500).json({ success: false, message: 'Disapproved report could not be fetched' }));
  }
}
