import {useState, useEffect} from 'react';
import {fetchProducts} from '../utils/ApiClient';

function useSearchResults(searchTerm, selectedCategories, filters, kkiniGreenCheck) {
    const [categoryGroups, setCategoryGroups] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [noProductsFound, setNoProductsFound] = useState(false);
    const [page, setPage] = useState(0);

    const fetchSearchResults = async (currentPage) => {
        setLoading(true);
        setError(null);
        setNoProductsFound(false);
        const {error, items, noProductsFound} =
            await fetchProducts(searchTerm, selectedCategories, filters, kkiniGreenCheck, page);
        if (error) {
            setError(error);
        } else if (noProductsFound) {
            setNoProductsFound(true);
        } else {
            const newGroupedItems = items.reduce((groups, item) => {
                const category = item.categoryName;
                if (!groups[category]) {
                    groups[category] = [];
                }
                groups[category].push(item);
                return groups;
            }, {});  // 초기화된 categoryGroups 사용
            setCategoryGroups(newGroupedItems);
            setPage(page + 1);  // 페이지 번호 증가
        }
        setLoading(false);
        setPage(currentPage + 1);
    };


    useEffect(() => {
        // 상태 초기화
        setCategoryGroups({});
        setNoProductsFound(false);
        setPage(0);  // 페이지도 초기화

        if (searchTerm) {
            fetchSearchResults(0);
        }
    }, [searchTerm, selectedCategories, filters, kkiniGreenCheck]);

    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
                fetchSearchResults(page);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [categoryGroups, page]);  // categoryGroups가 변경될 때마다 스크롤 이벤트 리스너를 업데이트

    return {categoryGroups, loading, error, noProductsFound};
}

export default useSearchResults;
