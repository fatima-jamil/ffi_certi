// const express = require('express');
// const bodyParser = require('body-parser');
// const nodemailer = require('nodemailer');
// const Jimp = require('jimp');
// const path = require('path');

// const app = express();

// app.use(bodyParser.urlencoded({ extended: true }));
// app.set('view engine', 'ejs');
// app.use(express.static('public'));

// app.get('/', (req, res) => {
//   res.render('index');
// });

// app.post('/generate', async (req, res) => {
//   const { name, email } = req.body;
//   const imagePath = path.join(__dirname, 'public', 'images', 'certificate.png');
//   const outputImagePath = path.join(__dirname, 'public', 'images', 'certificate_with_name.png');

//   try {
//     const image = await Jimp.read(imagePath);
//     const font = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);

//     // Get image dimensions
//     const imageWidth = image.bitmap.width;
//     const imageHeight = image.bitmap.height;

//     // Measure the text
//     const textWidth = Jimp.measureText(font, name);
//     const textHeight = Jimp.measureTextHeight(font, name, imageWidth);

//     // Calculate the coordinates to center the text
//     const x = (imageWidth - textWidth) / 2;
//     const y = (imageHeight - textHeight) / 2;

//     image.print(font, x, y, name);

//     await image.writeAsync(outputImagePath);

//     res.render('certificate', { name, email });

//     // Send email with certificate
//     const transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         user: 'jamilfatima86@gmail.com', // Replace with your email
//         pass: 'cgxx bxen xobh bnvm'    // Replace with your app password
//       }
//     });

//     const mailOptions = {
//       from: 'jamilfatima86@gmail.com',
//       to: email,
//       subject: 'Your Blood Donation Appreciation Certificate',
//       text: `Dear ${name},\n\nThank you for your blood donation! Attached is your appreciation certificate.\n\nBest regards,\nBlood Donation Organization`,
//       attachments: [
//         {
//           filename: 'certificate.png',
//           path: outputImagePath
//         }
//       ]
//     };

//     transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//         return console.log(error);
//       }
//       console.log('Email sent: ' + info.response);
//     });

//   } catch (err) {
//     console.error(err);
//   }
// });

// const PORT = process.env.PORT || 3001;

// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });



const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const Jimp = require('jimp');
const path = require('path');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/generate', async (req, res) => {
  const { name, email } = req.body;
  const imagePath = path.join(__dirname, 'public', 'images', 'certificate.png');
  const outputImagePath = path.join(__dirname, 'public', 'images', 'certificate_with_name.png');

  try {
    const image = await Jimp.read(imagePath);
    const font = await Jimp.loadFont(Jimp.FONT_SANS_64_BLACK); // Use a larger built-in font

    // Get image dimensions
    const imageWidth = image.bitmap.width;
    const imageHeight = image.bitmap.height;

    // Measure the text
    const textWidth = Jimp.measureText(font, name);
    const textHeight = Jimp.measureTextHeight(font, name, imageWidth);

    // Calculate the coordinates to center the text
    const x = (imageWidth - textWidth) / 2;
    const y = (imageHeight - textHeight) / 2;

    // Print the text at the calculated coordinates
    image.print(font, x, y, name);

    // Save the updated image
    await image.writeAsync(outputImagePath);

    res.render('certificate', { name, email });

    // Send email with certificate
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'email@gmail.com', // Replace with your email
        pass: 'password'    // Replace with your app password
      }
    });

    const mailOptions = {
      from: 'email86@gmail.com',
      to: email,
      subject: 'Your Blood Donation Appreciation Certificate',
      text: `Dear ${name},\n\nThank you for your blood donation! Attached is your appreciation certificate.\n\nBest regards,\nBlood Donation Organization`,
      attachments: [
        {
          filename: 'certificate.png',
          path: outputImagePath
        }
      ]
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log('Email sent: ' + info.response);
    });

  } catch (err) {
    console.error(err);
  }
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
