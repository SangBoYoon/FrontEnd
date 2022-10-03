import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const LoginSuccess: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const fn = () => {
        const params = new URLSearchParams(location.search);

        console.log(params.get('accessToken'));
        console.log(params.get('refreshToken'));

        const accessToken = params.get('accessToken') || '';
        const refreshToken = params.get('refreshToken') || '';

        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
    };

    useEffect(() => {
        if (!location.search) return;
        fn();
        navigate('/');
    }, []);

    return <div>LoginSuccess</div>;
};

export default LoginSuccess;
