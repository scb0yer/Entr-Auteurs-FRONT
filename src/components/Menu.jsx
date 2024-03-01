import { useNavigate } from "react-router-dom";

export default function Menu(props) {
  const navigate = useNavigate();
  return (
    <div
      className="burger-menu"
      onClick={() => {
        props.setMenuDisplay(false);
      }}
    >
      <div>
        <button
          onClick={() => {
            navigate("/profil");
            props.setMenuDisplay(false);
          }}
        >
          Profil
        </button>
        <button
          onClick={() => {
            navigate("/reglement");
            props.setMenuDisplay(false);
          }}
        >
          Règlement
        </button>
        <button
          onClick={() => {
            alert("Les inscriptions sont momentanéments fermées.");
            props.setMenuDisplay(false);
          }}
        >
          Inscription
        </button>
        <button
          onClick={() => {
            navigate("/participants");
            props.setMenuDisplay(false);
          }}
        >
          Participants
        </button>
      </div>
    </div>
  );
}
