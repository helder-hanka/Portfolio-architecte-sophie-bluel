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
  try {
    const res = await fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      bady: form,
    });
    return res.json();
  } catch (error) {
    return error;
  }
};
