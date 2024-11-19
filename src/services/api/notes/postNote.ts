const postNote = async (body: string) => {
  const sessionId = sessionStorage.getItem("session_id");

  try {
    const response = await fetch(
      `https://challenge.surfe.com/${sessionId}/notes`,
      {
        method: "PUT",
        redirect: "follow",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    return response;
  } catch (err) {
    throw err;
  }
};

export default postNote;
