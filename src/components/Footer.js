import React from "react";

function Footer() {
    return(
        <footer className="footer">
            <div className="footer-left">
                <p>고객센터 : 010-3556-6717</p>
                <p>이메일 : dlgudtmd1022naver.com</p>
                <p>평일: 09:00 - 17:00 (점심시간 12:00 - 13:00)</p>
                <p>주말/공휴일 휴무</p>
            </div>
            <div className="footer-right">
                <p>법인명(상호) : KKINI Corp.</p>
                <p>대표자 : 이 형 승 </p>
                <p>주소 : Street, Seoul, Korea</p>
                <p>팩스 : 02-1234-5678</p>
            </div>
            <div className="footer-bottom">
                <p>© 2023 KKINI. All rights reserved.</p>
                <div className="footer-links">
                    <a href="/privacy">개인정보처리</a> | <a href="/terms">이용약관</a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;