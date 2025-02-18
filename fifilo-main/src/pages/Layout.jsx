import { useLocation } from "react-router-dom";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";

import { useEffect, useState } from "react";
import Loader from "../layout/Loader";

const Layout = ({ children }) => {
    const [loading, setLoading] = useState(true)
    const location = useLocation();
    const hideNavbarFooterRoutes = ["admin", "pages", "dashboard", "section", "casestudies", "blogadmin"];
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
    }, [location.pathname])
    return (
        <>
            {!shouldHide && <Navbar />}
            <main>{children}</main>
            {!shouldHide && <Footer />}
        </>
    );
};

export default Layout;
