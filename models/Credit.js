const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CreditSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  companyName: {
    type: String
  },
  agreementLetter: {
    type: String,
    required: true
  },
  creditAmount: {
    type: String,
  },
  creditQuantity: {
    type: String,
   
  },
  creditItem: {
    type: String,
  },
  payback: {
    type: String
  },
  // name: {
  //   type: String
  // },
  avatar: {
    type: String
  },
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId
      },
      agreementLetter: {
        type: String,
        required: true
      },
      companyName: {
        type: String,
        default: "company a"
      },
      avatar: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('credit', CreditSchema);
