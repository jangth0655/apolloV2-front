import { useReactiveVar } from "@apollo/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { isLoggedInVar } from "./apollo";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Notfound from "./screens/Notfound";
import SignUp from "./screens/Signup";

function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);

  return (
    <div>
      <Router basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route path="/" element={isLoggedIn ? <Home /> : <Login />} />
          <Route path="/sign-up" element={isLoggedIn ? <SignUp /> : null} />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
