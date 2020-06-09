const Header = () => {
    return (
        <div data-uk-sticky="sel-target: .header; cls-active: uk-navbar-sticky">
            <div className="header">
                <div className="header-content">
                    <div className="uk-container">
                        <nav data-uk-navbar>
                            <div className="uk-navbar-left">
                                <ul className="uk-navbar-nav">
                                    <li><a href="#">Item</a></li>
                                </ul>
                            </div>
                            <div className="uk-navbar-right">
                                <ul className="uk-navbar-nav uk-visible@s">
                                    <li><a href="#">Item</a></li>
                                </ul>
                                {/* Show Nav items in sidebar in phone screens */}
                                <div className="uk-hidden@s">
                                    <button className="uk-button" type="button" data-uk-toggle="target: #offcanvas-overlay">Menu</button>
                                    <div id="offcanvas-overlay" data-uk-offcanvas="overlay: true">
                                        <div className="uk-offcanvas-bar">
                                            <button className="uk-offcanvas-close" type="button" data-uk-close></button>
                                            <span>Blog</span>
                                            <ul className="uk-nav uk-nav-default">
                                                <li><a href="#">Item</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header;
