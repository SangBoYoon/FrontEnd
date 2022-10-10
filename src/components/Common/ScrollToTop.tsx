import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// eslint-disable-next-line react/function-component-definition, @typescript-eslint/no-explicit-any
export default function ScrollToTop(): any {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}
