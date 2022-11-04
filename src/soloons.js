const { API_ENTITIES, CANDIDATE_ID } = require("./constants");
const {
  deleteEntity,
  createEntity,
  generateCreateFetch,
  generateDeleteFetch,
} = require("./megaverse");

async function deleteSoloons(row, column) {
  const input = {
    row: row,
    column: column,
    candidateId: CANDIDATE_ID,
  };

  return deleteEntity(SOLOONS, input);
}

async function createSoloons(row, column, color) {
  const input = {
    row: row,
    column: column,
    color: color,
    candidateId: CANDIDATE_ID,
  };

  createEntity(API_ENTITIES.SOLOONS, input);
}

async function deleteSoloonsFetch(row, column, extra_delay = 0) {
  const input = {
    row: row,
    column: column,
    candidateId: CANDIDATE_ID,
  };

  generateDeleteFetch(API_ENTITIES.SOLOONS, input, extra_delay);
}

async function createSoloonsFetch(row, column, color, extra_delay = 0) {
  const input = {
    row: row,
    column: column,
    color: color,
    candidateId: CANDIDATE_ID,
  };

  generateCreateFetch(API_ENTITIES.SOLOONS, input, extra_delay);
}

module.exports = {
  deleteSoloons,
  createSoloons,
  deleteSoloonsFetch,
  createSoloonsFetch,
};
