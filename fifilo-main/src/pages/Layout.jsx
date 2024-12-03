import { useLocation } from "react-router-dom";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";

const Layout = ({ children }) => {
    const location = useLocation();
    const hideNavbarFooterRoutes = ["admin", "pages", "dashboard", "section"];

    const shouldHide = hideNavbarFooterRoutes.includes(location.pathname.split("/")[1]);
    return (
        <>
            {!shouldHide && <Navbar />}
            <main>{children}</main>
            {!shouldHide && <Footer />}
        </>
    );
};

export default Layout;
