const SERVER_URL = "http://223.130.138.156:8080";

export const fetchProducts = async (searchTermFromParams, selectedCategories, filters, isKkiniChecked) => {
    let endpoint = `${SERVER_URL}/api/products/search?searchTerm=${encodeURIComponent(searchTermFromParams)}`;

    if (selectedCategories && selectedCategories.length > 0) {
        endpoint += `&categoryName=${selectedCategories.join(",")}`;
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
            return { noProductsFound: true, items: [] };
        } else if (data.message) {
            return { error: data.message, items: [] };
        } else if (Array.isArray(data)) {
            return { items: data };
        } else {
            return { error: "Unexpected response format.", items: [] };
        }
    } catch (error) {
        return { error: error.message || "Error fetching products.", items: [] };
    }
};

export const fetchAutocompleteSuggestions = async (searchTerm) => {
    let endpoint = `${SERVER_URL}/api/products/autocomplete?searchTerm=${encodeURIComponent(searchTerm)}`;

    try {
        const response = await fetch(endpoint);
        if (!response.ok) {
            return { error: "Network response was not ok", items: [] };
        }
        const data = await response.json();
        if (Array.isArray(data)) {
            return { items: [...new Set(data)] };
        } else {
            return { error: "Unexpected response format.", items: [] };
        }
    } catch (error) {
        return { error: error.message || "Error fetching autocomplete suggestions.", items: [] };
    }
};

export const fetchProductDetail = async (productId, userId) => {

    try {
        const response = await fetch(`${SERVER_URL}/api/products/${productId}${userId ? `?userId=${userId}` : ''}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();

        // viewCount를 가져오는 추가 API 호출
        let viewCountResponse = await fetch(`${SERVER_URL}/api/products/${productId}?userId=${userId}`);
        if (!viewCountResponse.ok) {
            throw new Error('Failed to fetch view count');
        }
        let viewCountData = await viewCountResponse.json();

        // data 객체에 viewCount 속성 추가
        data.viewCount = viewCountData.viewCount;

        console.log('API Response:', data);  // API 응답 로깅
        return { data };
    } catch (error) {
        console.error('Error fetching product:', error);
        return { error: error.message || "Error fetching product." };
    }
};

