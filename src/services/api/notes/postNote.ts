const postNote = async (body: string) => {
  const sessionId = sessionStorage.getItem("session_id");

  try {
    const response = await fetch(
      `https://challenge.surfe.com/3519195728961111/notes`,
      {
        method: "POST",
        redirect: "follow",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ body: body }),
      }
    );

    return response;
  } catch (err) {
    throw err;
  }
};

export default postNote;
