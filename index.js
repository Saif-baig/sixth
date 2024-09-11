import inquirer from "inquirer";
import qr from "qr-image";
import fs from "fs";

inquirer
  .prompt([
    {
      message: "Type in your URL:",
      name: "URL"
    }
  ])
  .then((answers) => {
    const url = answers.URL;

    // 2. Use the qr-image npm package to generate a QR code.
    const qr_svg = qr.image(url);
    qr_svg.pipe(fs.createWriteStream('qr_image.png'));

    // Write the URL to a text file.
    fs.writeFile('URL.txt', url, (err) => {
      if (err) throw err;
      console.log('The URL has been saved to URL.txt!');
    });
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.error("Prompt couldn't be rendered in the current environment");
    } else {
      console.error("Something went wrong:", error);
    }
  });
