const bal = require("mongoose");

const balanceSchema = new bal.Schema(
  {
    account: {
      type: Number,
      unique: true,
    },
    balance: Number,
    userId: Number,
  },
  {
    timestamps: true,
  },
);

module.exports = bal.model("sheet", balanceSchema);
