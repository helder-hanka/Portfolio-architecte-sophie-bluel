import { worksFetch } from "./config.js";

export const displayworksData = async () => {
  try {
    const worksData = await worksFetch();
    document.querySelector(".gallery").innerHTML = "";
    generateworks(worksData);
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
