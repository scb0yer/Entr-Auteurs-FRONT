import "../assets/CSS/Subscription.css";
import Form from "../assets/img/design/clipboard-regular.svg";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function UpdateStoryPage(props) {
  const navigate = useNavigate();

  const [story_title, setStory_title] = useState("");
  const [story_url, setStory_url] = useState("");
  const [story_cover, setStory_cover] = useState("");

  const onChange = (event, target) => {
    if (target === "title") {
      setStory_title(event.target.value);
    } else if (target === "url") {
      setStory_url(event.target.value);
    } else if (target === "cover") {
      setStory_cover(event.target.value);
    }
  };

  const UpdateStory = async () => {
    try {
      if (!story_title || !story_url || !story_cover) {
        alert("Tous les champs sont obligatoires");
      } else {
        const { data } = await axios.post(
          "https://site--entrauteurs-backend--dzk9mdcz57cb.code.run/author/update",
          {
            story_title: story_title,
            story_url: story_url,
            story_cover: story_cover,
          },
          {
            headers: {
              authorization: `Bearer ${props.token}`,
            },
          }
        );
        alert("Ton histoire a bien été mise à jour.");
        navigate("/profil");
      }
    } catch (error) {
      console.log(error.message);
      alert("Un problème est survenu");
    }
  };

  return (
    <main>
      <form>
        <h2>
          <img src={Form} alt="formulaire" /> Mise à jour des informations de
          ton histoire
        </h2>
        <section className="infos">
          <div>
            <label className="invisible" htmlFor="titleUpdated">
              Titre de ton histoire:
            </label>
            <input
              type="text"
              id="titleUpdated"
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
            <label className="invisible" htmlFor="urlUpdated">
              Lien vers ton histoire:
            </label>
            <input
              type="url"
              id="urlUpdated"
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
            <label className="invisible" htmlFor="url-imgUpdated">
              Lien vers la couverture de ton histoire (1):
            </label>
            <input
              type="url"
              id="url-img"
              className="input-form"
              name="url-imgUpdated"
              placeholder="Lien vers la couverture de ton livre sur wattpad (avec le https://)"
              value={story_cover}
              onChange={(event) => {
                onChange(event, "cover");
              }}
            />
          </div>
          <p className="small invisible">
            (1) Tu peux retrouver ce lien en faisant un clic droit sur la
            couverture de ton livre, depuis ton compte wattpad. Le lien doit
            commencer par https://img.wattpad.com/cover/
          </p>
          <div>
            <input
              type="button"
              id="submit"
              className="submit"
              name="submit"
              value="Mettre à jour l'histoire"
              onClick={(event) => {
                event.preventDefault();
                UpdateStory();
              }}
            />
          </div>
        </section>
      </form>
    </main>
  );
}
