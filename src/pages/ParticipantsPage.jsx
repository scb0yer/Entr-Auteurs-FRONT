import axios from "axios";
import { useState, useEffect } from "react";

import "../assets/CSS/ParticipantsPage.css";

export default function ParticipantsPage() {
  const [authorsRegistered, setAuthorsRegistered] = useState();
  const [authorsActive, setAuthorsActive] = useState();
  const [isloading, setIsLoading] = useState(true);

  useEffect(() => {
    const getAuthors = async () => {
      try {
        const registered = await axios.get(
          "https://site--entrauteurs-backend--dzk9mdcz57cb.code.run/authors/Registered"
        );
        setAuthorsRegistered(registered.data);
        const active = await axios.get(
          "https://site--entrauteurs-backend--dzk9mdcz57cb.code.run/authors/Active"
        );
        setAuthorsActive(active.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    getAuthors();
  }, []);

  return isloading ? (
    <main>En cours de chargement...</main>
  ) : (
    <main>
      <h2>Liste des participants inscrits pour la prochaine session.</h2>
      <br />
      <p>
        La session commencera début mai. Les inscriptions ouvriront fin
        mars/début avril. Rejoins le Discord pour ne manquer aucune info !
      </p>
      <br />
      <div className="authorsContainer">
        {authorsRegistered.authors.map((author, index) => {
          return (
            <div key={index}>
              <div>
                <strong>{author.username}</strong>
              </div>
              <div>{author.story_title}</div>
              <div>
                <a href={author.story_url} target="_blank">
                  <img src={author.story_cover} alt={author.story_title} />
                </a>
              </div>
            </div>
          );
        })}
      </div>
      <br />
      <h2>Liste des participants inscrits pour la session en cours.</h2>
      <br />
      <p>Du 3 mars au 21 avril 2024.</p>
      <br />
      <div className="authorsContainer">
        {authorsActive.authors.map((author, index) => {
          return (
            <div key={index}>
              <div>
                <strong>{author.username}</strong>
              </div>
              <div>{author.story_title}</div>
              <div>
                <a href={author.story_url} target="_blank">
                  <img src={author.story_cover} alt={author.story_title} />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
