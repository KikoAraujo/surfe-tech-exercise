const getNotes = async (note_id?: string) => {
  const sessionId = sessionStorage.getItem("session_id");

  const queryParams = new URLSearchParams();
  if (note_id) queryParams.append("page", note_id);
  const queryString = queryParams.toString();

  try {
    const response = await fetch(
      `https://challenge.surfe.com/${sessionId}/notes${
        queryString ? `?${queryString}` : ""
      }`,
      {
        method: "GET",
        redirect: "follow",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response;
  } catch (err) {
    throw err;
  }
};

export default getNotes;
