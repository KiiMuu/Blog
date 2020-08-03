import Layout from '../components/layout/Layout';
import Link from 'next/link';
import './index.scss';

const Index = () => {
    return (
        <Layout>
            <div className="home-page uk-margin-large-top">
                <div className="uk-container uk-container-small">
                    <h1 className="uk-text-center uk-text-uppercase">Bloggawy for technical and programming blog tutorials</h1>
                </div>
            </div>
        </Layout>
    )
}

export default Index;