import { APP_NAME } from '../../config';
import Link from 'next/link';

import styles from './Header.module.scss';

const Header = () => {
    return (
        <div data-uk-sticky="sel-target: .header; cls-active: uk-navbar-sticky">
            <div className={styles.header}>
                <div className="header-content">
                    <div className="uk-container">
                        <nav data-uk-navbar>
                            <div className="uk-navbar-left">
                                <Link href="/">
                                    <a className= {`uk-navbar-item uk-logo uk-text-uppercase ${styles.logo}`}>{APP_NAME}</a>
                                </Link>
                            </div>
                            <div className="uk-navbar-right">
                                <ul className="uk-navbar-nav uk-visible@s">
                                    <li className={styles.navLink}>
                                        <Link href="auth/signup" as="/signup"><a>SignUp</a></Link>
                                    </li>
                                    <li className={styles.navLink}>
                                        <Link href="auth/signin" as="/signin"><a>SignIn</a></Link>
                                    </li>
                                </ul>
                                {/* Show Nav items in sidebar in phone screens */}
                                <div className="uk-hidden@s">
                                    <button className={`uk-button ${styles.menuBtn}`} type="button" data-uk-toggle="target: #offcanvas-overlay">Menu</button>
                                    <div id="offcanvas-overlay" data-uk-offcanvas="overlay: true">
                                        <div className="uk-offcanvas-bar">
                                            <button className="uk-offcanvas-close" type="button" data-uk-close></button>
                                            <span>{APP_NAME}</span>
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
