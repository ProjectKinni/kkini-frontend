import axios from 'axios';

const SERVER_URL = "http://localhost:8080";


export function fetchPickProducts(userId, categoryName, filterDTO) {
    console.log("API Params:", {
        userId,
        categoryName,
        ...filterDTO
    });
    return axios.get(`${SERVER_URL}/products/kkini-pick-products`, {
        params: {
            userId: userId,
            categoryName: categoryName,
            ...filterDTO
        }
    })
        .then(response => {
            console.log(response.data);
            return response.data;
        })
        .catch((error) => {
            console.error("Error fetching pick products:", error);
            console.error("Error Details:", error.response || error.request);
        });
}

export function fetchRankingProducts(page) {

    return axios.get(`${SERVER_URL}/products/kkini-ranking` + `?page=${page}`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.error('Error fetching products:', error);
            throw error;
        });
};

export function fetchGreenProducts(page) {

    return axios.get(`${SERVER_URL}/products/kkini-green` + `?page=${page}`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.error('Error fetching products:', error);
            throw error;
        });
};


export const fetchProducts = async (searchTermFromParams, selectedCategories, filters, isKkiniChecked, page) => {
    let endpoint = `${SERVER_URL}/api/products/search?searchTerm=${encodeURIComponent(searchTermFromParams)}&page=${page}`;

    console.log(`Fetching products with searchTerm: ${searchTermFromParams}, page: ${page}`); // 로그 추가

    if (selectedCategories && selectedCategories.length > 0) {
        endpoint += `&category=${selectedCategories.join(",")}`;
    }

    if (isKkiniChecked) {
        endpoint += `&isGreen=true`;
    }
    Object.entries(filters).forEach(([key, value]) => {
        if (value) {
            endpoint += `&${key}=${value}`;
        }
    });
    try {
        const response = await fetch(endpoint);
        if (!response.ok) {
            const text = await response.text();
            console.error("Server Error:", text);
            throw new Error('Network response was not ok');
        }
        const text = await response.text();
        const data = text ? JSON.parse(text) : null;
        if (data === null) {
            return {noProductsFound: true, items: []};
        } else if (data.message) {
            return {error: data.message, items: []};
        } else if (Array.isArray(data)) {
            return {items: data};
        } else {
            return {error: "Unexpected response format.", items: []};
        }
    } catch (error) {
        return {error: error.message || "Error fetching products.", items: []};
    }
};
//
// export const fetchAutocompleteSuggestions = async (searchTerm) => {
//     let endpoint = `${SERVER_URL}/api/products/autocomplete?searchTerm=${encodeURIComponent(searchTerm)}`;
//
//     try {
//         const response = await fetch(endpoint);
//         if (!response.ok) {
//             return {error: "Network response was not ok", items: []};
//         }
//         const data = await response.json();
//         if (Array.isArray(data)) {
//             return {items: [...new Set(data)]};
//         } else {
//             return {error: "Unexpected response format.", items: []};
//         }
//     } catch (error) {
//         return {error: error.message || "Error fetching autocomplete suggestions.", items: []};
//     }
// };

export const fetchProductDetail = async (productId, userId) => {
    try {
        const response =
            await fetch(`${SERVER_URL}/api/products/${productId}${userId ? `?userId=${userId}` : ''}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return {data, viewCount: data.viewCount || 0}; // 조회수를 반환하도록 수정
    } catch (error) {
        console.error('Error fetching product:', error);
        return {error: error.message || "Error fetching product."};
    }
};


export const incrementViewCount = async (productId, userId) => {
    try {
        const response =
            await fetch(`${SERVER_URL}/api/products/${productId}/viewCount?userId=${userId}`, {

                method: 'POST'
            });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return {data};
    } catch (error) {
        console.error('Error incrementing view count:', error);
        return {error: error.message || "Error incrementing view count."};
    }
};
export const handleReviewSubmit = async (userId, productId, formData) => {
    try {
        formData.append('productId', productId);

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };

        const response = await axios.post(`${SERVER_URL}/reviews/${userId}`, formData, config);
        return {data: response.data};
    } catch (error) {
        return {error: error.message || '리뷰 작성 실패.'};
    }
};


export function fetchReviews(userId, page) {
    return axios.get(`${SERVER_URL}/reviews/users/${userId}`, {params: {page, size: 10}})
        .then(response => response.data)
        .catch(error => {
            console.error('Error fetching user reviews:', error);
            throw error;
        });
}

export function handleDeleteReview(reviewId) {
    return axios.delete(`${SERVER_URL}/reviews/${reviewId}`)
        .catch(error => {
            console.error('Error deleting review:', error);
            throw error;
        });
}

export function fetchLikedProducts(userId, page, size) {
    const endpoint = `${SERVER_URL}/like/liked-products/${userId}`;

    return axios.get(endpoint, {
        params: {
            page,
            size
        }
    })
        .then(response => {
            console.log(response.data);
            return response.data;
        })
        .catch(error => {
            console.error('Error fetching liked products:', error);
            throw error;
        });
}

export function removeLikedProduct(userId, productId) {
    const url = `${SERVER_URL}/like/${userId}/${productId}`;

    return axios.delete(url)
        .then(response => response.data)
        .catch(error => {
            console.error('Error removing liked product:', error);
            throw error;
        });
}

// ... (기존 코드)

export function checkUserReviewedProduct(productId, userId) {

    return fetch(`${SERVER_URL}/reviews/hasReviewed/${productId}/${userId}`)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Error checking if user reviewed the product');
            }
        })
        .catch(error => {
            console.error('Error checking if user reviewed the product:', error);
            throw error;
        });
}

export function fetchTopGreenProducts() {
    return axios.get(`${SERVER_URL}/products/kkini-green/top`)
        .then(response => {
            console.log(response.data);
            return response.data;
        })
        .catch(error => {
            console.error('Error fetching products:', error);
            throw error;
        });
};


export function fetchTopRankingProducts() {
    return axios.get(`${SERVER_URL}/products/kkini-ranking/top`)
        .then(response => {
            console.log(response.data);
            return response.data;
        })
        .catch(error => {
            console.error('Error fetching products:', error);
            throw error;
        });
};

