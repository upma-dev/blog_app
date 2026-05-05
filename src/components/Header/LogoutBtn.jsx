import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../firebase/auth";
import { logout } from "../../store/authSlice";

function LogoutBtn() {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout());
    });
  };
  return (
    <button
      className="px-4 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all duration-200 font-medium"
      onClick={logoutHandler}
    >
      Logout
    </button>
  );
}

export default LogoutBtn;
