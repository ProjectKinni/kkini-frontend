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
                    //     tagStyle = { backgroundColor: 'orange' };
                    //     textStyle = { color: 'white' };
                    //     break;
                        //카테고리
                    case 1:
                        tagStyle = { backgroundColor: 'white' };
                        textStyle = { color: 'orange' };
                        break;
                        //끼니 그린
                    case 2:
                        tagStyle = { backgroundColor: 'green' };
                        textStyle = { color: 'white' };
                        imageSrc = {whiteGreenIcon};
                        text = "그린";
                        break;
                    default:
                        break;
                }

                return (
                    <button key={index} style={tagStyle} disabled>
                        {imageSrc && <img src={imageSrc} alt="button icon" style={{ marginRight: '5px' }} />}
                        <span style={textStyle}>{text}</span>
                    </button>
                );
            })}
        </div>
    );
}

export default TagComponent;
