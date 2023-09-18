// import LikedProductItem from "./LikedProductItem";
//
// function LikedProductList({ likedProducts, handleRemoveClick }) {
//     return (
//         <div>
//             <h2>찜 목록</h2>
//             {likedProducts.length === 0 ? (
//                 <p>현재 찜한 상품이 없습니다.</p>
//             ) : (
//                 <ul>
//                     {likedProducts.map((productLike) => (
//                         <LikedProductItem key={`${productLike.product.productId}-${productLike.users.userId}`} productLike={productLike} handleRemoveClick={handleRemoveClick} />
//                     ))}
//                 </ul>
//             )}
//         </div>
//     );
// }
//
// export default LikedProductList;

import React, { useState } from 'react';
import LikedProductItem from "./LikedProductItem";

function LikedProductList({ likedProducts, handleRemoveClick }) {
    const [visibleItems, setVisibleItems] = useState(5);
    const [showAllItems, setShowAllItems] = useState(false);

    // const handleShowMore = () => {
    //     setVisibleItems(prevVisibleItems => prevVisibleItems + 5);
    // };
    const handleShowMore = () => {
        setVisibleItems(prevVisibleItems => Math.min(prevVisibleItems + 5, likedProducts.length));
    };

    const handleCollapse = () => {
        setVisibleItems(5);
        setShowAllItems(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // return (
    //     <div>
    //         <h2>찜한 상품 목록</h2>
    //         {likedProducts.slice(0, visibleItems).map((productLike) => (
    //             // 각각의 상품 아이템 렌더링
    //             <LikedProductItem key={`${productLike.product.productId}-${productLike.users.userId}`} productLike={productLike} handleRemoveClick={handleRemoveClick} />
    //         ))}
    //         {!showAllItems && visibleItems < likedProducts.length && (
    //             <button onClick={handleShowMore}>더 보기</button>
    //         )}
    //         {showAllItems && (
    //             <button onClick={handleCollapse}>접기</button>
    //         )}
    //     </div>
    // );
    // return (
    //     <div>
    //         <h2>찜한 상품 목록</h2>
    //         {likedProducts.slice(0, visibleItems).map((productLike) => (
    //             // 각각의 상품 아이템 렌더링
    //             <LikedProductItem key={`${productLike.product.productId}-${productLike.users.userId}`} productLike={productLike} handleRemoveClick={handleRemoveClick} />
    //         ))}
    //         {!showAllItems && visibleItems < likedProducts.length && (
    //             <button onClick={handleShowMore}>더 보기</button>
    //         )}
    //         {/*{!showAllItems && visibleItems > 5 && (*/}
    //         {/*    <button onClick={handleCollapse}>접기</button>*/}
    //         {/*)}*/}
    //         {visibleItems >= likedProducts.length && showAllItems && (
    //             <button onClick={handleCollapse}>접기</button>
    //         )}
    //     </div>
    // );
    // return (
    //     <div>
    //         <h2>찜한 상품 목록</h2>
    //         {likedProducts.slice(0, visibleItems).map((productLike) => (
    //             // 각각의 상품 아이템 렌더링
    //             <LikedProductItem key={`${productLike.product.productId}-${productLike.users.userId}`} productLike={productLike} handleRemoveClick={handleRemoveClick} />
    //         ))}
    //         {!showAllItems && visibleItems > 5 && (
    //             <button onClick={handleCollapse}>접기</button>
    //         )}
    //         {!showAllItems && visibleItems < likedProducts.length && (
    //             <button onClick={handleShowMore}>더 보기</button>
    //         )}
    //     </div>
    // );
    // return (
    //     <div>
    //         <h2>찜한 상품 목록</h2>
    //         {likedProducts.slice(0, visibleItems).map((productLike) => (
    //             // 각각의 상품 아이템 렌더링
    //             <LikedProductItem key={`${productLike.product.productId}-${productLike.users.userId}`} productLike={productLike} handleRemoveClick={handleRemoveClick} />
    //         ))}
    //         {!showAllItems && visibleItems < likedProducts.length && (
    //             <button onClick={handleShowMore}>더 보기</button>
    //         )}
    //         {visibleItems >= likedProducts.length && visibleItems > 5 && (
    //             <button onClick={handleCollapse}>접기</button>
    //         )}
    //     </div>
    // );
    return (
        <div>
            <h2>찜한 상품 목록</h2>
            {likedProducts.length === 0 ? (
                <p>현재 찜한 상품이 없습니다.</p>
            ) : (
                <>
                    {likedProducts.slice(0, visibleItems).map((productLike) => (
                        // 각각의 상품 아이템 렌더링
                        <LikedProductItem key={`${productLike.product.productId}-${productLike.users.userId}`} productLike={productLike} handleRemoveClick={handleRemoveClick} />
                    ))}
                    {!showAllItems && visibleItems < likedProducts.length && (
                        <button onClick={handleShowMore}>더 보기</button>
                    )}
                    {visibleItems >= likedProducts.length && visibleItems > 5 && (
                        <button onClick={handleCollapse}>접기</button>
                    )}
                </>
            )}
        </div>
    );
}

export default LikedProductList;
