import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Scroll to top after each route change
const useResetScroll = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
};
export default useResetScroll;
