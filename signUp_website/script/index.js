const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../signup.html"));
});

app.post("/", (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;

  console.log(firstName + " " + lastName + " " + email);

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FIRSTNAME: firstName,
          LASTNAME: lastName,
        },
      },
    ],
  };
  var jsonData = JSON.stringify(data);

  const url = "https://us21.api.mailchimp.com/3.0/lists/1ab5ee1e27";
  const options = {
    method: "POST",
    auth: "AuxUser1:a43121af439423dbc369f0fb2bfe51a8-us21",
  };

  const request = https.request(url, options, function (response) {
    response.on("data", function (data) {});
  });

  request.write(jsonData);
  request.end();

});

app.listen(3000, function () {
  console.log("Running on port 3000");
});
