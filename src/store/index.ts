import Vue from "vue";
import Vuex from "vuex";
import VuexPersist from "vuex-persist";

import Crypto from "crypto-js";
import Cookie from "js-cookie";
import { v4 as uuidv4 } from "uuid";

import auth from "./modules/auth-module";

Vue.use(Vuex);

const COOKIE_NAME = "cookieName";

const STORAGE_KEY = "storage";

// Get the encryption token from cookie or generate a new one.
const encryptionToken = Cookie.get(COOKIE_NAME) || uuidv4();

// Store the encryption token in a secure cookie.
Cookie.set(COOKIE_NAME, encryptionToken, { secure: true, expires: 180 });

const vuexLocal = new VuexPersist({
  key: "vuex", // The key to store the state on in the storage provider.
  // storage: window.localStorage, // or window.sessionStorage or localForage
  // Function that passes the state and returns the state with only the objects you want to store.
  // reducer: state => state,
  // Function that passes a mutation and lets you decide if it should update the state in localStorage.
  // filter: mutation => (true)
  storage: {
    getItem() {
      // Get the store from local storage.
      const store = window.localStorage.getItem(STORAGE_KEY);

      if (store) {
        try {
          // Decrypt the store retrieved from local storage
          // using our encryption token stored in cookies.
          const bytes = Crypto.AES.decrypt(store, encryptionToken);

          return JSON.parse(bytes.toString(Crypto.enc.Utf8));
        } catch (e) {
          // The store will be reset if decryption fails.
          window.localStorage.removeItem(STORAGE_KEY);
        }
      }

      return null;
    },
    setItem(_key, value) {
      // Encrypt the store using our encryption token stored in cookies.
      const store = Crypto.AES.encrypt(value, encryptionToken).toString();

      // Save the encrypted store in local storage.
      window.localStorage.setItem(STORAGE_KEY, store);
      return value;
    },
    removeItem: () => window.localStorage.removeItem(STORAGE_KEY),
    clear() {
      return;
    },
    length,
    key: () => STORAGE_KEY,
  },
});

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: { auth },
  plugins: [vuexLocal.plugin],
});
