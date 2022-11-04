const { BASE_URL, METHODS, RETRY } = require("./constants");
const fetch = require("node-fetch");

/**
 * The base method used for all the `fetch` calls to the CrossMint API.
 * This method is set to retry up to 5 times if it fails. 
 * 
 * @param {*} entityType - The space entity used in the call (Soloon/Polyanet/Cometh)
 * @param {*} method - The HTTP method used
 * @param {*} data - the data needed in the API call
 * @param {*} extra_delay - option parameter to delay the getch call so as to not overload the CrossMint servers
 * @returns
 */
const generateFetchRetry = async (
  entityType,
  method,
  data,
  extra_delay = 0
) => {
  const delay_index = extra_delay;

  let url = BASE_URL + entityType;
  var options = {
    method: method,
    body: JSON.stringify(data),
    headers: { "Content-type": "application/json; charset=UTF-8" },
    delay: delay_index,
  };
  for (let i = 0; i < RETRY; i++) {
    try {
      console.log(
        `${method}: '${entityType}': ${JSON.stringify(
          data
        )} with delay: ${delay_index}, attempt $ ${i}`
      );
      const response = await fetch(url, options);
      return await response.json();
    } catch (err) {
      const isLastAttempt = i + 1 === RETRY;
      console.log(`Got error: ${err}, attempt # ${i}`);
      if (isLastAttempt) throw err;
    }
  }
};

/**
 * Async function building on `generateFetchRetry`, to create space entities
 * @param {*} entityType 
 * @param {*} input 
 * @param {*} extra_delay 
 * @returns 
 */
async function generateCreateFetch(entityType, input, extra_delay = 0) {
  return generateFetchRetry(entityType, METHODS.POST, input, extra_delay);
}

/**
 * Async function building on `generateFetchRetry`, to delete space entities
 * @param {*} entityType 
 * @param {*} input 
 * @param {*} extra_delay 
 * @returns 
 */
async function generateDeleteFetch(entityType, input, extra_delay = 0) {
  return generateFetchRetry(entityType, METHODS.DELETE, input, extra_delay);
}

//used only in Phase 1
async function processEntityWithMethod(entityType, method, data) {
  try {
    const response = fetch(BASE_URL + entityType, {
      method: method,
      body: JSON.stringify(data),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    });

    //if (!response.ok) {
    //  throw new Error(`HTTP error: ${response.status}`);
    //}
    const responseData = await response.json();
    console.log(responseData);
  } catch (error) {
    console.error(`Could not get products: ${error}`);
  }
}

// used only in phase 1
async function createEntity(entityType, input) {
  processEntityWithMethod(entityType, METHODS.POST, input);
}

// used only in phase 1
async function deleteEntity(entityType, input) {
  processEntityWithMethod(entityType, METHODS.DELETE, input);
}

module.exports = {
  deleteEntity,
  createEntity,
  generateCreateFetch,
  generateDeleteFetch,
};
