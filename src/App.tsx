import { useEffect } from "react";
import HomePage from "./pages/HomePage";

function App() {
  useEffect(() => {
    const session_id = sessionStorage.getItem("session_id");
    if (!session_id) {
      sessionStorage.setItem("session_id", "3519195728961111");
    }
  }, []);

  return (
    <div className="h-screen">
      <HomePage />
    </div>
  );
}

export default App;
