import {
  worksFetch,
  categoriesFetch,
  loginFetch,
  deleteWorkFetch,
  postWorkFetch,
} from "./config.js";

export const displayworksData = async () => {
  try {
    const worksData = await worksFetch();
    const categories = await categoriesFetch();
    if (worksData && categories) {
      document.querySelector(".gallery").innerHTML = "";
      generateworks(worksData);
      const divWorksFilters = document.querySelector(".works-filter");
      divWorksFilters.innerHTML = "";
      const btnElement = createElement("button");
      btnElement.innerText = "Tous";
      divWorksFilters.appendChild(btnElement);
      generateCategories(categories);
      generateBtn(worksData);
    }
  } catch (error) {
    console.log(error);
  }
};

const generateworks = (elementsArr) => {
  for (let i = 0, r = elementsArr.length; i < r; i++) {
    const element = elementsArr[i];

    const divGallery = document.querySelector(".gallery");
    const figureElement = createElement("figure");
    const imgElement = createElement("img");
    imgElement.src = element.imageUrl;
    const figcaptionElement = createElement("figcaption");
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
    const divElement = createElement("div");
    const btnElement = createElement("button");
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

export const createBtnUpdateAddImg = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user && user.userId) {
    const buttomIconModalContainer = document.getElementById(
      "buttom-icon-modal-container"
    );
    const creatBtnModal = createElement("button");
    creatBtnModal.id = "openModal";
    const createI = createElement("i");
    createI.classList = "fa-regular fa-pen-to-square";
    creatBtnModal.innerText = "modifier";
    buttomIconModalContainer.insertAdjacentElement("beforeend", createI);
    buttomIconModalContainer.appendChild(creatBtnModal);
  }
};

export const callLoginform = () => {
  const loginForm = document.querySelector(".loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", async (even) => {
      even.preventDefault();
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      try {
        validateEmail(email);
        const res = await loginFetch(email, password);
        console.log(res);
        messageError(res);
        const result = await res.json();
        displayErrorMessage("");
        localStorage.setItem("user", JSON.stringify(result));
        window.location.href = "./index.html";
      } catch (error) {
        console.log("Err::: ", error);
        displayErrorMessage(error.message);
      }
    });
  }
};

const messageError = (res) => {
  if (!res.ok) {
    if (res.status === 401) {
      localStorage.clear("user");
      setTimeout(() => {
        window.location.href = "index.html";
      }, 3000);
    }
    throw new Error(res.statusText);
  }
};

const validateEmail = (email) => {
  const emailRegexp = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9._-]+");
  if (!emailRegexp.test(email)) {
    throw new Error("L'email n'est pas valide.");
  }
};

const displayErrorMessage = (msg) => {
  const classLoginForm = document.querySelector(".loginForm");
  let existingErrorMsg = document.querySelector(".errorMessage");
  if (!existingErrorMsg) {
    existingErrorMsg = createElement("span");
    const tagBr = createElement("br");
    existingErrorMsg.classList.add("errorMessage");
    classLoginForm.insertAdjacentElement("afterend", tagBr);
    classLoginForm.insertAdjacentElement("afterend", existingErrorMsg);
  }
  existingErrorMsg.innerText = msg;
};

export const displayModal = () => {
  document.addEventListener("DOMContentLoaded", () => {
    const btnModal = document.getElementById("openModal");
    const modal = documentQuerySelector(".modal");
    const body = documentQuerySelector("body");
    let btnContainerClose;
    const openModal = () => {
      fetch("modal.html")
        .then((res) => res.text())
        .then((html) => {
          modal.innerHTML = html;
          body.style.overflow = "hidden";
          btnContainerClose = documentQuerySelector(".btn-container-close");
          btnContainerClose.style.display = "block";
          const btnCloseModa = document.getElementById("close");
          btnCloseModa.addEventListener("click", closeModal);
          modal.style.display = "block";
          displayModalContents();
          const btnAddImg = document.getElementById("add-img");
          btnAddImg.addEventListener("click", openpageAddPhotoModal);
        });
    };

    const openpageAddPhotoModal = () => {
      const modalContent = documentQuerySelector(".modal-content");
      fetch("pageAddPhotoModal.html")
        .then((res) => res.text())
        .then((html) => {
          btnContainerClose.style.display = "flex";
          const btnarrowLeft = createElement("button");
          const iElement = createElement("i");
          btnarrowLeft.id = "btnarrow-left";
          iElement.classList = "fa-solid fa-arrow-left";

          btnarrowLeft.appendChild(iElement);
          btnContainerClose.appendChild(btnarrowLeft);
          btnContainerClose.insertAdjacentElement("afterbegin", btnarrowLeft);

          btnarrowLeft.addEventListener("click", openModal);
          modalContent.innerHTML = html;

          const form = documentQuerySelector(".AddImgForm");
          form.addEventListener("submit", (event) => {
            event.preventDefault();
            manageForm();
          });
        });
    };
    const closeModal = () => {
      modal.innerHTML = "";
      modal.style.display = "none";
      body.style.overflow = "";
    };
    if (btnModal) {
      btnModal.addEventListener("click", openModal);
      modal.addEventListener("click", (even) => {
        if (even.target === modal) {
          closeModal();
        }
      });
    }
  });
};

const documentQuerySelector = (element) => {
  return document.querySelector(element);
};
const documentGetElementById = (element) => {
  return documentGetElementById(element);
};
const createElement = (element) => {
  return document.createElement(element);
};

const displayModalContents = async () => {
  try {
    const dataWorks = await worksFetch();
    const imgContainer = documentQuerySelector(".img-container");
    for (let i = 0, arrl = dataWorks.length; i < arrl; i++) {
      const element = dataWorks[i];

      const figureModal = createElement("figure");
      const imgeModal = createElement("img");
      const btnModal = createElement("button");
      btnModal.accessKey = element.id;
      const iModal = createElement("i");
      iModal.classList = "fa-solid fa-trash-can";

      imgeModal.src = element.imageUrl;
      imgeModal.alt = element.title;

      figureModal.appendChild(imgeModal);
      btnModal.appendChild(iModal);
      figureModal.appendChild(btnModal);
      imgContainer.appendChild(figureModal);
      btnModal.addEventListener("click", () => deleteWork(element.id));
    }
  } catch (error) {
    displayMsgError(error.message, ".img-container");
  }
};

const displayMsgError = (msg, selector) => {
  const classLoginForm = documentQuerySelector(selector);
  let existingErrorMsg = document.querySelector(".errorMessage");
  if (!existingErrorMsg) {
    existingErrorMsg = createElement("span");
    existingErrorMsg.classList = "errorMessage";
    existingErrorMsg.innerText = msg;
    classLoginForm.appendChild(existingErrorMsg);
    return classLoginForm;
  }
  existingErrorMsg.innerText = msg;
};

const deleteWork = async (id) => {
  const { token } = JSON.parse(localStorage.getItem("user"));
  const modal = document.querySelector(".modal");
  const imgContainer = documentQuerySelector(".img-container");
  try {
    const res = await deleteWorkFetch(id, token);
    messageError(res);
    displayMsgError("", ".validate-container");
    alert("Photo supprimé");
    imgContainer.innerHTML = "";
    displayModalContents();
  } catch (error) {
    displayMsgError(error.message, ".validate-container");
  }
};

const manageForm = () => {
  try {
    const title = documentQuerySelector(".AddImgForm input").value;
    const select = documentQuerySelector(".AddImgForm select").value;
  } catch (error) {
    console.log(error);
  }
};

const ValidateInput = (value) => {
  if (value.length < 3) {
    throw new Error(`${value}: est trop court! `);
  }
};
