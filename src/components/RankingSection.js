import React from "react";

function RankingSection() {
    return(
        <div className="ranking-section">
            <section className="ranking-kkini-ranking">
                <h2>끼니 PICK</h2>
                <p>끼니의 친구가 되어, 나를 위한 상품들을 만나보세요!</p>
                <div className="ranking-images">
                    {/* ... (랭킹 이미지 코드) */}
                </div>
            </section>

            <section className="ranking-kkini">
                <h2>끼니 랭킹</h2>
                <p>현재 인기만점 제품</p>
                <div className="ranking-images">
                    {/* ... (랭킹 이미지 코드) */}
                </div>
            </section>

            <section className="ranking-kkini-green">
                <h2>끼니 그린 랭킹</h2>
                <p>간편하고, 건강하게!</p>
                <div className="ranking-images">
                    {/* ... (랭킹 이미지 코드) */}
                </div>
            </section>
        </div>
    );
}

export default RankingSection;