import { useState, useEffect, Fragment } from 'react';
import jwt from 'jsonwebtoken';
import Layout from '../../../../components/layout/Layout';
import { signup } from '../../../../actions/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { withRouter } from 'next/router';
import '../../index.scss';

const ActivateAccount = ({ router }) => {
    const [values, setValues] = useState({
        name: '',
        token: '',
        error: '',
        loading: false,
        success: false,
        showButton: true,
        buttonText: 'Activate'
    });

    const { name, token, error, loading, success, showButton, buttonText } = values;

    useEffect(() => {
        let token = router.query.id;

        if (token) {
            const { name } = jwt.decode(token);

            setValues({
                ...values,
                name,
                token
            });
        }
    }, [router]);

    // const showLoading = () => loading ? (<span>Loading...</span>) : '';

    const handleSubmit = e => {
        e.preventDefault();

        setValues({
            ...values,
            loading: true,
            buttonText: 'Loading...',
            error: false
        });

        signup({ token }).then(data => {
            if (data.error) {
                setValues({
                    ...values,
                    error: data.error,
                    loading: false,
                    showButton: false
                });
            } else {
                setValues({
                    ...values,
                    loading: false,
                    success: true,
                    showButton: false
                });
            }
        });
    }

    return (
        <Layout>
            <div className="activation uk-margin-medium-top uk-text-center">
                <div className="uk-container uk-container-small">
                    <h3 className="uk-text-uppercase">Hey {name}, Activate your account</h3>
                    {error && <p className="error-msg">{error} <span><FontAwesomeIcon icon={faExclamationCircle} /></span></p>}
                    {success && <Fragment>
                        <p className="success">You've successfully activated your account <span><FontAwesomeIcon icon={faCheckCircle} /></span></p>
                        <p className="signin">You can now <a href="/signin">Signin</a></p>
                    </Fragment>}
                    {showButton && <button onClick={handleSubmit}>{buttonText}</button>}
                </div>
            </div>
        </Layout>
    )
}

export default withRouter(ActivateAccount);