import Transaction from "../models/transaction.js";

export const index = async (req, res) => {
  const demo = await Transaction.aggregate([
    {
      $match: { user_id: req.user._id },
    },
    {
      $group: {
        _id: { $month: "$date" },
        transactions: {
          $push: {
            title: "$title",
            description: "$description",
            isCompleted: "$isCompleted",
            _id: "$_id",
          },
        },
      },
    },
    { $sort: { _id: 1 } },
  ]);
  res.json({ data: demo });
};

export const create = async (req, res) => {
  const { title, description, isCompleted, date } = req.body;
  const transaction = new Transaction({
    title,
    description,
    date,
    isCompleted,
    user_id: req.user._id,
  });
  await transaction.save();
  res.json({ message: "Success" });
};

export const destroy = async (req, res) => {
  await Transaction.deleteOne({ _id: req.params.id });
  res.json({ message: "success" });
};

export const update = async (req, res) => {
  await Transaction.updateOne({ _id: req.params.id }, { $set: req.body });
  res.json({ message: "success" });
};
export const statusUpdate = async (req, res) => {
  const data = await Transaction.findById(req.params.id);
  if (data.isCompleted) {
    await Transaction.updateOne({ _id: req.params.id }, { $set: { "isCompleted": false } });
  } else {
    await Transaction.updateOne({ _id: req.params.id }, { $set: { "isCompleted": true } });
  }

  res.json({ message: "success" });
};