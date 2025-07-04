import { useLocation } from "react-router-dom";

import AddToCart from "./Components/AddToCart/AddToCart";
import Navbar from "./Components/Navbar/navbar";
import RoutingComponent from "./Components/Routing/RoutingComponent";

const App = () => {
  const location = useLocation().pathname;
  return (
    <div>
      {location !== "/login" && <Navbar />}
      <RoutingComponent />
      <AddToCart />
    </div>
  );
};

export default App;
