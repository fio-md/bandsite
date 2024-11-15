import { resolve } from "path";

export default {
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        shows: resolve(__dirname, "pages/shows.html"),
      },
    },
  },
};
