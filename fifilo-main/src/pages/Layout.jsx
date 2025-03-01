import { useLocation } from "react-router-dom";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";

import { useEffect, useState } from "react";
import Loader from "../layout/Loader";

const Layout = ({ children }) => {
    const [loading, setLoading] = useState(true)
    const location = useLocation();
    const hideNavbarFooterRoutes = ["admin", "pages", "thank-you", "dashboard", "section", "casestudies", "blogadmin"];
    useEffect(() => {
        const loadData = () => {
            setTimeout(() => {
                setLoading(false);
            }, 2000);
        };
        if (loading) {
            loadData();
        }
    }, [loading]);
    const shouldHide = hideNavbarFooterRoutes.includes(location.pathname.split("/")[1]);
    useEffect(() => {
        setLoading(true)
    }, [location.pathname]);
    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 1000);
    }, [])
    return (
        <>
            {!shouldHide && <Navbar />}
            {loading && <Loader />}
            <main>{children}</main>
            {!shouldHide && <Footer />}
        </>
    );
};

export default Layout;

