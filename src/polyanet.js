const { API_ENTITIES, CANDIDATE_ID } = require("./constants");
const {
  deleteEntity,
  createEntity,
  generateCreateFetch,
  generateDeleteFetch,
} = require("./megaverse");

async function deletePolyanet(row, column) {
  const input = {
    row: row,
    column: column,
    candidateId: CANDIDATE_ID,
  };

  return deleteEntity(POLYANETS, input);
}

async function createPolyanet(row, column) {
  const input = {
    row: row,
    column: column,
    candidateId: CANDIDATE_ID,
  };

  createEntity(API_ENTITIES.POLYANETS, input);
}

async function deletePolyanetsFetch(row, column, extra_delay=0) {
  const input = {
    row: row,
    column: column,
    candidateId: CANDIDATE_ID,
  };

  generateDeleteFetch(API_ENTITIES.POLYANETS, input, extra_delay);
}

async function createPolyanetsFetch(row, column, direction, extra_delay=0) {
  const input = {
    row: row,
    column: column,
    direction: direction,
    candidateId: CANDIDATE_ID,
  };

  generateCreateFetch(API_ENTITIES.POLYANETS, input, extra_delay);
}

module.exports = {
  deletePolyanet,
  createPolyanet,
  deletePolyanetsFetch,
  createPolyanetsFetch,
};
