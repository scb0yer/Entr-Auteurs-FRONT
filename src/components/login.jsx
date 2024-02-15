import "../assets/CSS/login.css";
import Close from "../assets/img/design/close.svg";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

const Login = (props) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChange = (event, target) => {
    if (target === "email") {
      setEmail(event.target.value);
    } else if (target === "password") {
      setPassword(event.target.value);
    }
  };

  const login = async () => {
    try {
      const { data } = await axios.post(
        "https://site--entrauteurs-backend--dzk9mdcz57cb.code.run/author/login",
        {
          email: email,
          password: password,
        }
      );
      props.setLoginDisplay(false);
      const token = data.token;
      Cookies.set("token", token, { expires: 30 }, { secure: true });
      props.setToken(token);
    } catch (error) {
      console.log(error.message);
      alert(
        "Mauvais identifiants. Veuillez rentrer l'adresse email avec laquelle vous vous êtes inscrit(e)."
      );
    }
  };

  return (
    <div className="pop-up">
      <form>
        <img
          onClick={() => {
            props.setLoginDisplay(false);
          }}
          src={Close}
          alt="Fermer"
          id="close"
        />
        <h2>Connecte-toi à ton espace :</h2>
        <div>
          <div>
            <label>
              Adresse email :
              <input
                type="email"
                className="input-form"
                name="email"
                placeholder="Ton adresse email"
                value={email}
                onChange={(event) => {
                  onChange(event, "email");
                }}
              />
            </label>
          </div>
          <div>
            <label>
              Mot de passe :
              <input
                type="password"
                className="input-form"
                name="password"
                placeholder="Ton mot de passe"
                value={password}
                onChange={(event) => {
                  onChange(event, "password");
                }}
              />
            </label>
          </div>
          <div>
            <input
              type="button"
              className="submit"
              name="submit"
              value="Se connecter"
              onClick={(event) => {
                event.preventDefault();
                login();
              }}
            />
          </div>
          <div>
            <input
              type="button"
              className="submit"
              name="submit2"
              value="Mot de passe oublié ?"
              onClick={(event) => {
                navigate("/author/password");
                props.setLoginDisplay(false);
              }}
            />
          </div>
        </div>
      </form>
    </div>
  );
};
export default Login;
