import Layout from '../components/Layout'
import Link from 'next/link'
import SignupComponent from '../components/auth/SignupComponent'


const Signup = () => {
    return (
        <Layout>
            <h2 className="text-center">Signup pagea</h2>
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    <Link href="/">
                        <a>Home</a>
                    </Link>
                    <SignupComponent />
                </div>
            </div>
        </Layout>
    )
}

export default Signup