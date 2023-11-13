import { useState, useEffect } from 'react';
import { fetchProducts } from '../utils/ApiClient';

function useSearchResults(searchTerm, selectedCategories, filters, kkiniGreenCheck) {
    const [categoryGroups, setCategoryGroups] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [noProductsFound, setNoProductsFound] = useState(false);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [products, setProducts] = useState([]);
    const [reviewPosted, setReviewPosted] = useState(false);

    const refreshProducts = async () => {
        setLoading(true);
        try {
            const response = await fetchProducts(searchTerm, selectedCategories, filters, kkiniGreenCheck, page);
            if (response && response.data && response.data.length > 0) {
                setProducts(prevProducts => {
                    const updatedProducts = response.data.map(product => ({
                        ...product,
                        averageTasteRating: product.averageTasteRating,
                        averagePriceRating: product.averagePriceRating,
                        averageEcoRating: product.averageEcoRating,
                    }));
                    return updatedProducts;
                });
            } else {
                setHasMore(false);
            }
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    const fetchSearchResults = async (currentPage) => {
        if (!hasMore) return;

        setLoading(true);
        setError(null);
        setNoProductsFound(false);

        try {
            const response = await fetchProducts(searchTerm, selectedCategories, filters, kkiniGreenCheck, currentPage);

            const { error, items, noProductsFound } = response;

            if (error) {
                setError(error);
            } else if (noProductsFound || !items || items.length === 0) {
                setHasMore(false); // 더 이상 불러올 항목이 없음을 설정
                setNoProductsFound(true);
            } else {
                const newGroupedItems = items.reduce((groups, item) => {
                    const category = item.category;
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
        setPage(0); // 페이지를 0으로 재설정하여 새로운 검색 시작
        setHasMore(true);

        if (searchTerm || selectedCategories.length || Object.keys(filters).length || reviewPosted) {
            fetchSearchResults(0);
            if (reviewPosted) {
                setReviewPosted(false); 
            }
        }
    }, [searchTerm, selectedCategories, filters, kkiniGreenCheck, reviewPosted]);

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
    }, [loading, hasMore]);

    // 페이지 번호가 바뀔 때마다 새로운 검색 결과를 가져옴
    useEffect(() => {
        fetchSearchResults(page);
    }, [page]);

    return { categoryGroups, loading, error, noProductsFound, products, refreshProducts };
}


export default useSearchResults;
