import axios from "axios";

export default function ChangeStatus(props) {
  const changeStatus = async (status) => {
    try {
      console.log(props.author._id);
      console.log(status);
      console.log(props.token);
      const { data } = await axios.post(
        `https://site--entrauteurs-backend--dzk9mdcz57cb.code.run/admin/changeStatus/${props.author._id}`,
        { status: status },
        {
          headers: {
            authorization: `Bearer ${props.token}`,
          },
        }
      );
      alert("Statut mis à jour");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="menu-status">
      <button
        onClick={() => {
          props.setChangeStatusDisplay(false);
          changeStatus("Registered");
        }}
      >
        Registered
      </button>
      <button
        onClick={() => {
          props.setChangeStatusDisplay(false);
          changeStatus("Inactive");
        }}
      >
        Inactive
      </button>
      <button
        onClick={() => {
          props.setChangeStatusDisplay(false);
          changeStatus("Dismissed");
        }}
      >
        Dismissed
      </button>
      <button
        onClick={() => {
          props.setChangeStatusDisplay(false);
        }}
      >
        Keep Pending
      </button>
    </div>
  );
}
