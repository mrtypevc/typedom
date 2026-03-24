const express = require("express");
const app = express();

app.use(express.json());

let domains = {};

// test route
app.get("/", (req, res) => {
  res.send("Typedom is running 🚀");
});

// create domain
app.post("/create", (req, res) => {
  const { name, target } = req.body;

  if (!name || !target) {
    return res.json({ error: "Missing data" });
  }

  domains[name] = target;

  res.json({
    success: true,
    message: `${name} created`
  });
});

// redirect using path (IMPORTANT CHANGE)
app.get("/:name", (req, res) => {
  const name = req.params.name;

  if (domains[name]) {
    return res.redirect(domains[name]);
  }

  res.send("Not found");
});

app.listen(3000, () => console.log("Running"));
