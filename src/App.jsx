import "./assets/CSS/App.css";

import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/footer";
import HomePage from "./pages/HomePage";
import RulesPage from "./pages/Rulespage";
import SubscriptionPage from "./pages/SubscriptionPage";
import ParticipantsPage from "./pages/ParticipantsPage";
import AuthorPage from "./pages/AuthorPage";
import Login from "./components/login";

function App() {
  const [legalDisplay, setLegalDisplay] = useState(false);
  const [cookiesDisplay, setCookiesDisplay] = useState(false);
  const [loginDisplay, setLoginDisplay] = useState(false);
  const [token, setToken] = useState("");

  return (
    <Router>
      <Header
        legalDisplay={legalDisplay}
        cookiesDisplay={cookiesDisplay}
        loginDisplay={loginDisplay}
      />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/reglement" element={<RulesPage />} />
        <Route
          path="/inscription"
          element={<SubscriptionPage setToken={setToken} />}
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
