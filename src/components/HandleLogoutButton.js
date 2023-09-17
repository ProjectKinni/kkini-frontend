import logout from "./Logout";

const handleLogoutButton = (navigate, setUser, setIsLiked) => async (e) => {
    e.preventDefault();
    await logout();
    setUser(null);
    navigate('/');
    setIsLiked(false);
    window.location.reload();
};

export default handleLogoutButton;