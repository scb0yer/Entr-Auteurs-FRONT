import "../assets/CSS/Subscription.css";
import Form from "../assets/img/design/clipboard-regular.svg";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

export default function SubscriptionPage(props) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [story_title, setStory_title] = useState("");
  const [story_url, setStory_url] = useState("");
  const [story_cover, setStory_cover] = useState("");
  const [password, setPassword] = useState("");
  const [key, setKey] = useState("");
  const [adult, setAdult] = useState(false);
  const [copyrights, setCopyrights] = useState(false);
  const [engagement, setEngagement] = useState(false);

  const onChange = (event, target) => {
    if (target === "email") {
      setEmail(event.target.value);
    } else if (target === "username") {
      setUsername(event.target.value);
    } else if (target === "title") {
      setStory_title(event.target.value);
    } else if (target === "url") {
      setStory_url(event.target.value);
    } else if (target === "cover") {
      setStory_cover(event.target.value);
    } else if (target === "password") {
      setPassword(event.target.value);
    } else if (target === "key") {
      setKey(event.target.value);
    }
  };

  const SignUp = async () => {
    try {
      if (
        !email ||
        !password ||
        !username ||
        !story_title ||
        !story_url ||
        !story_cover
      ) {
        alert("Tous les champs sont obligatoires");
      } else if (!adult || !copyrights || !engagement) {
        alert(
          "Tu dois être majeur, être l'auteur de ton histoire et en détenir les droits, et t'engager à respecter les règles pour t'inscrire."
        );
      } else if (password.length < 8) {
        alert("Le mot de passe doit faire au moins 8 caractères");
      } else if (
        story_cover.slice(0, 30) !== "https://img.wattpad.com/cover/"
      ) {
        alert(
          "Tu dois mettre l'adresse de l'image de ta couverture dans `Lien vers la couverture de ton image`. Tu peux la retrouver dans ton espace, en faisant un clic-droit sur ton image et ouvrir dans un nouvel onglet. Tu n'as plus qu'à copier l'adresse."
        );
      } else if (story_url.slice(0, 30) !== "https://www.wattpad.com/story/") {
        alert(
          "L'adresse de ton histoire doit commencer par `https://www.wattpad.com/story/`."
        );
      } else {
        const role = "Auteur";
        const status = "Pending";
        const { data } = await axios.post(
          "https://site--entrauteurs-backend--dzk9mdcz57cb.code.run/author/signup",
          {
            email: email,
            password: password,
            username: username,
            role: role,
            status: status,
            story_title: story_title,
            story_url: story_url,
            story_cover: story_cover,
          }
        );
        alert("Ton compte a bien été créé.");
        const token = data.token;
        Cookies.set("token", token, { expires: 30 }, { secure: true });
        props.setToken(token);
        navigate("/");
      }
    } catch (error) {
      console.log(error.message);
      alert("Un compte existe déjà avec cette adresse email");
    }
  };

  return (
    <main>
      <form>
        <h2>
          <img src={Form} alt="formulaire" /> Formulaire d'inscription
        </h2>
        <section>
          <div>
            <input
              type="checkbox"
              id="majority"
              name="majority"
              onClick={() => {
                setAdult(!adult);
              }}
            />
            <label htmlFor="majority">Je déclare avoir plus de 18 ans.</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="copyrights"
              name="copyrights"
              onClick={() => {
                setCopyrights(!copyrights);
              }}
            />
            <label htmlFor="copyrights">
              Je déclare être l'auteur de l'histoire que j'inscris à ce
              concours, et en détenir tous les droits.
            </label>
          </div>
          <div>
            <input
              type="checkbox"
              id="engagement"
              name="engagement"
              onClick={() => {
                setEngagement(!engagement);
              }}
            />
            <label htmlFor="engagement">
              En m'inscrivant à ce concours, je m'engage à consacrer une heure
              par semaine à la lecture de chacune des deux histoires que j'ai
              tirées au sort, et à voter pour celle que je préfère, pendant
              toute la durée du concours.
            </label>
          </div>
        </section>
        <section className="infos">
          <div>
            <label className="invisible" htmlFor="email1">
              Adresse email :
            </label>
            <input
              type="email"
              className="input-form"
              id="email1"
              name="email1"
              placeholder="Ton adresse email"
              value={email}
              onChange={(event) => {
                onChange(event, "email");
              }}
            />
          </div>
          <div>
            <label className="invisible" htmlFor="pseudo">
              Pseudo sur Wattpad :
            </label>
            <input
              type="text"
              id="pseudo"
              className="input-form"
              name="pseudo"
              placeholder="Ton pseudo sur Wattpad (après le @)"
              value={username}
              onChange={(event) => {
                onChange(event, "username");
              }}
            />
          </div>
          <div>
            <label className="invisible" htmlFor="title">
              Titre de ton histoire:
            </label>
            <input
              type="text"
              id="title"
              className="input-form"
              name="title"
              placeholder="Le titre de ton histoire sur Wattpad"
              value={story_title}
              onChange={(event) => {
                onChange(event, "title");
              }}
            />
          </div>
          <div>
            <label className="invisible" htmlFor="url">
              Lien vers ton histoire:
            </label>
            <input
              type="url"
              id="url"
              className="input-form"
              name="url"
              placeholder="Le lien vers le résumé de ton livre sur wattpad (avec le https://)"
              value={story_url}
              onChange={(event) => {
                onChange(event, "url");
              }}
            />
          </div>
          <div>
            <label className="invisible" htmlFor="url-img">
              Lien vers la couverture de ton histoire (1):
            </label>
            <input
              type="url"
              id="url-img"
              className="input-form"
              name="url-img"
              placeholder="Lien vers la couverture de ton livre sur wattpad (avec le https://)"
              value={story_cover}
              onChange={(event) => {
                onChange(event, "cover");
              }}
            />
          </div>
          <div>
            <label className="invisible" htmlFor="password1">
              Mot de passe :
            </label>
            <input
              type="password"
              className="input-form"
              id="password"
              name="password"
              placeholder="Mot de passe (différent de celui de ton compte)"
              value={password}
              onChange={(event) => {
                onChange(event, "password");
              }}
            />
          </div>
          <p className="small invisible">
            (1) Tu peux retrouver ce lien en faisant un clic droit sur la
            couverture de ton livre, depuis ton compte wattpad. Le lien doit
            commencer par https://img.wattpad.com/cover/
          </p>
          <br />
          <div>
            <label className="invisible" htmlFor="key">
              Clé "secrète" pour s'inscrire (sans majuscule, ni guillemets) :
            </label>
            <input
              type="text"
              id="key"
              className="input-form"
              name="key"
              placeholder="Clé à retrouver dans le règlement"
              value={key}
              onChange={(event) => {
                onChange(event, "key");
              }}
            />
          </div>
          {/* <div>
            <label>
              {" "}
              Date de Naissance :{" "}
              <div className="birthday">
                <select name="day" id="day-select">
                  <option value="">--Jour--</option>
                  <option value="01">1</option>
                  <option value="02">2</option>
                  <option value="03">3</option>
                  <option value="04">4</option>
                  <option value="05">5</option>
                  <option value="06">6</option>
                  <option value="07">7</option>
                  <option value="08">8</option>
                  <option value="09">9</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                  <option value="13">13</option>
                  <option value="14">14</option>
                  <option value="15">15</option>
                  <option value="16">16</option>
                  <option value="17">17</option>
                  <option value="18">18</option>
                  <option value="19">19</option>
                  <option value="20">20</option>
                  <option value="21">21</option>
                  <option value="22">22</option>
                  <option value="23">23</option>
                  <option value="24">24</option>
                  <option value="25">25</option>
                  <option value="26">26</option>
                  <option value="27">27</option>
                  <option value="28">28</option>
                  <option value="29">29</option>
                  <option value="30">30</option>
                  <option value="31">31</option>
                </select>
                <select name="month" id="month-select">
                  <option value="">--Mois--</option>
                  <option value="01">Janvier</option>
                  <option value="02">Février</option>
                  <option value="03">Mars</option>
                  <option value="04">Avril</option>
                  <option value="05">Mai</option>
                  <option value="06">Juin</option>
                  <option value="07">Juillet</option>
                  <option value="08">Août</option>
                  <option value="09">Septembre</option>
                  <option value="10">Octobre</option>
                  <option value="11">Novembre</option>
                  <option value="12">Décembre</option>
                </select>
                <input type="text" placeholder="Année" />
              </div>
            </label>
          </div> */}
          <div>
            <input
              type="button"
              id="submit"
              className="submit"
              name="submit"
              value="S'inscrire"
              onClick={(event) => {
                event.preventDefault();
                key !== "concours"
                  ? alert("Tu dois lire le règlement pour trouver la clé.")
                  : SignUp();
              }}
            />
          </div>
        </section>
      </form>
    </main>
  );
}
