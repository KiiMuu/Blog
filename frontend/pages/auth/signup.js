import Layout from '../../components/Layout';
import Link from 'next/link';

const SignUp = () => {
    return (
        <Layout>
            <h2>SignUp Page</h2>
            <Link href="/">
                <a>Home</a>
            </Link>
        </Layout>
    )
}

export default SignUp;