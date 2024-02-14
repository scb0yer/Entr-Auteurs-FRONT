import axios from "axios";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AuthorPage(props) {
  const navigate = useNavigate();
  const [author, setAuthor] = useState();

  useEffect(() => {
    const getAuthorData = async () => {
      try {
        const { data } = await axios.get(
          "https://site--entrauteurs-backend--dzk9mdcz57cb.code.run/author",
          {
            headers: {
              authorization: `Bearer ${props.token}`,
            },
          }
        );
        setAuthor(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    getAuthorData();
  }, [props.token]);

  return author ? (
    <main>
      <div className="profil-mainContainer">
        <div>
          <div>
            <h2>Tes informations</h2>
          </div>
          <div className="profil-container">
            <div>
              <div>Pseudo</div>
              <div>{author.account.username}</div>
            </div>
            <div>
              <div>Email</div>
              <div>{author.email}</div>
            </div>
            <div>
              <div>Rôle</div>
              <div>{author.account.role}</div>
            </div>
            <div>
              <div>Statut</div>
              <div>{author.status}</div>
            </div>
            <button
              onClick={() => {
                alert("Fonctionnalité en cours de création");
              }}
            >
              Modifier ton mot de passe
            </button>
          </div>
        </div>
        <div>
          <div className="profil-container">
            <a href={author.story_details.story_url}>
              <img
                src={author.story_details.story_cover}
                alt={author.story_details.story_title}
              />
            </a>

            <button
              onClick={() => {
                alert("Fonctionnalité en cours de création");
              }}
            >
              Changer d'histoire
            </button>
          </div>
        </div>
      </div>
      {author.status === "Inactive" && (
        <button
          onClick={() => {
            alert("Fonctionnalité en cours de création");
          }}
        >
          T'inscrire à la prochaine session
        </button>
      )}
      <button
        onClick={() => {
          props.setToken(null);
          navigate("/");
        }}
      >
        Déconnecte-toi
      </button>
    </main>
  ) : (
    <main>
      Tu dois
      <button
        onClick={() => {
          navigate("/inscription");
        }}
      >
        t'inscrire
      </button>{" "}
      ou
      <button
        onClick={() => {
          props.setLoginDisplay(true);
        }}
      >
        te connecter
      </button>
      pour accéder à cette page.
    </main>
  );
}
