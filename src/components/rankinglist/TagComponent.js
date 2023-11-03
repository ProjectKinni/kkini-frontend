import React from 'react';
import whiteGreenIcon from '../../assets/images/ic_green_w.png'

function TagComponent({ texts }) {
    return (
        <div>
            {texts.map((text, index) => {
                let tagStyle, textStyle, imageSrc;

                switch(index) {
                        //필터
                    // case 0:
                    //     tagStyle = { backgroundColor: '#FF6600', border: '1px solid #FF6600' };
                    //     textStyle = { color: '#fff' };
                    //     break;
                        //카테고리
                    case 1:
                        tagStyle = { backgroundColor: '#fff', border: '1px solid #FF6600' };
                        textStyle = { color: '#FF6600' };
                        break;
                        //끼니 그린
                    case 2:
                        tagStyle = { backgroundColor: '#69CF23', border: '1px solid #69CF23' };
                        textStyle = { color: '#fff' };
                        imageSrc = {whiteGreenIcon};
                        text = "그린";
                        break;
                    default:
                        break;
                }

                return (
                    <button key={index} style={tagStyle} disabled>
                        {imageSrc && <img src={imageSrc} alt="button icon" />}
                        <span style={textStyle}>{text}</span>
                    </button>
                );
            })}
        </div>
    );
}

export default TagComponent;
