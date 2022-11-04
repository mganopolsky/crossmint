const { API_ENTITIES, CANDIDATE_ID } = require("./constants");
const {
  deleteEntity,
  createEntity,
  generateCreateFetch,
  generateDeleteFetch,
} = require("./megaverse");

async function deleteCometh(row, column) {
  const input = {
    row: row,
    column: column,
    candidateId: CANDIDATE_ID,
  };

  deleteEntity(API_ENTITIES.COMETHS, input);
}

async function createCometh(row, column, direction) {
  const input = {
    row: row,
    column: column,
    direction: direction,
    candidateId: CANDIDATE_ID,
  };

  createEntity(API_ENTITIES.COMETHS, input);
}

async function deleteComethFetch(row, column, extra_delay = 0) {
  const input = {
    row: row,
    column: column,
    candidateId: CANDIDATE_ID,
  };

  generateDeleteFetch(API_ENTITIES.COMETHS, input, extra_delay);
}

async function createComethFetch(row, column, direction, extra_delay = 0) {
  const input = {
    row: row,
    column: column,
    direction: direction,
    candidateId: CANDIDATE_ID,
  };

  generateCreateFetch(API_ENTITIES.COMETHS, input, extra_delay);
}

module.exports = {
  deleteCometh,
  createCometh,
  deleteComethFetch,
  createComethFetch,
};
