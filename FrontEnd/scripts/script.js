import {
  worksFetch,
  categoriesFetch,
  loginFetch,
  deleteWorkFetch,
  postWorkFetch,
} from "./config.js";

export const displayworksData = async () => {
  const divGallery = document.querySelector(".gallery");
  const worksFilter = document.querySelector(".works-filter");
  try {
    const worksData = await worksFetch();
    const newWorkData = await worksData.json();
    messageError(worksData);
    const categories = await categoriesFetch();
    messageError(categories);

    if (divGallery && worksData.ok && categories.ok) {
      divGallery.innerHTML = "";
      worksFilter.innerHTML = "";
      generateworks(newWorkData);
      const divWorksFilters = document.querySelector(".works-filter");
      divWorksFilters.appendChild(
        createBtn("button", "category-actived", "Tous")
      );
      generateCategories(await categories.json());
      generateBtn(newWorkData);
      logout();
      verifyConnection();
    }
  } catch (error) {
    displayMsgError(error.message, ".gallery");
  }
};

const createBtn = (name, id, value) => {
  const btnElement = createElement(name);
  btnElement.id = id;
  btnElement.innerText = value;
  return btnElement;
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

      btnFilter.forEach((btn) => {
        btn.removeAttribute("id");
      });
      element.id = "category-actived";

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
  const buttomIconModalContainer = document.getElementById(
    "buttom-icon-modal-container"
  );
  if (buttomIconModalContainer && user && user.userId) {
    const creatBtnModal = createElement("button");
    creatBtnModal.id = "openModal";
    const createI = createElement("i");
    createI.classList = "fa-regular fa-pen-to-square";
    creatBtnModal.innerText = "modifier";
    buttomIconModalContainer.style.display = "block";
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
        messageError(res, true);
        const result = await res.json();
        displayErrorMessage("");
        localStorage.setItem("user", JSON.stringify(result));
        window.location.href = "./index.html";
      } catch (error) {
        displayErrorMessage(error.message);
      }
    });
  }
};
const logout = () => {
  const btnLogout = document.querySelector(".btn-logout");
  btnLogout.addEventListener("click", function () {
    clearLocalStorage();
  });
};
const displayHidBtnLoginLogout = (btnLoginDisplay, btnLogoutDisplay) => {
  const btnLogin = document.querySelector(".login");
  const btnLogout = document.querySelector(".logout");
  btnLogin.style.display = btnLoginDisplay;
  btnLogout.style.display = btnLogoutDisplay;
};
const clearLocalStorage = () => {
  localStorage.clear("user");
  window.location.href = "index.html";
};

const getLocalStorage = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    user && {
      userId: user.userId,
      token: user.token,
    }
  );
};
const verifyConnection = () => {
  const userIdToken = getLocalStorage();
  userIdToken
    ? displayHidBtnLoginLogout("none", "block")
    : displayHidBtnLoginLogout("block", "none");
};

const messageError = (res, isLoogin) => {
  if (!res.ok) {
    if (res.status === 401) {
      localStorage.clear("user");
      !isLoogin &&
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

let isWorkDelete = false;

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

          onChangeAddForm();

          const form = documentQuerySelector(".AddImgForm");
          form.addEventListener("submit", async (event) => {
            event.preventDefault();
            manageForm();
          });
        });
    };
    const closeModal = () => {
      modal.innerHTML = "";
      modal.style.display = "none";
      body.style.overflow = "";
      isWorkDelete && window.location.reload();
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
    const newDataWorks = await dataWorks.json();
    const imgContainer = documentQuerySelector(".img-container");
    for (let i = 0, arrl = newDataWorks.length; i < arrl; i++) {
      const element = newDataWorks[i];

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
    const brElement = createElement("br");
    existingErrorMsg.classList = "errorMessage";
    existingErrorMsg.innerText = msg;
    classLoginForm.appendChild(brElement);
    classLoginForm.appendChild(existingErrorMsg);
    return classLoginForm;
  }
  existingErrorMsg.innerText = msg;
};

const deleteWork = async (id) => {
  const { token } = JSON.parse(localStorage.getItem("user"));
  const imgContainer = documentQuerySelector(".img-container");
  try {
    const res = await deleteWorkFetch(id, token);
    messageError(res);
    displayMsgError("", ".validate-container");
    isWorkDelete = true;
    alert("Photo supprimé");
    imgContainer.innerHTML = "";
    displayModalContents();
  } catch (error) {
    displayMsgError(error.message, ".validate-container");
  }
};

const manageForm = async () => {
  const { token } = JSON.parse(localStorage.getItem("user"));
  let title = documentQuerySelector(".AddImgForm input[name='title']");
  let categorySelect = document.getElementById("category");
  let img = document.querySelector(".AddImgForm input[name='imgBtn']");

  const formData = new FormData();
  formData.append("title", title.value);
  formData.append("category", categorySelect.value);
  formData.append("image", img.files[0]);
  try {
    const res = await postWorkFetch(formData, token);
    messageError(res);
    alert(`Projet ${res.statusText}`);

    title.value = "";
    categorySelect.value = "";
    img.value = "";

    displayIconBtnAddPhotoModal();
    hidePreviewImgPhotoModal();
    displayworksData();
  } catch (error) {
    displayMsgError(error.message, ".validate-container");
  }
};
const onChangeAddForm = () => {
  const btnValidate = documentQuerySelector(".AddImgForm #validate");
  const imgInput = document.querySelector(".AddImgForm input[name='imgBtn']");
  const titleInput = document.querySelector(".AddImgForm input[name='title']");
  const categorySelect = document.getElementById("category");

  imgInput.addEventListener("change", (event) => {
    try {
      validateImg(event);
      isValidInputsElements();
    } catch (error) {
      isErrorInputsElements(error);
    }
  });
  categorySelect.addEventListener("change", () => {
    try {
      isValidInputsElements();
    } catch (error) {
      isErrorInputsElements(error);
    }
  });

  titleInput.addEventListener("keydown", () => {
    try {
      isValidInputsElements();
    } catch (error) {
      isErrorInputsElements(error);
    }
  });
  titleInput.addEventListener("change", () => {
    try {
      isValidInputsElements();
    } catch (error) {
      isErrorInputsElements(error);
    }
  });

  const isValidInputsElements = () => {
    validateForm();

    btnValidate.disabled = !validateForm();
    btnValidate.style.backgroundColor = "#1d6154";
    displayMsgError("", ".validate-container");
  };

  const isErrorInputsElements = (error) => {
    btnValidate.disabled = true;
    btnValidate.style.backgroundColor = "";
    displayMsgError(error.message, ".validate-container");
  };
};

const validateImg = (event) => {
  let imgElement = documentQuerySelector("#preview-img img");
  const file = event.target.files[0];
  const imageType = ["image/jpeg", "image/png"];
  if (!imageType.some((imgT) => imgT === file.type)) {
    throw new Error(`${file.type}: n'est pas valide`);
  }
  vérifyFileSize(file.size);
  const reader = new FileReader();
  reader.onload = function (e) {
    const preview = document.getElementById("preview-img");
    const iconBtnAdd = document.querySelector(".icon-btn-add");
    document.querySelector(".icon-btn-add i").style.display = "none";
    document.querySelector(".icon-btn-add p").style.display = "none";
    document.querySelector(".icon-btn-add label").style.height = "100%";
    preview.style.display = "block";
    iconBtnAdd.style.opacity = "0";

    if (imgElement) {
      imgElement.src = "";
      imgElement.alt = "";
    } else {
      imgElement = document.createElement("img");
    }
    imgElement.src = e.target.result;
    imgElement.alt = file.name;
    preview.appendChild(imgElement);
  };
  reader.readAsDataURL(file);
};

const vérifyFileSize = (size) => {
  const maxSize = 4 * 1024 * 1024;

  if (size > maxSize) {
    throw new Error("La taille du fichier est trop grande !");
  }
};

function validateForm() {
  const titleInput = document.querySelector(".AddImgForm input[name='title']");
  const categorySelect = document.getElementById("category");
  const imgInput = document.querySelector(".AddImgForm input[name='imgBtn']");

  if (titleInput.value.trim().length < 3) {
    throw new Error("Le champ titre ne peut pas être vide");
  }

  if (categorySelect.value === "") {
    throw new Error("Veuillez sélectionner une catégorie");
  }
  if (!imgInput.files.length) {
    throw new Error("Veuillez sélectionner une une image");
  }

  return true;
}

const displayIconBtnAddPhotoModal = () => {
  const iconBtnAdd = document.querySelector(".icon-btn-add");
  document.querySelector(".icon-btn-add i").style.display = "block";
  document.querySelector(".icon-btn-add p").style.display = "block";
  document.querySelector(".icon-btn-add label").style.height = "auto";
  iconBtnAdd.style.opacity = "1";
};

const hidePreviewImgPhotoModal = () => {
  let imgElement = documentQuerySelector("#preview-img img");
  const preview = document.getElementById("preview-img");
  imgElement.src = "";
  preview.style.display = "none";
};
