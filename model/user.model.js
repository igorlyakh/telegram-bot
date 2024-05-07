const { model, Schema } = require('mongoose');

const userSchema = new Schema(
  {
    name: {
      type: String,
      default: null,
    },
    tgId: {
      type: Number,
      default: null,
      unique: true,
    },
    subscribe: {
      type: String,
      default: null,
    },
    subUntil: {
      type: Date,
      default: null,
    },
    blocked: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

const User = model('user', userSchema);

module.exports = { User };
