/**
 * Executes an HTTP GET request using the supplied URL and headers
 *
 * @param url the service URL that will be invoked
 * @param headers the request headers
 */
const get = async (url, headers) => {
  try {
    let response = await fetch(url, {
      method: 'GET',
      headers: headers
    });

    return response;
  } catch (error) {
    throw new Error("An error occured doing HTTP get: " + error);
  }
}

/**
 * Executes an HTTP PUT request using the supplied URL, headers and body
 *
 * @param url the service URL that will be invoked
 * @param headers the request headers
 * @param body the request body
 */
const put = async (url, headers, body) => {
  try {
    let response = await fetch(url, {
      method: 'PUT',
      headers: headers,
      body: body
    });

    return response;
  } catch (error) {
    throw new Error("An error occured doing HTTP put: " + error);
  }
}

/**
 * Executes an HTTP POST request using the supplied URL, headers and body
 *
 * @param url the service URL that will be invoked
 * @param headers the request headers
 * @param body the request body
 */
const post = async (url, headers, body) => {
  try {
    let response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: body
    });

    return response;
  } catch (error) {
    throw new Error("An error occured doing HTTP post: " + error);
  }
}

/****************************************************************************
 * Expose functions
 ***************************************************************************/

export default {
  get,
  put,
  post
}
