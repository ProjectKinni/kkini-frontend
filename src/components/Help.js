import React from "react";

const Help = () => {
    const helpTitle1 = "회원 탈퇴는 어떻게 할까요?";
    const helpContent1 = "검색창 우측 (인간 모양 아이콘) 누르고 스크롤 최하단으로 내려가면 회원탈퇴 버튼이 있습니다!";

    const helpTitle2 = "랭킹의 기준은 어떻게 되는걸까요?";
    const helpContent2 = "추후 업로드 예정";

    return (
        <div>
            <h1>도움말</h1>
            <div className="help-Detail">
                <h3>{helpTitle1}</h3>
                <div className="help-Content">{helpContent1}</div>
                <h3>{helpTitle2}</h3>
                <div className="help-Content">{helpContent2}</div>
            </div>
        </div>
    );
}

export default Help;