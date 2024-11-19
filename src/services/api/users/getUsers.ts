const getUsers = async () => {
  try {
    const response = await fetch("https://challenge.surfe.com/users", {
      method: "GET",
      redirect: "follow",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response;
  } catch (err) {
    throw err;
  }
};

export default getUsers;
