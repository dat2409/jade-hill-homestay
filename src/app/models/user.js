const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      trim: true,
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
      maxlength: 40,
    },
    password: {
      trim: true,
      minlength: 3,
      type: String,
    },
    isManager: {
      type: Boolean,
      default: false
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
