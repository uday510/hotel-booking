import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./userSlice";

/**
 * Configuration object for Redux Persist.
 *
 * @typedef {Object} PersistConfig
 * @property {string} key - The key to use for storing the data in storage.
 * @property {Object} storage - The storage engine to use.
 */

/**
 * The persisted reducer for the 'user' slice.
 *
 * @type {import("redux").Reducer}
 */
const persistedReducer = persistReducer(
  /**
   * @type {PersistConfig}
   */
  {
    key: "root",
    storage,
  },
  userReducer
);

/**
 * The Redux store configured with persisted user data.
 *
 * @type {import("@reduxjs/toolkit").EnhancedStore}
 */
const store = configureStore({
  reducer: {
    user: persistedReducer,
  },
});

/**
 * The Redux persistor for the app store.
 *
 * @type {import("redux-persist").Persistor}
 */
const persistor = persistStore(store);

export { store, persistor };
  