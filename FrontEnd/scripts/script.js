import { worksFetch, categoriesFetch, loginFetch } from "./config.js";

export const displayworksData = async () => {
  try {
    const worksData = await worksFetch();
    const categories = await categoriesFetch();
    document.querySelector(".gallery").innerHTML = "";
    generateworks(worksData);
    const divWorksFilters = document.querySelector(".works-filter");
    divWorksFilters.innerHTML = "";
    const btnElement = document.createElement("button");
    btnElement.innerText = "Tous";
    divWorksFilters.appendChild(btnElement);
    generateCategories(categories);
    generateBtn(worksData);
  } catch (error) {
    console.log(error);
  }
};

const generateworks = (elementsArr) => {
  for (let i = 0, r = elementsArr.length; i < r; i++) {
    const element = elementsArr[i];

    const divGallery = document.querySelector(".gallery");
    const figureElement = document.createElement("figure");
    const imgElement = document.createElement("img");
    imgElement.src = element.imageUrl;
    const figcaptionElement = document.createElement("figcaption");
    figcaptionElement.innerText = element.title;

    divGallery.appendChild(figureElement);
    figureElement.appendChild(imgElement);
    figureElement.appendChild(figcaptionElement);
  }
};

const generateCategories = (categories) => {
  for (let i = 0, r = categories.length; i < r; i++) {
    const element = categories[i];

    const divWorksFilters = document.querySelector(".works-filter");
    const divElement = document.createElement("div");
    const btnElement = document.createElement("button");
    btnElement.innerText = element.name;
    btnElement.accessKey = element.id;
    divWorksFilters.appendChild(divElement);
    divElement.appendChild(btnElement);
  }
};

const generateBtn = (worksData) => {
  const btnFilter = document.querySelectorAll(".works-filter button");
  for (let i = 0, r = btnFilter.length; i < r; i++) {
    const element = btnFilter[i];
    element.addEventListener("click", (even) => {
      const accessKey = even.target.accessKey;
      if (accessKey) {
        const worksFilter = worksData.filter((work) => {
          return work.category.id === Number(accessKey);
        });
        document.querySelector(".gallery").innerHTML = "";
        generateworks(worksFilter);
      } else {
        document.querySelector(".gallery").innerHTML = "";
        generateworks(worksData);
      }
    });
  }
};

export const callLoginform = () => {
  const loginForm = document.querySelector(".loginForm");

  loginForm.addEventListener("submit", async (even) => {
    even.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    /**
    try {
      const res = await loginFetch(email, password);
      console.log(messageError(res));
      console.log("J", res.json());
      console.log("J", await res.json().pending);
    } catch (error) {
      console.log("Error", error);
    }

    console.log("Res: ", res.json());
    try {
      const res = await loginFetch(email, password);
      console.log("Res: ", res);
    } catch (error) {
      console.log("Err::: ", error);
    }
 */
    try {
      const res = await loginFetch(email, password);
      messageError(res);
      const result = await res.json();
      localStorage.setItem(result);
      window.location.href = "./index.js";
    } catch (error) {
      console.log("Err::: ", error);
    }
  });
};

const messageError = (res) => {
  if (res.status !== 200) {
    throw new Error(`Error: ${res.statusText}, status: ${res.status}`);
  }
};

const validateEmail = (email) => {
  const emailRegexp = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9._-]+");
  if (!emailRegexp.test(email)) {
    throw new Error("L'email n'est pas valide.");
  }
};
