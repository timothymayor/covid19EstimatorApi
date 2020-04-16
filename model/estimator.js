const mongoose = require('mongoose')

const estimatorSchema = mongoose.Schema({
  timeToElapse: Number,
  totalHospitalBeds: Number,
  reportedCases: Number,
  periodType: String,
  region: {
    properties: {
      name: String,
      averageAge:Number,
      avgDailyIncomeInUSD: { type: mongoose.Schema.Types.Decimal128 },
      avgDailyIncomePopulation: { type: mongoose.Schema.Types.Decimal128 }
    }
  },
  isActive: {
    type: Boolean,
    default: false
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
  isVerified: {
    type: Boolean,
    default: false
  }
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date }
});

const Estimator = model('Estimators', productSchema);
export default Estimator;
