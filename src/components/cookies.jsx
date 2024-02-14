import "../assets/CSS/legal-cookies.css";
import Close from "../assets/img/design/close.svg";

const Cookies = (props) => {
  return (
    <div
      className="pop-up"
      style={{
        display: props.cookiesDisplay === false ? "none" : "block",
      }}
    >
      <img
        onClick={() => {
          props.setCookiesDisplay(false);
        }}
        src={Close}
        alt="Fermer"
        id="close"
      />
      <h2>Politique de Cookies</h2>
      <p>
        Le présent site internet utilise des cookies pour permettre aux
        participants de se connecter à leur espace.
      </p>
      <br />
      <h3>Concrètement un cookie, c'est quoi ?</h3>
      <br />
      <p>
        Et non, on ne parle pas des petits biscuits aux pépites de chocolat,
        mais de petits fichiers informatiques qui contiennent des informations.
        En fait, ça contient vos informations de connexion pour ne pas que vous
        ayiez à entrer votre mot de passe à chaque fois que vous rafraichissez
        la page. Ce serait super lourd avouez-le !
      </p>
      <p>
        Du coup si vous n'aimez pas les cookies, vous pouvez tout à fait les
        gérer avec votre navigateur, mais vous aurez plutôt intérêt à ne pas
        oublier votre mot de passe ! 😉
      </p>
    </div>
  );
};

export default Cookies;
