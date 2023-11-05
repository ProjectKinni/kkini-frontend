import IcStar from "../../assets/images/star_on.png";
import IcStarOff from "../../assets/images/star_off.png";

function StarRatingForProductCard({ rating }) {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
        stars.push(
            <img
                src={i <= rating ? IcStar : IcStarOff}
                alt={`${i} 별`}
                key={i}
            />
        );
    }
    return <div className="star-wrap">{stars}</div>;
}

export default StarRatingForProductCard;