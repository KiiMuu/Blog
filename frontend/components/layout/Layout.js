import Header from '../header/Header';

const Layout = ({ children }) => {
    return (
        <React.Fragment>
            <Header />
            {children}
            {/* <p>Footer</p> */}
        </React.Fragment>
    )
}

export default Layout;