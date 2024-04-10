export const worksFetch = async () => {
  try {
    const res = await fetch("http://localhost:5678/api/works");
    return await res.json();
  } catch (error) {
    return console.log(error);
  }
};

export const categoriesFetch = async () => {
  try {
    const res = await fetch("http://localhost:5678/api/categories");
    return await res.json();
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

export const deleteWorkFetch = async () => {
  return await fetch(`http://localhost:5678/api//works/${id}`);
};
