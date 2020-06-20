import Header from '../header/Header';
import Footer from '../footer/Footer';

const Layout = ({ children }) => {
    return (
        <React.Fragment>
            <Header />
            {children}
            <Footer />
        </React.Fragment>
    )
}

export default Layout;