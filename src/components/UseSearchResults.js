import { useState, useEffect } from 'react';
import { fetchProducts } from '../utils/ApiClient';

function useSearchResults(searchTerm, selectedCategories, filters, kkiniGreenCheck) {
    const [categoryGroups, setCategoryGroups] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [noProductsFound, setNoProductsFound] = useState(false);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true); // 더 불러올 항목이 있는지 상태 추가
    const [products, setProducts] = useState([]);
    const [reviewPosted, setReviewPosted] = useState(false);
    // 데이터를 새로고침하는 함수
    const refreshProducts = async () => {
        // 상태를 업데이트하기 전에 현재의 searchTerm, selectedCategories, filters, kkiniGreenCheck 값을
        // 사용하여 새로운 데이터를 가져와야 합니다.
        setLoading(true);
        try {
            const response = await fetchProducts(searchTerm, selectedCategories, filters, kkiniGreenCheck, page);
            if (response && response.data && response.data.length > 0) {
                // 여기서 함수형 업데이트를 사용해 이전 상태와 새 데이터를 병합합니다.
                setProducts(prevProducts => {
                    // 새로운 데이터를 기존 데이터에 추가하거나 기존 데이터를 대체합니다.
                    // 이 예시에서는 새 데이터로 전체 배열을 대체합니다.
                    const updatedProducts = response.data.map(product => ({
                        ...product,
                        // 백엔드 응답에 맞춰 필드 이름을 확인하세요.
                        averageTasteRating: product.averageTasteRating,
                        averagePriceRating: product.averagePriceRating,
                        averageEcoRating: product.averageEcoRating,
                    }));
                    return updatedProducts; // 페이지네이션 없이 새 데이터로 대체하는 경우
                });
            } else {
                // 데이터가 없으면 상태를 업데이트하여 더 이상 로드할 항목이 없음을 나타냅니다.
                setHasMore(false);
            }
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

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
        setHasMore(true); // 더 불러올 항목이 있다고 가정하고 상태 초기화

        // searchTerm이 있거나 필터가 존재하거나 리뷰가 작성된 경우 검색을 실행합니다.
        if (searchTerm || selectedCategories.length || Object.keys(filters).length || reviewPosted) {
            fetchSearchResults(0);
            if (reviewPosted) {
                setReviewPosted(false); // 리뷰 작성 상태를 초기화합니다.
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
    }, [loading, hasMore]); // loading 및 hasMore 상태에 따라 스크롤 이벤트를 처리합니다.

    // 페이지 번호가 바뀔 때마다 새로운 검색 결과를 가져옴
    useEffect(() => {
        fetchSearchResults(page);
    }, [page]);

    return { categoryGroups, loading, error, noProductsFound, products, refreshProducts };
}


export default useSearchResults;
