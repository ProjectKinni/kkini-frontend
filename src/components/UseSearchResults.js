import {useState, useEffect} from 'react';
import {fetchProducts} from '../utils/ApiClient';

function useSearchResults(searchTerm, selectedCategories, filters, kkiniGreenCheck) {
    const [categoryGroups, setCategoryGroups] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [noProductsFound, setNoProductsFound] = useState(false);
    const [page, setPage] = useState(0);
    const [isScroll, setIsScroll] = useState(false);

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
            if (!isScroll) {
                const newGroupedItems = items.reduce((groups, item) => {
                    const category = item.categoryName;
                    if (!groups[category]) {
                        groups[category] = [];
                    }
                    groups[category].push(item);
                    return groups;
                }, {});
                setCategoryGroups(newGroupedItems);
            }// 초기화된 categoryGroups 사용
            else {
                const newGroupedItems = items.reduce((groups, item) => {
                    const category = item.categoryName;
                    if (!groups[category]) {
                        groups[category] = [];
                    }
                    groups[category].push(item);
                    return groups;
                }, {...categoryGroups});
                setCategoryGroups(newGroupedItems);
            }

        }
        setLoading(false);
    };


    useEffect(() => {
        // 상태 초기화
        setCategoryGroups({});
        setNoProductsFound(false);
        setPage(0);  // 페이지도 초기화

        if (searchTerm) {
            setIsScroll(false);
            fetchSearchResults(0);
        }
    }, [searchTerm, selectedCategories, filters, kkiniGreenCheck]);

    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 5) {
                setIsScroll(true);
                setPage(page + 1);
                fetchSearchResults(page);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [categoryGroups]);  // categoryGroups가 변경될 때마다 스크롤 이벤트 리스너를 업데이트

    return {categoryGroups, loading, error, noProductsFound};
}

export default useSearchResults;
