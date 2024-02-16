import axios from "axios";
import "../assets/CSS/admin.css";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import ChangeStatus from "../components/ChangeStatus";

export default function AuthorPage(props) {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);
  const [stories, setStories] = useState();
  const [isloading, setIsLoading] = useState(true);
  const [week, setWeek] = useState();
  const [author, setAuthor] = useState();
  const [admin, setAdmin] = useState(false);
  const [moreInfos, setMoreInfos] = useState(false);
  const [authors, setAuthors] = useState();
  const [changeStatusDisplay, setChangeStatusDisplay] = useState(false);
  const [alreadyVoted, setAlreadyVoted] = useState(false);
  const [careful, setCareful] = useState(false);

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
        setIsLoading(false);
        if (data.author.status === "Active") {
          setIsActive(true);
          setStories(data.stories);
          console.log(stories);
          if (data.author.stories_voted.length >= data.week) {
            setAlreadyVoted(true);
          }
        }
        if (data.author.account.role === "Admin") {
          setAdmin(true);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getAuthorData();
  }, [props.token]);

  useEffect(() => {
    const getAuthors = async () => {
      try {
        const { data } = await axios.get(
          "https://site--entrauteurs-backend--dzk9mdcz57cb.code.run/admin/authors",
          {
            headers: {
              authorization: `Bearer ${props.token}`,
            },
          }
        );
        setAuthors(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    getAuthors();
  }, [admin]);

  const vote = async (storyId) => {
    try {
      if (alreadyVoted) {
        alert("Tu as déjà voté pour cette semaine");
      } else {
        const { data } = await axios.post(
          `https://site--entrauteurs-backend--dzk9mdcz57cb.code.run/author/vote/${storyId}/${week}`,
          {},
          {
            headers: {
              authorization: `Bearer ${props.token}`,
            },
          }
        );
        setAlreadyVoted(true);
        alert("Ton vote a bien été pris en compte");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const getPending = async () => {
    try {
      const { data } = await axios.post(
        `https://site--entrauteurs-backend--dzk9mdcz57cb.code.run/author/update`,
        { status: "Pending" },
        {
          headers: {
            authorization: `Bearer ${props.token}`,
          },
        }
      );
      alert("Ton statut a bien été mis à jour.");
    } catch (error) {
      console.log(error.message);
    }
  };

  const newWeek = async () => {
    try {
      const didntVote = [];
      if (!careful) {
        for (let a = 0; a < authors.authors.length; a++) {
          if (authors.authors[a].status === "Active") {
            if (authors.authors[a].stories_voted.length < week) {
              didntVote.push(authors.authors[a].account.username);
            }
          }
        }
        if (didntVote.length > 0) {
          alert(
            "Des participants n'ont pas encore voté. Es-tu sûre que la semaine est bien finie ? Si oui, reclique sur le bouton."
          );
          setCareful(true);
        }
      }
      if (careful || didntVote.length === 0) {
        if (week === (authors.nbActive - 1) / 2) {
          const { data } = await axios.post(
            `https://site--entrauteurs-backend--dzk9mdcz57cb.code.run/admin/endSession`,
            {},
            {
              headers: {
                authorization: `Bearer ${props.token}`,
              },
            }
          );
          setWeek(0);
          setCareful(false);
          alert("La session est terminée.");
        } else {
          const { data } = await axios.post(
            `https://site--entrauteurs-backend--dzk9mdcz57cb.code.run/admin/week`,
            {},
            {
              headers: {
                authorization: `Bearer ${props.token}`,
              },
            }
          );
          setWeek(week + 1);
          setAlert(false);
          alert("La semaine a bien été mise à jour");
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const newSession = async () => {
    try {
      if (authors.nbRegistered % 2 === 0) {
        alert("Le nombre de participants enregistrés doit être impair");
      } else if (week > 0) {
        alert("Une session est déjà en cours !");
      } else {
        const { data } = await axios.post(
          `https://site--entrauteurs-backend--dzk9mdcz57cb.code.run/admin/newSession/`,
          {},
          {
            headers: {
              authorization: `Bearer ${props.token}`,
            },
          }
        );
        alert("La session a bien été lancée");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return props.token && isloading ? (
    <main>Page en chargement...</main>
  ) : author ? (
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

      {isActive && (
        <>
          <br />
          <section className="activeSection">
            <h2>Semaine {week}</h2>
            <div className="invisible">
              <p className="smallText">
                Tu as jusqu'à samedi soir pour consacrer une heure de lecture à
                chacune de ces histoires, et voter pour celle que tu préfères.
              </p>
              <p className="smallText">
                Attention, une fois que tu as voté, tu ne peux plus revenir en
                arrière.
              </p>
              <p className="smallText">
                Si tu ne votes pas, tu auras une pénalité de deux points.
              </p>
              <p className="smallText">
                Quand la semaine sera terminée (dimanche dans la matinée), deux
                nouvelles histoires apparaitront.
              </p>
            </div>
            <br />
            <p>Clique sur la couverture du livre pour le lire (sur wattpad).</p>
            <br />
            <div className="vote">
              {stories.map((story, index) => {
                return (
                  <div key={index}>
                    <a href={story.story_url}>
                      <img src={story.story_cover} alt={story.story_title} />
                    </a>
                    {!alreadyVoted && (
                      <button
                        onClick={() => {
                          vote(story.story_id);
                        }}
                      >
                        Voter pour {story.story_title}
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          <br />
        </>
      )}
      <br />
      <section className="profil-mainContainer">
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
                      getPending();
                    }}
                  >
                    Se réinscrire
                  </button>
                )}
              </div>
            </div>
            <button
              onClick={() => {
                navigate("/author/password");
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
                navigate("/updateStory");
              }}
            >
              Modifier l'histoire
            </button>
          </div>
        </div>
      </section>
      {admin && (
        <section className="admin-container">
          <h2 className="admin">ESPACE ADMINISTRATEUR</h2>
          <br />
          {week > 0 && (
            <div className="center">
              <button
                className="big"
                onClick={() => {
                  newWeek();
                }}
              >
                Nouvelle semaine
              </button>
              <br />
              <br />
            </div>
          )}
          {authors && (
            <p>Inscrits à la prochaine session : {authors.nbRegistered}</p>
          )}
          <br />
          <h3>Nouvelles inscriptions en attente :</h3>
          <div>
            {authors &&
              authors.authors.map((author, index) => {
                return (
                  author.status === "Pending" && (
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
                            author={author}
                            token={props.token}
                          />
                        )}
                      </div>
                    </div>
                  )
                );
              })}
          </div>

          <h3>Inscriptions validées pour la prochaine session :</h3>
          <div>
            {authors &&
              authors.authors.map((author, index) => {
                return (
                  author.status === "Registered" && (
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
                  )
                );
              })}
          </div>
          <div className="center">
            <button
              className="big"
              onClick={() => {
                newSession();
              }}
            >
              Démarrer la session
            </button>
          </div>
          <br />
          <h3>Auteurs participants à la session actuelle :</h3>
          <div>
            {authors &&
              authors.authors.map((author, index) => {
                return (
                  author.status === "Active" && (
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
                  )
                );
              })}
          </div>

          <h3>Participants inactifs :</h3>
          <div>
            {authors &&
              authors.authors.map((author, index) => {
                return (
                  author.status === "Inactive" && (
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
                  )
                );
              })}
          </div>
        </section>
      )}
      <button
        className="bigButton"
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
      Tu dois{" "}
      <button
        className="login-button"
        onClick={() => {
          navigate("/inscription");
        }}
      >
        t'inscrire
      </button>{" "}
      ou{" "}
      <button
        className="login-button"
        onClick={() => {
          props.setLoginDisplay(true);
        }}
      >
        {" "}
        te connecter
      </button>{" "}
      pour accéder à cette page.
    </main>
  );
}
