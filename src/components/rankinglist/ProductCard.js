import React from "react";
import TagComponent from './TagComponent'
function ProductCard({ productLink, imgSrc, productName, reviewCount,
                         filters, category, isGreen})
{

    //필터태그
    //필터 어떻게 가지고 오나요? 일단 배열로 가지고 온다고 칩시다.
    // const filterTags = filters.map(filter => ({ text: filter, index:0 }));
    //카테고리 태그
    const categoryTag = [{ text: category, index: 1 }];
    //그린태그
    const greenTag = isGreen ? [{ index :2 }] : [];

    // const allTags = [ ...filterTags, ...categoryTag, ...greenTag]

    const allTags = [...categoryTag, ...greenTag]


    return(

        <div className="card-container">

            <a href={productLink} className="product-img-container">
                <img src={imgSrc} className="product-img" alt="상품이미지" />
            </a>

            <h4><a herf={productLink}>{productName}</a></h4>

            <div className="rating-container">
                <span>⭐</span>
                {/*<u>리뷰 {reviewCount} 개</u>*/}
            </div>

            <div className="tag-container">
                {/*최대 5개만 보여준다고 칩시다.
                필터, 카테고리, 그린 각각 하나씩만 보여져야 하나?
                필터 여러개 해당될 수 있잖아요*/}
                {allTags.slice(0, 5).map((tag, idx)=>
                    <TagComponent key={idx} texts={[tag.text]} inddex={tag.index} />
                )}

            </div>
        </div>

    );

}

export default ProductCard;