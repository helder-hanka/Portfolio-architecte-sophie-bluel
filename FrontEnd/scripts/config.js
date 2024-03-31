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

  // try {
  // return await fetch("http://localhost:5678/api/users/login", {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify(form),
  // });
  // // messageError(res);
  // console.log("1");
  // console.log(messageError(res));
  // console.log("2");

  // console.log("Res", res);
  // console.log("Res J", res.json());
  // messageError(res)

  return await fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(form),
  });
  // }
};

// const messageError = (res) => {
//   if (res.status !== 200) {
//     throw new Error(`Error: ${res.statusText}, status: ${res.status}`);
//   }
// };
