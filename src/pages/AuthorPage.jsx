import axios from "axios";
import "../assets/CSS/admin.css";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import ChangeStatus from "../components/ChangeStatus";

export default function AuthorPage(props) {
  const navigate = useNavigate();
  const [week, setWeek] = useState();
  const [author, setAuthor] = useState();
  const [admin, setAdmin] = useState(false);
  const [moreInfos, setMoreInfos] = useState(false);
  const [updatePending, setUpdatePending] = useState(false);
  const [authorsPending, setAuthorsPending] = useState();
  const [authorsRegistered, setAuthorsRegistered] = useState();
  const [updateRegistered, setUpdateRegistered] = useState(false);
  const [authorsActive, setAuthorsActive] = useState();
  const [updateActive, setUpdateActive] = useState(false);
  const [updateInactive, setUpdateInactive] = useState(false);
  const [authorsInactive, setAuthorsInactive] = useState();
  const [changeStatusDisplay, setChangeStatusDisplay] = useState(false);

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
        setAuthor(data.author);
        setWeek(data.week);
        setUpdatePending(true);
        setUpdateRegistered(true);
        setUpdateActive(true);
        setUpdateInactive(true);
      } catch (error) {
        console.log(error.message);
      }
    };
    getAuthorData();
  }, [props.token]);

  useEffect(() => {
    console.log("author >>", author);
    const getAuthorsPending = async () => {
      try {
        const { data } = await axios.get(
          "https://site--entrauteurs-backend--dzk9mdcz57cb.code.run/admin/authors/Pending",
          {
            headers: {
              authorization: `Bearer ${props.token}`,
            },
          }
        );
        setAuthorsPending(data);
        setAdmin(true);
      } catch (error) {
        console.log(error.message);
      }
    };
    getAuthorsPending();
  }, [updatePending]);

  useEffect(() => {
    console.log("author >>", author);
    const getAuthorsRegistered = async () => {
      try {
        const { data } = await axios.get(
          "https://site--entrauteurs-backend--dzk9mdcz57cb.code.run/admin/authors/Registered",
          {
            headers: {
              authorization: `Bearer ${props.token}`,
            },
          }
        );
        setAuthorsRegistered(data);
        console.log(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    getAuthorsRegistered();
  }, [updateRegistered]);

  useEffect(() => {
    console.log("author >>", author);
    const getAuthorsActive = async () => {
      try {
        const { data } = await axios.get(
          "https://site--entrauteurs-backend--dzk9mdcz57cb.code.run/admin/authors/Active",
          {
            headers: {
              authorization: `Bearer ${props.token}`,
            },
          }
        );
        setAuthorsActive(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    getAuthorsActive();
  }, [updateActive]);

  useEffect(() => {
    console.log("author >>", author);
    const getAuthorsInactive = async () => {
      try {
        const { data } = await axios.get(
          "https://site--entrauteurs-backend--dzk9mdcz57cb.code.run/admin/authors/Inactive",
          {
            headers: {
              authorization: `Bearer ${props.token}`,
            },
          }
        );
        setAuthorsInactive(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    getAuthorsInactive();
  }, [updateInactive]);

  return author ? (
    <main>
      <p>Sur ton profil, tu as accès à toutes tes informations.</p>
      {moreInfos ? (
        <p className="smallText">
          <br />
          Ton histoire peut avoir différents statuts :
          <ul>
            <li>
              <strong>Pending :</strong> En attente de validation pour la
              prochaine session.
            </li>
            <li>
              <strong>Registred :</strong> Histoire validée et inscrite pour la
              prochaine session.{" "}
            </li>
            <li>
              <strong>Active :</strong> Ton histoire est inscrite à la session
              en cours.
            </li>
            <li>
              <strong>Inactive :</strong> Histoire validée, mais session
              complète ou terminée. En cliquant sur "se réinscrire" ton statut
              redeviendra "Pending."
            </li>
            <li>
              <strong>Dismissed :</strong> Ta participation a été rejetée, soit
              parce que tu ne respectes pas les règles (inscription au serveur
              Discord notamment), soit parce que ton histoire n'est pas assez
              qualitative (orthographe, intrigue, dialogues)
            </li>
          </ul>
          <br />
          <p>
            Tu ne peux modifier les informations sur ton histoire (titre,
            couverture, lien) uniquement si ton statut est "Inactive".
          </p>
          <br />
          <p>
            Si tu as le moindre problème, n'hésite pas à nous contacter par mail
            ou sur le serveur Discord.
          </p>
          <br />
          <button
            onClick={() => {
              setMoreInfos(false);
            }}
          >
            Cacher
          </button>
        </p>
      ) : (
        <button
          onClick={() => {
            setMoreInfos(true);
          }}
        >
          Plus d'infos
        </button>
      )}
      <br />
      <br />
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
              <div>{author.account.role} </div>
            </div>
            <div>
              <div>Statut</div>
              <div>
                {author.status}{" "}
                {author.status === "Inactive" && (
                  <button
                    className="smallButton"
                    onClick={() => {
                      alert("Fonctionnalité en cours de création");
                    }}
                  >
                    Se réinscrire
                  </button>
                )}
              </div>
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
              className="smallButton"
              onClick={() => {
                alert("Fonctionnalité en cours de création");
              }}
            >
              Changer d'histoire
            </button>
          </div>
        </div>
      </div>
      {admin && (
        <div className="admin-container">
          <h2 className="admin">ESPACE ADMINISTRATEUR</h2>
          {authorsRegistered && (
            <p>Inscrits à la prochaine session : {authorsRegistered.count}</p>
          )}
          {authorsActive && (
            <p>Inscrits à la session en cours : {authorsActive.count}</p>
          )}
          <h3>Nouvelles inscriptions en attente :</h3>
          <div>
            {authorsPending &&
              authorsPending.authors.map((author, index) => {
                return (
                  <div key={index}>
                    <div>{author.account.username}</div>
                    <div>
                      <a href={author.story_details.story_url}>
                        <img
                          className="miniature"
                          src={author.story_details.story_cover}
                          alt={author.story_details.story_title}
                        />
                      </a>
                    </div>
                    <button
                      onClick={() => {
                        setChangeStatusDisplay(true);
                      }}
                    >
                      {author.status}
                    </button>
                    <div>
                      {changeStatusDisplay && (
                        <ChangeStatus
                          setChangeStatusDisplay={setChangeStatusDisplay}
                          // setUpdatePending={setUpdatePending}
                          // updatePending={updatePending}
                          // setUpdateRegistered={setUpdateRegistered}
                          // updateRegistered={updateRegistered}
                          // setUpdateInactive={setUpdateInactive}
                          // updateInactive={updateInactive}
                          author={author}
                          token={props.token}
                        />
                      )}
                    </div>
                  </div>
                );
              })}
          </div>

          <h3>Inscriptions validées pour la prochaine session :</h3>
          <div>
            {authorsRegistered &&
              authorsRegistered.authors.map((author, index) => {
                return (
                  <div key={index}>
                    <div>{author.account.username}</div>
                    <div>
                      <a href={author.story_details.story_url}>
                        <img
                          className="miniature"
                          src={author.story_details.story_cover}
                          alt={author.story_details.story_title}
                        />
                      </a>
                    </div>
                  </div>
                );
              })}
          </div>
          <div>
            <button className="large">Lancer la session</button>
          </div>

          <h3>Auteurs participants à la session actuelle :</h3>
          <div>
            {authorsActive &&
              authorsActive.authors.map((author, index) => {
                return (
                  <div key={index}>
                    <div>{author.account.username}</div>
                    <div>
                      <a href={author.story_details.story_url}>
                        <img
                          className="miniature"
                          src={author.story_details.story_cover}
                          alt={author.story_details.story_title}
                        />
                      </a>
                    </div>
                  </div>
                );
              })}
          </div>
          <div>
            <button className="large">Terminer la session</button>
          </div>

          <h3>Participants inactifs :</h3>
          <div>
            {authorsInactive &&
              authorsInactive.authors.map((author, index) => {
                return (
                  <div key={index}>
                    <div>{author.account.username}</div>
                    <div>
                      <a href={author.story_details.story_url}>
                        <img
                          className="miniature"
                          src={author.story_details.story_cover}
                          alt={author.story_details.story_title}
                        />
                      </a>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
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
