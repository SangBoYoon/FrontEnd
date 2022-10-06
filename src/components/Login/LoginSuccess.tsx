import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { userAPI } from '../../features/userAPI';
import { setAccessToken, setRefreshToken } from '../../services/tokenControl';

const LoginSuccess: React.FC = () => {
    const dispatch = useDispatch();
    const location = useLocation();

    const fn = () => {
        const params = new URLSearchParams(location.search);

        const accessToken = params.get('accessToken') || '';
        const refreshToken = params.get('refreshToken') || '';

        setAccessToken(accessToken);
        setRefreshToken(refreshToken);
        userAPI(dispatch);
    };

    useEffect(() => {
        if (!location.search) return;
        fn();
        window.location.replace('/');
    }, []);

    return <div>LoginSuccess</div>;
};

export default LoginSuccess;
