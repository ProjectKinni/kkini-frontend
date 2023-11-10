import { useState, useEffect } from 'react';
import { fetchProducts } from '../utils/ApiClient';

function useSearchResults(searchTerm, selectedCategories, filters, kkiniGreenCheck) {
    const [categoryGroups, setCategoryGroups] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [noProductsFound, setNoProductsFound] = useState(false);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true); // 더 불러올 항목이 있는지 상태 추가

    // 검색 결과를 가져오는 함수
    const fetchSearchResults = async (currentPage) => {
        if (!hasMore) return; // 더 이상 항목이 없으면 요청하지 않음

        setLoading(true);
        setError(null);
        setNoProductsFound(false);

        try {
            const response = await fetchProducts(searchTerm, selectedCategories, filters, kkiniGreenCheck, currentPage);
            console.log('API Response:', response); // API 응답 로깅

            const { error, items, noProductsFound } = response;

            if (error) {
                setError(error);
                console.error('Error fetching products:', error);
            } else if (noProductsFound || !items || items.length === 0) {
                setHasMore(false); // 더 이상 불러올 항목이 없음을 설정
                setNoProductsFound(true);
                console.log('No products found with current filters:', filters);
            } else {
                const newGroupedItems = items.reduce((groups, item) => {
                    const category = item.categoryName;
                    if (!groups[category]) {
                        groups[category] = [];
                    }
                    groups[category].push(item);
                    return groups;
                }, currentPage === 0 ? {} : { ...categoryGroups }); // 첫 페이지인 경우 새 그룹 설정, 아니면 기존 그룹 유지
                setCategoryGroups(newGroupedItems);
            }
        } catch (err) {
            setError('An unexpected error occurred');
            console.error('Error in fetchSearchResults:', err);
        } finally {
            setLoading(false);
        }
    };

    // 검색 조건이 변경될 때마다 검색 결과를 초기화하고 처음부터 다시 가져옴
    useEffect(() => {
        // 상태 초기화
        setCategoryGroups({});
        setNoProductsFound(false);
        setPage(0); // 페이지도 초기화
        setHasMore(true); // 더 불러올 항목이 있다고 가정하고 상태 초기화

        // searchTerm이 있을 때만 검색을 실행합니다.
        if (searchTerm || selectedCategories.length || Object.keys(filters).length) {
            fetchSearchResults(0);
        }
    }, [searchTerm, selectedCategories, filters, kkiniGreenCheck]);

    // 스크롤 이벤트를 처리하는 useEffect
    useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + window.scrollY >= document.body.offsetHeight - 10 &&
                !loading &&
                hasMore // 로딩 중이 아니고, 더 불러올 항목이 있을 때만 스크롤 처리
            ) {
                setPage((prevPage) => prevPage + 1);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [loading, hasMore]); // loading 및 hasMore 상태에 따라 스크롤 이벤트를 처리합니다.

    // 페이지 번호가 바뀔 때마다 새로운 검색 결과를 가져옴
    useEffect(() => {
        fetchSearchResults(page);
    }, [page]);

    return { categoryGroups, loading, error, noProductsFound, hasMore }; // hasMore 상태도 반환하여 무한 스크롤 가능 여부를 알려줍니다.
}


export default useSearchResults;
