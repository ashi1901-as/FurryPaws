import Header from "./../components/header/Header";
import Footer from "./../components/footer/Footer";
import Routers from "../routes/Routers";
import ChatIcon from "../components/ChatIcon";
const Layout = () => {
    return (
        <>
            <Header />
            <main className="min-h-[60vh] w-[100%] bg-[#fffaf7]">
                <Routers />
            </main>
            <Footer />
             <ChatIcon />
        </>
    );
};

export default Layout;
