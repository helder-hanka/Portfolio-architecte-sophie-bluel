import { worksFetch } from "./config.js";

(async () => {
  try {
    const worksData = await worksFetch();
    console.log(worksData);
  } catch (error) {
    console.error(error);
  }
})();
