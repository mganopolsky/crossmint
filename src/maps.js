const fetch = require("node-fetch");

const {
  API_ENTITIES,
  CANDIDATE_ID,
  BASE_URL,
  SPACE_ENTITIES,
  METHODS,
  PHASE_2_DIM,
} = require("./constants");

const {
  createPolyanet,
  deletePolyanet,
  createPolyanetsFetch,
  deletePolyanetsFetch,
} = require("./polyanet");

const { createComethFetch, deleteComethFetch } = require("./comeths");

const { createSoloonsFetch, deleteSoloonsFetch } = require("./soloons");

// used exclusively for phase 1
const clearPhase1 = async () => {
  //get the existing map
  const results = await getMap();

  //if there are items on the map, loop through them row by row and column
  if (results) {
    for (let y = 0; y < 11; y++) {
      //filter out the indexes of the existing polyanets
      const indexes = results[y]
        .map((item, index) => (item ? index : undefined))
        .filter((x) => x);

      //delete the plyanets at the (y, index) locations
      for (let index of indexes) {
        await deletePolyanet(y, index);
      }
    }
  }
};

// method used to delay sending a fetch request
const wait = (delaySeconds) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), delaySeconds * 1000);
  });
};

/**
 * Used to clear the existing CrossMint map in Phase 2;
 */
const clearPhase2 = async () => {
  //get the existing map
  const results = await getMap();
  let promises = [];

  //if there are items on the map, loop through them row by row and clear
  if (results) {
    for (let y = 0; y < PHASE_2_DIM; y++) {
      //filter out the indexes of the existing entities
      const items = results[y]
        .map((item, index) =>
          item ? (index = { index, item: item }) : undefined
        )
        .filter((x) => x);

      //determine which entity we're deleting based on the type
      for (const item of items) {
        const type = item?.item?.type;

        await wait(0.3);
        switch (type) {
          case 2:
            promises.push(await deleteComethFetch(y, item.index));
            break;
          case 1:
            promises.push(await deleteSoloonsFetch(y, item.index));
            break;
          case 0:
          default:
            promises.push(await deletePolyanetsFetch(y, item.index));
            break;
        }
      }
    }
  }
  console.log(promises);
};

// get the goal map in order to program it
async function getGoalMap() {
  let response = await fetch(BASE_URL + "map/" + CANDIDATE_ID + "/goal", {
    method: METHODS.GET,
  });

  let result = await response.json();

  return result;
}

// get the current status of the map - usually to clear it
async function getMap() {
  let response = await fetch(BASE_URL + "map/" + CANDIDATE_ID, {
    method: METHODS.GET,
  });

  let result = await response.json();

  return result?.map?.content;
}

// used to create a basic cross in Phase 1
async function makeX() {
  for (let y = 2; y <= 8; y++) {
    const x1 = y;
    const x2 = 10 - y;
    await createPolyanet(y, x1);
    await createPolyanet(y, x2);
  }
}

/**async const used to create a space entity at a specific row or column
 *
 * @param {*} row -  row index of the entity
 * @param {*} column - column index of the entitiy
 * @param {*} goalStr - the string combination of the space entity;
 * for POLYANET - it's simply 'POLYANET'
 * for COMETHs - it's a combination of the DIRECTION_"COMETH" -
 *    direction options stored in the DIRECTIONS constant.
 * for SOLOON - it's a combination of the COLOR_"SOLOON" -
 *    color options stored in the COLORS constant.
 * @returns
 */
const processGoal = async (row, column, goalStr) => {
  if (goalStr == SPACE_ENTITIES.SPACE)
    // do nothing if it's an empty space
    return;

  if (goalStr == SPACE_ENTITIES.POLYANET) {
    //create a polyanet
    await createPolyanetsFetch(row, column);
  } else if (goalStr.indexOf(SPACE_ENTITIES.COMETH) > -1) {
    // create a cometh with its particular direction
    const direction = goalStr.split("_")[0]?.toLowerCase();
    if (direction) {
      await createComethFetch(row, column, direction);
    }
  } else if (goalStr.indexOf(SPACE_ENTITIES.SOLOON) > -1) {
    //create a soloon with the color
    const color = goalStr.split("_")[0]?.toLowerCase();
    if (color) {
      await createSoloonsFetch(row, column, color);
    }
  }
};

/**
 * This creates the phase 2 map based on reading and parsing the goal map.
 * Running this method takes some time for several reasons:
 * * Repeated calls to the CrossMint APIs time out
 * * the function will wait .3 seconds between calls - further optimization might be necessary
 *      but this seems to be sweet spot between not overloading the server and actually returning the results of the async calls.
 * The function is currently designed to wait and then make its respective asyncronous call;
 * Functionality is also build-in to delay the `fetch` call to the API - but this proved to need more optimization
 */
const createPhase2Map = async () => {
  let goalMap = await getGoalMap();
  let goal = goalMap?.goal;
  let promises = [];

  for (let row = 0; goal && row < goal.length; row++) {
    for (let column = 0; goal[row] && column < goal[row].length; column++) {
      await wait(0.3);
      promises.push(await processGoal(row, column, goal[row][column]));
    }
  }
  console.log(promises);
};

module.exports = {
  processGoal,
  makeX,
  getMap,
  getGoalMap,
  clearPhase1,
  clearPhase2,
  createPhase2Map,
};
