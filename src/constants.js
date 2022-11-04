const BASE_URL = "https://challenge.crossmint.io/api/";
const CANDIDATE_ID = "c7266bc1-edf9-4685-97bc-4ec64bb30e9b";
const POLYANETS = "polyanets";
const POLYANET = "POLYANET";
const COMETHS = "comeths";
const COMETH = "COMETH";
const SOLOONS = "soloons";
const SOLOON = "SOLOON";
const DELETE = "DELETE";
const POST = "POST";
const GET = "GET";
const PHASE_2_DIM = 30;
const SPACE = "SPACE";
const DELAY = 10;
const RETRY = 5;

//Constants used for COMETH directions

const DIRECTIONS = {
  UP: "UP",
  DOWN: "DOWN",
  LEFT: "LEFT",
  RIGHT: "RIGHT",
};

//Constants used for the space entities in question (used in the fetch calls)
const API_ENTITIES = {
  POLYANETS,
  COMETHS,
  SOLOONS,
};

// constant used in the reading of the goal map, and the reading of the existing state of a map
const SPACE_ENTITIES = {
  SPACE,
  COMETH,
  POLYANET,
  SOLOON,
};

// REST API calls used in the CrossMint fetch calls
const METHODS = {
  POST,
  DELETE,
  GET,
};

// Constants representing the colors of the SOLOON entities
const COLORS = {
  WHITE: "WHITE",
  BLUE: "BLUE",
  PURPLE: "PURPLE",
  RED: "RED",
};

module.exports = {
  BASE_URL,
  CANDIDATE_ID,
  API_ENTITIES,
  METHODS,
  SPACE_ENTITIES,
  PHASE_2_DIM,
  DIRECTIONS,
  DELAY,
  RETRY,
};
