const mongoose = require("mongoose");

const ImageSchema = mongoose.Schema({
  content: {
    type: Buffer,
  },
});

ImageSchema.methods.toJSON = function () {
  const result = this.toObject();
  delete result.content;
  return result;
};

const Image = mongoose.model("Image", ImageSchema);

module.exports = Image;
