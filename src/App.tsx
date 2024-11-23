import { useEffect } from "react";
import HomePage from "./pages/HomePage";
import { generateGUID } from "./utils/helpers";

function App() {
  useEffect(() => {
    const session_id = sessionStorage.getItem("session_id");
    if (!session_id) {
      const newSessionId = generateGUID();
      sessionStorage.setItem("session_id", newSessionId);
    }
  }, []);

  return <HomePage />;
}

export default App;
