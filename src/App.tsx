import { ApolloProvider, useReactiveVar } from "@apollo/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { isLoggedInVar } from "./apollo";
import routes from "./routes";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Notfound from "./screens/Notfound";
import SignUp from "./screens/Signup";
import { client } from "./apollo";
import { ThemeProvider } from "styled-components";
import { darkTheme, GlobalStyles, lightTheme } from "./theme";
import { darkModeVar } from "./apollo";

function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const darkMode = useReactiveVar(darkModeVar);
  return (
    <div>
      <ApolloProvider client={client}>
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
          <GlobalStyles />
          <Router basename={process.env.PUBLIC_URL}>
            <Routes>
              <Route
                path={routes.home}
                element={isLoggedIn ? <Home /> : <Login />}
              />
              <Route
                path={routes.signUp}
                element={isLoggedIn ? <Home /> : <SignUp />}
              />
              <Route path="*" element={<Notfound />} />
            </Routes>
          </Router>
        </ThemeProvider>
      </ApolloProvider>
    </div>
  );
}

export default App;
