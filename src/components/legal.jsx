import "../assets/CSS/legal-cookies.css";
import Close from "../assets/img/design/close.svg";

const Legal = (props) => {
  return (
    <div
      className="pop-up"
      style={{
        display: props.legalDisplay === false ? "none" : "block",
      }}
    >
      <img
        onClick={() => {
          props.setLegalDisplay(false);
        }}
        src={Close}
        alt="Fermer"
        id="close"
      />
      <h2>Mentions Légales</h2>
      <p>Le présent site internet est édité et géré par Sophie Boyer.</p>
      <p>
        Contact :{" "}
        <a
          onClick={() => {
            props.setLegalDisplay(false);
          }}
          href="#contact"
        >
          Ici
        </a>
      </p>
      <p>
        Nom de l'hébergeur : <a href="https://northflank.com/">Northflank</a>
      </p>
      <br />
      <br />
      <h2>Conditions générales d'utilisation</h2>
      <p>
        L'éditeur du site se réserve le droit de modifier, à tout moment et sans
        préavis, tout ou partie des conditions générales d’utilisations de ce
        site. Les modifications entrent en vigueur et sont opposables aux
        utilisateurs dès leur mise en ligne sur le site. La présente version est
        en date du 30/12/2023.
      </p>
      <p>
        Les histoires sélectionnées dans le cadre du concours doivent respecter
        les conditions générales imposées par Wattpad. Elles peuvent contenir du
        contenu mature ou autres TW. Celles-ci n'étant pas directement hébergées
        sur le présent site, mais sur Wattpad, elles ne sauraient engager la
        responsabilité de l'éditeur du site.{" "}
      </p>
      <br />
      <h2>Loi applicable</h2>
      <p>
        Tout visiteur du site est considéré comme acceptant l’application du
        droit français. En cas de litige quant à l’interprétation ou l’exécution
        de la politique de confidentialité et des conditions générales
        d’utilisation du site.
      </p>
    </div>
  );
};

export default Legal;
