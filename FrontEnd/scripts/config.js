export const worksFetch = async () => {
  try {
    return await fetch("http://localhost:5678/api/works");
  } catch (error) {
    return console.log(error);
  }
};

export const categoriesFetch = async () => {
  try {
    return await fetch("http://localhost:5678/api/categories");
  } catch (error) {
    return console.log(error);
  }
};

export const loginFetch = async (email, password) => {
  const form = {
    email,
    password,
  };
  return await fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(form),
  });
};

export const deleteWorkFetch = async (id, token) => {
  return await fetch(`http://localhost:5678/api/works/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const postWorkFetch = async (bodyData, token) => {
  return await fetch(`http://localhost:5678/api/works`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: bodyData,
  });
};
