const express = require("express");
const cookieParser = require("cookie-parser")
const app = express();
const PORT = process.env.PORT || 8080; // default port 8080
const bodyParser = require("body-parser");

app.use(cookieParser())
app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

function makeId() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 6; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

let randomId = makeId()

let urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com",
  "test": "test"
};

// brings you to all "smallId's" and corresponding "longUrl's".
app.get("/urls", (req, res) => {
  const templateVars = {
    shortId: urlDatabase
  };
  res.render("urls_index", templateVars);
});

// brings you to Make new Urls page.
app.get("/urls/new", (req, res) => {
  res.render("urls_new");
});

// Brings you to "longUrl" edit page.
app.get("/urls/:shortId", (req, res) => {
  const shortId = req.params.shortId;
  const longUrl = urlDatabase[shortId];
  const templateVars = {
    shortId: shortId,
    url: longUrl
  };
  res.render("urls_show", templateVars);
});

// posts a new "shortId" and "longUrl".
app.post("/urls/new", (req, res) => {
  let shortId = randomId;
  const longUrl = req.body.longUrl;
  urlDatabase[shortId] = longUrl;
  res.redirect("/urls")
});

//deletes a shortId and longUrl.
app.post("/urls/:shortId/delete", (req, res) => {
  const shortId = req.params.shortId;
  delete urlDatabase[shortId];
  res.redirect("/urls");
});

//updates urlDatabase when you change a longUrl.
app.post("/urls/:shortId", (req, res) => {
  const shortId = req.params.shortId;
  const longUrl = req.body.longUrl;
  urlDatabase[shortId] = longUrl;
  res.redirect("/urls");
});

app.listen(PORT, () => {
    console.log(`Express server listening on port ${PORT}!`);
});