/* App.jsx file where the application layout is set up */

import "./App.css";
import NavigationBar from "./components/navigation/NavigationBar";
import AppRoutes from "./common/AppRoutes";

function App() {
  return (
    <div className="">
      <NavigationBar />
      <AppRoutes />
    </div>
  );
}

export default App;
