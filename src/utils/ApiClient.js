export const fetchProducts = async (searchTermFromParams, selectedCategories) => {
    const SERVER_URL = "http://localhost:8080";
    let endpoint = `${SERVER_URL}/api/products/search?searchTerm=${searchTermFromParams}`;

    if (selectedCategories.length > 0) {
        endpoint += `&categoryName=${selectedCategories.join(",")}`;
    }

    try {
        const response = await fetch(endpoint);
        if (!response.ok) {
            const text = await response.text();
            console.error("Server Error:", text);
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (data.message) {
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
    const SERVER_URL = "http://localhost:8080";
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
