import "./assets/CSS/App.css";

import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import RulesPage from "./pages/Rulespage";
import SubscriptionPage from "./pages/UpdateStoryPage";
import ParticipantsPage from "./pages/ParticipantsPage";
import AuthorPage from "./pages/AuthorPage";
import Login from "./components/login";
import Menu from "./components/Menu";
import PasswordPage from "./pages/PasswordPage";
import UpdateStoryPage from "./pages/UpdateStoryPage";

function App() {
  const [legalDisplay, setLegalDisplay] = useState(false);
  const [cookiesDisplay, setCookiesDisplay] = useState(false);
  const [loginDisplay, setLoginDisplay] = useState(false);
  const [menuDisplay, setMenuDisplay] = useState(false);
  const [token, setToken] = useState("");

  return (
    <Router>
      <Header
        legalDisplay={legalDisplay}
        cookiesDisplay={cookiesDisplay}
        loginDisplay={loginDisplay}
        setMenuDisplay={setMenuDisplay}
      />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/author/password"
          element={<PasswordPage setToken={setToken} token={token} />}
        />
        <Route path="/reglement" element={<RulesPage />} />
        <Route
          path="/inscription"
          element={<SubscriptionPage setToken={setToken} />}
        />
        <Route
          path="/updateStory"
          element={<UpdateStoryPage token={token} />}
        />
        <Route path="/participants" element={<ParticipantsPage />} />
        <Route
          path="/profil"
          element={
            <AuthorPage
              token={token}
              setToken={setToken}
              setLoginDisplay={setLoginDisplay}
            />
          }
        />
      </Routes>
      {loginDisplay && (
        <Login
          setLoginDisplay={setLoginDisplay}
          setToken={setToken}
          token={token}
        />
      )}
      {menuDisplay && <Menu setMenuDisplay={setMenuDisplay} />}
      <Footer
        legalDisplay={legalDisplay}
        setLegalDisplay={setLegalDisplay}
        cookiesDisplay={cookiesDisplay}
        setCookiesDisplay={setCookiesDisplay}
      />
    </Router>
  );
}

export default App;
