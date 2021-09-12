const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
  name: String,
  content: {
    type: Buffer,
  },
  userId: Number,
});

ImageSchema.methods.toJSON = function () {
  const result = this.toObject();
  delete result.content;
  return result;
};

const Image = mongoose.model("Image", ImageSchema);

module.exports = Image;
