import {retrieveAllTestApi} from "../api/TestApiService";
import {useEffect, useState} from "react";

function TestComponent() {

    const[tests, setTests] = useState([]);

    useEffect(
        () => retrieveTests(),
        []
    );

    function retrieveTests() {
        retrieveAllTestApi()
            .then(response => {
                setTests(response.data)
            })
            .catch(error => console.log(error))
    }

    return (
        <div className="TestComponent">
            <h1>여기서 테스트 하세용</h1>
            <div>
                <ul>
                    {tests.map(test => (
                        <li key={test.testId}>{test.testname}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default TestComponent;