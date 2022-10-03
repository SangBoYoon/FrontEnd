import React from 'react';
import './App.css';
import SearchInput from './components/SearchInput';

const App: React.FC = () => {
    return (
        <div className="App">
            <button type="button">
                <a href="http://54.180.19.84:8080/oauth2/authorization/kakao">
                    Kakao
                </a>
            </button>
            <button type="button">
                <a href="http://ec2-54-180-19-84.ap-northeast-2.compute.amazonaws.com:8080//oauth2/authorization/google">
                    Google
                </a>
            </button>
            <SearchInput />
        </div>
    );
};

export default App;
