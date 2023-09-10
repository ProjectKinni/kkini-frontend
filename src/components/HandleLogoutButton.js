import logout from "./Logout";

const handleLogoutButton = (navigate, setUser) => async (e) => {
    e.preventDefault();
    await logout();
    setUser(null);
    navigate('/');
};

export default handleLogoutButton;