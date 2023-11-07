// useSearchResults.js
import { useState, useEffect } from 'react';
import axios from 'axios'; // axios 라이브러리를 사용합니다.

function useSearchResults(searchTerm) {
    // 상태 선언
    const [categoryGroups, setCategoryGroups] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [noProductsFound, setNoProductsFound] = useState(false);
    const [page, setPage] = useState(0); // 페이지 상태를 추가합니다.

    // 검색 결과와 자동완성 제안을 가져오는 부분
    useEffect(() => {
        const fetchSearchResults = async () => {
            if (!searchTerm) return; // 검색어가 없다면 함수를 종료합니다.

            setLoading(true);
            setError(null);
            setNoProductsFound(false);

            try {
                // HTTP GET 요청을 '/api/products/search' 엔드포인트로 보냅니다.
                const response = await axios.get(`http://localhost:8080/api/products/search`, {
                    params: { searchTerm, page },
                });

                // 데이터 구조를 처리합니다.
                const { searchResults, autoCompleteSuggestions } = response.data;

                // 검색 결과 상태를 업데이트합니다.
                if (searchResults && searchResults.content.length > 0) {
                    setCategoryGroups(prevCategoryGroups => {
                        const newCategoryGroups = { ...prevCategoryGroups };
                        searchResults.content.forEach(item => {
                            const { category } = item;
                            newCategoryGroups[category] = newCategoryGroups[category]
                                ? [...newCategoryGroups[category], item]
                                : [item];
                        });
                        return newCategoryGroups;
                    });
                } else if (searchResults && searchResults.content.length === 0) {
                    setNoProductsFound(true);
                }

                setLoading(false);
            } catch (e) {
                console.error("Error fetching data:", e);
                setError(e);
                setLoading(false);
            }
        };

        fetchSearchResults();
    }, [searchTerm, page]); // searchTerm 또는 page 변경 시 useEffect 트리거

    // 스크롤링을 감지하여 페이지를 증가시키는 useEffect
    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight) {
                setPage(prevPage => prevPage + 1);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // 반환되는 상태와 함수
    return {
        categoryGroups,
        loading,
        error,
        noProductsFound,
        setPage // 상태를 설정하는 함수도 반환합니다.
    };
}

export default useSearchResults;
