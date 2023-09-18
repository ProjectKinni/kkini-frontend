import React, { useState, useEffect } from 'react';
import {useUser} from "./UserContext";

function ViewCount({ productId, userId }) {
    const [viewCount, setViewCount] = useState(0); // 초기 상태를 0으로 설정
    const [error, setError] = useState(null); // 에러 상태 추가
    const { user, setUser } = useUser();

    useEffect(() => {
        if (productId && user.userId) {
            fetch(`http://localhost:8080/api/products/${productId}?userId=${user.userId}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    setViewCount(data.viewCount);
                })
                .catch(error => {
                    setError(error); // 에러 상태 설정
                });
        }
    }, [productId, user.userId]);

    return (
        <div>
            {error ? (
                <p>조회수를 불러오는 중 오류가 발생했습니다.</p>
            ) : (
                <p>조회수: {viewCount}</p>
            )}
        </div>
    );
}

export default ViewCount;
