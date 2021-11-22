const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      trim: true,
      default: "test"
    },
    last_name: {
      type: String,
      trim: true,
    },
    phone_num: {
      type: String,
      default: '',
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      max: 40,
    },
    password: {
      trim: true,
      min: 3,
      type: String,
    },
    role: {
      type: String,
      enum: ["Staff", "Manager"]
    },
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema);
module.exports = User;
