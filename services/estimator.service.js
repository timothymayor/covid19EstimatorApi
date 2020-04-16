import Estimator from '../models/Estimator';

export default {
  createEstimator(estimatorData) {
    return new Promise(async (resolve, reject) => {
      try {
        const newEstimator = new Estimator(estimatorData);
        const estimator = await newEstimator.save();
        resolve(estimator);
      } catch (error) {
        reject(error);
      }
    });
  },
  getEstimatorById(id) {
    return new Promise(async (resolve, reject) => {
      try {
        const estimator = await Estimator.findById(id)
        resolve(estimator);
      } catch (error) {
        reject(error);
      }
    });
  },
  getEstimators(options) {
    return new Promise(async (resolve, reject) => {
      try {
        const estimators = await Estimator.find(options)
        resolve(estimators);
      } catch (error) {
        reject(error);
      }
    });
  },
  /**
   *
   * @param {string} estinatorId mongo objectId of Estimator
   * @param {object} options object containing attributes to be updated
   * @returns {Promise} resolve promise or rejected if error
   */
  updateEstimator(estinatorId, options) {
    return new Promise(async (resolve, reject) => {
      try {
        const updatedEstimator = await Estimator.findByIdAndUpdate(estinatorId, options, {
          new: true
        }).exec();
        resolve(updatedEstimator);
      } catch (error) {
        reject(error);
      }
    });
  }
};

