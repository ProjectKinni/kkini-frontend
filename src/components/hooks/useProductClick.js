import { useNavigate } from "react-router-dom";
import { useUser } from "../UserContext"
import { incrementViewCount } from "../../utils/ApiClient";

export const useProductClick = () => {
    const navigate = useNavigate();
    const { user } = useUser();

    const handleProductClick = async (productId) => {
        if (user && user.userId) {
            try {
                await incrementViewCount(productId, user.userId);
            } catch (error) {
                console.error("Error incrementing view count:", error);
            }
        }
        navigate(`/products/${productId}`);
    };

    return handleProductClick;
};
