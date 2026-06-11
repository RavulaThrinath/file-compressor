const express = require("express");
const cors = require("cors");
const multer = require("multer");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");
const { exec } = require("child_process");

const app = express();

app.use(
  cors({
    origin: "https://file-compressor-3.vercel.app/",
  }),
);

const upload = multer({ dest: "uploads/" });

app.post("/https://file-compressor-api-1nlu.onrender.com/compress", upload.single("image"), async (req, res) => {
  try {
    const quality = Number(req.body.quality) || 60;

    const filePath = req.file.path;
    const mimeType = req.file.mimetype;

    // PDF Compression
    if (mimeType === "application/pdf") {
      const outputPath = path.resolve(
        "compressed",
        `compressed-${Date.now()}.pdf`,
      );

      const gsPath = '"C:\\Program Files\\gs\\gs10.07.1\\bin\\gswin64c.exe"';

      const command =
        `${gsPath} ` +
        `-sDEVICE=pdfwrite ` +
        `-dCompatibilityLevel=1.4 ` +
        `-dPDFSETTINGS=/ebook ` +
        `-dNOPAUSE ` +
        `-dQUIET ` +
        `-dBATCH ` +
        `-sOutputFile="${outputPath}" ` +
        `"${path.resolve(filePath)}"`;

      exec(command, (error) => {
        if (error) {
          console.error(error);
          return res.status(500).send("PDF compression failed");
        }

        if (!fs.existsSync(outputPath)) {
          return res.status(500).send("PDF output not created");
        }

        res.download(outputPath, () => {
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
          }

          if (fs.existsSync(outputPath)) {
            fs.unlinkSync(outputPath);
          }
        });
      });

      return;
    }

    // Image Compression
    const outputPath = `compressed/compressed-${Date.now()}.jpg`;

    await sharp(filePath).jpeg({ quality }).toFile(outputPath);

    res.download(path.resolve(outputPath), () => {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }

      if (fs.existsSync(outputPath)) {
        fs.unlinkSync(outputPath);
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Compression failed");
  }
});

app.get("/", (req, res) => {
  res.send("Server Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


