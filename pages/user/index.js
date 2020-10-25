import Layout from '../../components/Layout'
import Private from '../../components/auth/private';
import Link from 'next/link'

const UserIndex = () => {

    return (
        <Layout>
            <Private>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12 pt-3 pb-3"><h2>Dashboard</h2></div>
                        <div className="col-md-4 ">
                            <ul className="list-group">

                                <li className="list-group-item">
                                    <a href="/user/crud/blog">Create Blog</a>
                                </li>

                                <li className="list-group-item">
                                    <Link href="/user/crud/blogs" passHref>
                                        <a>Update and Delete blogs</a>
                                    </Link>
                                </li>

                                <li className="list-group-item">
                                    <a href="/user/update">Update Profile</a>
                                </li>

                            </ul>
                        </div>
                        <div className="col-md-4">right</div>
                    </div>

                </div>
            </Private>

        </Layout>
    )
}

export default UserIndex;