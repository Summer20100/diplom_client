import { FC } from "react";
import { useAuth } from "./store/auth";
import { useNavigate } from "react-router-dom";

const HeaderButtons: FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const roles = localStorage.getItem("roles")?.split(",");
  const username = localStorage.getItem("username");

  const handleLogout = () => {
    try {
      logout();
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.error("Ошибка при выходе из системы:", error);
    }
  };

  return (
    <div className="header-buttons">
      <span className="user-info">{username}</span>
{/*       {roles?.some(role => ["ADMIN", "CLIENT"].includes(role)) && */}
      { 
        roles?.includes("ADMIN") && roles?.includes("CLIENT") &&
          roles.map(itm => (
            <button
              key={itm}
              onClick={() => navigate(`/${itm.toLowerCase()}`)}
              className="button-action"
            >
              {itm}
            </button>
          ))
        }
      <button onClick={handleLogout} className="button-action button-logout">
        ВЫХОД
      </button>
    </div>
  );
};

export default HeaderButtons;
