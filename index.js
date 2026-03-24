const express = require("express");
const path = require("path");
const app = express();

app.use(express.json());

// Serve frontend files
app.use(express.static(path.join(__dirname, "public")));

let domains = {};

// Test route
app.get("/", (req, res) => {
  res.send("Typedom is running 🚀");
});

// Create domain
app.post("/create", (req, res) => {
  const { name, target } = req.body;
  if (!name || !target) return res.json({ error: "Missing data" });

  domains[name] = target;
  res.json({ success: true, message: `${name} created` });
});

// Redirect route
app.get("/:name", (req, res) => {
  const name = req.params.name;
  if (domains[name]) return res.redirect(domains[name]);
  res.send("Not found");
});

// Dynamic port for Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Running on port", PORT));
