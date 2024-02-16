import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";
import "../assets/CSS/Subscription.css";

export default function PasswordPage(props) {
  const [token, setToken] = useState();

  useState(() => {
    if (props.token) {
      setToken(props.token);
    }
  }, []);
  const [password, setPassword] = useState();
  const onChange = (event, target) => {
    if (target === "token") {
      setToken(event.target.value);
    } else if (target === "password") {
      setPassword(event.target.value);
    }
  };

  const passwordReset = async () => {
    try {
      if (!token || !password) {
        alert("Tous les champs sont obligatoires !");
      } else {
        const { data } = await axios.post(
          "https://site--entrauteurs-backend--dzk9mdcz57cb.code.run/author/password",
          { password: password },
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        const newToken = data.token;
        Cookies.set("token", token, { expires: 30 }, { secure: true });
        props.setToken(newToken);
        alert("Votre mot de passe a bien été mis à jour");
        setToken("");
        setPassword("");
      }
    } catch (error) {
      console.log(error.message);
      alert("Un problème est survenu.");
    }
  };

  return (
    <main>
      <form>
        <h2>Changer ton mot de passe</h2>
        <section className="infos">
          <div>
            <label className="invisible" htmlFor="token">
              Clé secrète :
            </label>
            <input
              type="text"
              className="input-form"
              id="token"
              name="token"
              placeholder="Clé reçue par email"
              value={token}
              onChange={(event) => {
                onChange(event, "token");
              }}
            />
          </div>
          <p className="smallText">
            Si elle ne s'affiche pas automatiquement, tu peux nous la demander
            en utilisant le formulaire de contact ou en nous envoyant un message
            sur Discord.
          </p>
          <div>
            <label className="invisible" htmlFor="newpassword">
              Nouveau mot de passe :
            </label>
            <input
              type="text"
              className="input-form"
              id="newpassword"
              name="newpassword"
              placeholder="Nouveau mot de passe"
              value={password}
              onChange={(event) => {
                onChange(event, "password");
              }}
            />
          </div>
          <div>
            <input
              type="button"
              id="submit"
              className="submit"
              name="submit"
              value="Changer le mot de passe"
              onClick={(event) => {
                event.preventDefault();
                passwordReset();
              }}
            />
          </div>
        </section>
      </form>
    </main>
  );
}
