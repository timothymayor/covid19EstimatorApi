import { handleServerError, handleServerResponse, handleServerResponseError } from '../utils/helpers';
import EstimatorServices from '../services/Estimator.service';
import messages from '../utils/messages';

const {
  createEstimator, getEstimatorById, getEstimators,
  updateEstimator
} = EstimatorServices;

export default {
  /**
   * @method create
   * @description creates a new estimator
   * @param {object} req express request object
   * @param {object} res express response object
   * @returns {object} successful response
   */
  async create(req, res) {
    const {
      timeToElapse, totalHospitalBeds, reportedCases,
      periodType, name, averageAge,
      avgDailyIncomeInUSD, avgDailyIncomePopulation
    } = req.body;
    try {
      const estimatorData = {
        timeToElapse,
        totalHospitalBeds,
        reportedCases,
        periodType,
        region: {
          properties: {
            name,
            averageAge,
            avgDailyIncomeInUSD,
            avgDailyIncomePopulation
          }
        },
      }
      const estimator = await createEstimator(estimatorData);
      return handleServerResponse(res, 201, { estimator });
    } catch (error) {
      return handleServerError(res, error);
    }
  },
  async get(req, res) {
    const { estimatorId } = req.params;
    try {
      const estimator = await getEstimatorById(estimatorId);
      if (!estimator) {
        return handleServerResponseError(res, 404, 'estimator not exist');
      }
      return handleServerResponse(res, 200, estimator);
    } catch (error) {
      return handleServerError(res, 500);
    }
  },
  async getAll(req, res) {
    try {
      const estimators = await getEstimators({});
      if (!estimators || estimators.length < 1) {
        return handleServerResponseError(res, 404, 'No estimators to show');
      }
      return handleServerResponse(res, 200, { estimators });
    } catch (error) {
      return handleServerError(res, 500);
    }
  },
  async updateEstimatorById(req, res) {
    try {
      const {
        timeToElapse, totalHospitalBeds, reportedCases,
        periodType, name, averageAge,
        avgDailyIncomeInUSD, avgDailyIncomePopulation
      } = req.body;
      const { estimatorId } = req.params;
      const estimatorData = {
        timeToElapse,
        totalHospitalBeds,
        reportedCases,
        periodType,
        region: {
          properties: {
            name,
            averageAge,
            avgDailyIncomeInUSD,
            avgDailyIncomePopulation
          }
        },
      }
      const updatedEstimator = updateEstimator(estimatorId, estimatorData)
    } catch (error) {
      return handleServerError(res, error);
    }
  }
};
