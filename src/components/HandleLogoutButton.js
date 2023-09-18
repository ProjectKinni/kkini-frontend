import logout from "./Logout";

const handleLogoutButton = (navigate, setUser, setIsLiked) => async (e) => {
    e.preventDefault();
    await logout();
    setUser(null);
    navigate.go(0);
    window.location.reload();
};

export default handleLogoutButton;