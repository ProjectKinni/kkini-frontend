// eslint-disable-next-line no-unused-vars
import React from "react";

function handleNicknameChange(e, setNewNickname, setIsNicknameAvailable) {
    setNewNickname(e.target.value);
    setIsNicknameAvailable(true);
}

export default handleNicknameChange;