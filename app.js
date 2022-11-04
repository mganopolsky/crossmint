const express = require("express");
const bodyParser = require("body-parser");

const { clearPhase2, createPhase2Map, processGoal } = require("./src/maps");

const { SPACE_ENTITIES, CANDIDATE_ID } = require("./src/constants");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

/**
 * Endpoint that creates the Phase 1 of the megaverse
 */
app.get("/makeX", async (req, res) => {
  console.log("About to clear MEGAVERSE & Make X");
  try {
    await makeX();
    console.log("X Bring Created");
    res.status(201).send("X Created");
  } catch (err) {
    console.log("X creation failed:", err);
    res.status(500).send(err.message);
  }
});

/**
 * Endpoint that clears the PHASE 2 map in the MEGAVERSE
 */
app.get("/clear", async (req, res) => {
  console.log("About to clear MEGAVERSE");
  try {
    await clearPhase2();
    console.log("MEGAVERSE Cleared");
    res.status(201).send("MEGAVERSE Cleared");
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
});

/**
 * Endpoint that creates the Phase 2 Map of the MEGAVERSE
 */
app.post("/makePhase2", async (req, res) => {
  console.log("About to clear MEGAVERSE & Make X");
  try {
    //await clearPhase2();
    await createPhase2Map();
    console.log("Phase 2 Map being Created");
    res.status(201).send("Phase 2 Map Created");
  } catch (err) {
    console.log("Phase 2 Map creation failed:", err);
    res.status(500).send(err.message);
  }
});

app.listen(3000);
