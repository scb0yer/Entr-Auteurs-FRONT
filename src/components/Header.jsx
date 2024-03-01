import logo from "../assets/img/design/Entr’auteurs.png";
import menu from "../assets/img/design/bars-solid.svg";
import "../assets/CSS/navigation.css";

import { Link } from "react-router-dom";

const Header = (props) => {
  return (
    <div className="nav">
      {props.legalDisplay
        ? document.body.classList.add("scroll-lock")
        : props.cookiesDisplay
        ? document.body.classList.add("scroll-lock")
        : props.loginDisplay
        ? document.body.classList.add("scroll-lock")
        : document.body.classList.remove("scroll-lock")}
      <Link to="/">
        <img src={logo} alt="logo" className="logo" />
      </Link>
      <div className="invisible">
        <Link to="/reglement" className="invisible">
          Règlement
        </Link>
        {/* <Link to="/inscription" className="invisible">
          Inscription
        </Link> */}
        <Link to="/participants" className="invisible">
          Participants
        </Link>
        <Link to="/profil" className="invisible">
          Profil
        </Link>
      </div>
      <div className="menu">
        <img
          src={menu}
          alt="menu"
          onClick={() => {
            props.setMenuDisplay(true);
          }}
        />
      </div>
    </div>
  );
};

export default Header;
