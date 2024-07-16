import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <div className="mt-12 lg:mt-32">
      <Outlet />
    </div>
  );
};

export default App;
