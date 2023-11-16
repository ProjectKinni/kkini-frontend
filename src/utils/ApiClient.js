import axios from 'axios';

const SERVER_URL = "http://localhost:8080";


export function fetchPickTopProducts(userId, categoryName, filterDTO) {
    console.log("API Params:", {
        userId,
        categoryName,
        ...filterDTO
    });
    return axios.get(`${SERVER_URL}/products/kkini-pick-products/top`, {
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

export function fetchPickProducts(userId, page) {
    console.log("API Params:", {
        userId,
        page
    });
    return axios.get(`${SERVER_URL}/products/kkini-pick?userId=${userId}&page=${page}`)
        .then(response => {
            console.log(response.data);
            return response.data;
        })
        .catch((error) => {
            console.error("Error fetching pick products:", error);
            console.error("Error Details:", error.response || error.request);
        });
}

fetchPickProducts.isPickProduct = true;


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

    console.log(`Fetching products with searchTerm: ${searchTermFromParams}, categories: ${selectedCategories}, filters: ${JSON.stringify(filters)}, isGreen: ${isKkiniChecked}, page: ${page}`);

    if (selectedCategories && selectedCategories.length > 0) {
        endpoint += `&category=${selectedCategories.join(",")}`;
    }

    if (isKkiniChecked) {
        endpoint += `&isGreen=true`;
    }

    Object.entries(filters).forEach(([key, value]) => {
        if (value) {
            endpoint += `&${key}=${encodeURIComponent(value)}`;
        }
    });

    console.log(`Final endpoint: ${endpoint}`); // 최종 요청 URL 로그

    try {
        const response = await fetch(endpoint);

        console.log(`Received response status: ${response.status}`); // 응답 상태 코드 로그

        const data = await response.json();
        console.log('Received data:', data); // 전체 응답 데이터 로그

        if (data && Array.isArray(data)) { // Postman 테스트 결과에 따르면 배열로 응답을 받습니다.
            // API 응답이 배열일 경우 바로 아이템으로 간주합니다.
            return { items: data, pageDetails: null }; // 페이지 상세는 이 경우 null로 설정합니다.
        } else if (data && data.content && Array.isArray(data.content)) {
            // 'content'가 있는 경우 이 구조를 따릅니다.
            return { items: data.content, pageDetails: {
                    last: data.last,
                    totalPages: data.totalPages,
                    totalElements: data.totalElements,
                    size: data.size,
                    number: data.number,
                }};
        } else {
            throw new Error("Unexpected response format, no 'content' array found.");
        }
    } catch (error) {
        console.error(`Error fetching products: ${error}`, error); // 에러 로깅 강화
        return { error: error.message || "Error fetching products.", items: [] };
    }
};

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

export function handleUpdateReview(userId, reviewId, reviewData) {
    const url = `${SERVER_URL}/reviews/${userId}/${reviewId}`;
    const formData = new FormData();

    // 로그 추가: userId, reviewId, reviewData 값 확인
    console.log(`Updating review: userId=${userId}, reviewId=${reviewId}, reviewData=`, reviewData);

    // reviewData가 유효한 객체인지 확인
    if (!reviewData || typeof reviewData !== 'object') {
        console.error('Invalid reviewData:', reviewData);
        return Promise.reject('Invalid reviewData'); // 적절한 오류 처리
    }

    // 필요한 데이터를 formData에 추가
    Object.keys(reviewData).forEach(key => {
        if (reviewData[key] != null) {
            // 파일 데이터 처리
            if (key === 'images' && Array.isArray(reviewData[key])) {
                reviewData[key].forEach((file, index) => {
                    if (file instanceof File) {
                        formData.append(`image${index + 1}`, file);
                    }
                });
            } else {
                formData.append(key, reviewData[key]);
            }
        }
    });

    // 서버에 요청 보내기
    return axios.put(url, formData, {
        headers: {
            'Content-Type': 'multipart/form-data', // 폼 데이터 형식 지정
        },
    }).then(response => {
        // 응답 처리 로직
        console.log('Update review response:', response.data); // 응답 로그 추가
        return response.data;
    }).catch(error => {
        // 오류 처리 로직
        console.error('Error updating review:', error);
        return Promise.reject(error); // 오류를 반환하여 catch 블록에서 처리할 수 있도록 함
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

