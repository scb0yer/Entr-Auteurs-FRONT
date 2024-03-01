import axios from "axios";
import { useState, useEffect } from "react";

import "../assets/CSS/ParticipantsPage.css";

export default function ParticipantsPage() {
  const [authorsRegistered, setAuthorsRegistered] = useState();
  const [isloading, setIsLoading] = useState(true);

  useEffect(() => {
    const getAuthorsRegistered = async () => {
      try {
        const { data } = await axios.get(
          "https://site--entrauteurs-backend--dzk9mdcz57cb.code.run/authors/Registered"
        );
        setAuthorsRegistered(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    getAuthorsRegistered();
  }, []);

  return isloading ? (
    <main>En cours de chargement...</main>
  ) : (
    <main>
      <h2>Liste des participants inscrits pour la prochaine session.</h2>
      <br />
      <p>
        Du 3 mars au 21 avril 2024 : inscriptions momentanément fermées pour la
        prochaine session.
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
    </main>
  );
}
