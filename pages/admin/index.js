import Layout from '../../components/Layout'
import Admin from '../../components/auth/Admin';
import Link from 'next/link'
import { NavLink } from 'reactstrap';

const AdminIndex = () => {

    return (
        <Layout>
            <Admin>
                <div className="row">
                    <div className="col-md-12 pt-3 pb-3"><h2>Dashboard</h2></div>
                    <div className="col-md-4 ">
                        <ul className="list-group">
                            <li className="list-group-item">
                                <Link href="/admin/crud/category-tag">
                                    <a>Create Category</a>
                                </Link>
                            </li>

                            <li className="list-group-item">
                                <Link href="/admin/crud/category-tag">
                                    <a>Create Tags</a>
                                </Link>
                            </li>

                            <li className="list-group-item">
                                    <a href="/admin/crud/blog">Create Blog</a>
                            </li>

                            <li className="list-group-item">
                                <Link href="/admin/crud/blogs" passHref>
                                    <a>Update and Delete blogs</a>
                                </Link>
                            </li>

                            <li className="list-group-item">
                                    <a href="/user/update">Update profile</a>
                            </li>
                           
                        </ul>
                    </div>
                    <div className="col-md-4">right</div>
                </div>

            </Admin>

        </Layout>
    )
}

export default AdminIndex;