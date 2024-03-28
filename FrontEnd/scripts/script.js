import { worksFetch, categoriesFetch } from "./config.js";

export const displayworksData = async () => {
  try {
    const worksData = await worksFetch();
    const categories = await categoriesFetch();
    document.querySelector(".gallery").innerHTML = "";
    generateworks(worksData);
    document.querySelector(".works-filter").innerHTML = "";
    generateCategries(categories);
  } catch (error) {
    console.error(error);
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

const generateCategries = (categories) => {
  for (let i = 0, r = categories.length; i < r; i++) {
    const element = categories[i];

    const divWorksFilters = document.querySelector(".works-filter");
    const divElement = document.createElement("div");
    const h2Element = document.createElement("h2");
    h2Element.innerText = element.name;

    divWorksFilters.appendChild(divElement);
    divElement.appendChild(h2Element);
  }
};

const generateBtn = (worksData) => {
  //even.target.accessKey
  const btnFilter = document.querySelectorAll(".works-filter div");
  for (let i = 0, r = btnFilter.length; i < r; i++) {
    const element = btnFilter[i];
    element.addEventListener("click", (even) => {
      const worksFilter = worksData.filter(
        (work) => work.category.id === even.target.accessKey
      );
      document.querySelector(".gallery").innerHTML = "";
      generateworks(worksFilter);
    });
  }
};
