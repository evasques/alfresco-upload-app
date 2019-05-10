import { SecureStore } from 'expo';

/**
 * Adds a value to the store identified by supplied key
 */
const setAsync = async (key, value, options) => {
  await SecureStore.setItemAsync(key, value, options);
}

/**
 * Obtains a value from the store corresponding to the supplied key
 */
const getAsync = async (key, options) => {
  const value = await SecureStore.getItemAsync(key, options);
  return value;
}

/**
 * Deletes a value from the store\
 */
const deleteAsync = async (key, options) => {
  await SecureStore.deleteItemAsync(key, options);
}

export default {
  setAsync,
  getAsync,
  deleteAsync
}
