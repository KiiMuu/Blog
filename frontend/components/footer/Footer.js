import './Footer.scss';
import { APP_NAME } from '../../config';

const Footer = () => {
    return (
        <div className="footer uk-text-center">
            <div className="uk-container">
            <p>&copy; {new Date().getFullYear()} <span className="uk-text-uppercase">{APP_NAME}</span>, Made by <a href="https://github.com/KiiMuu" className="uk-text-uppercase">K!M</a></p>
            </div>
        </div>
    )
}

export default Footer;
