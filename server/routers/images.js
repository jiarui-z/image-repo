const express = require("express");
const multer = require("multer");
const path = require("path");
const Image = require("../model/Image");
const router = express.Router();

const upload = multer({
  limits: {
    fileSize: 1000000, // max file size 1MB
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpeg|jpg)$/)) {
      cb(new Error("only upload files with jpg or jpeg format."));
    }
    cb(undefined, true);
  },
});

router.post(
  "/",
  upload.single("image"),
  async (req, res) => {
    try {
      const image = new Image();
      const file = req.file.buffer;
      image.content = file;
      image.name = path.parse(req.file.originalname).name;

      await image.save();
      res.status(201).send({ _id: image._id });
    } catch (error) {
      res.status(500).send({
        upload_error: "Error while uploading file...Try again later.",
      });
    }
  },
  (error, req, res) => {
    if (error) {
      res.status(500).send({
        upload_error: error.message,
      });
    }
  }
);

router.get("/", async (req, res) => {
  try {
    const images = await Image.find({});
    res.send(images);
  } catch (error) {
    res.status(500).send({ get_error: "Error while getting list of images." });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const result = await Image.findById(req.params.id);
    res.set("Content-Type", "image/jpeg");
    res.send(result.content);
  } catch (error) {
    res.status(400).send({ get_error: "Error while getting image." });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Image.deleteOne({ _id: req.params.id });
    res.status(201).send({ _id: req.params.id });
  } catch (error) {
    console.log(error);
    res.status(400).send({ delete_error: "Error while deleting image." });
  }
});

module.exports = router;
