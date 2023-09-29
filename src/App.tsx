import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { Dashboard } from "./components/Dashboard";

function App() {
  return (
    <>
      <ToastContainer pauseOnFocusLoss={false} />
      <Dashboard />;
    </>
  );
}

export default App;
