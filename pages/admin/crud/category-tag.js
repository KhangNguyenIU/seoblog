import Layout from '../../../components/Layout'
import Admin from '../../../components/auth/Admin';
import Link from 'next/link'
import Category from '../../../components/crud/Category';
import Tag from '../../../components/crud/Tag';


const CategoryTag = () => {

    return (
        <Layout>
            <Admin>
                <div className="row">
                    <div className="col-md-12 pt-3 pb-3"><h2>Mange Categories and Tags</h2></div>
                    <div className="col-md-6">
                       <Category/>
                    </div>
                    <div className="col-md-6">
                        <Tag/>
                    </div>
                </div>

            </Admin>

        </Layout>
    )
}

export default CategoryTag;