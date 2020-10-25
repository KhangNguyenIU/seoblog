
import Link from 'next/link'
import { useState } from 'react'
import renderHTML from 'react-render-html'
import {listSearch} from '../../actions/blog'
/**
* @author
* @function Search
**/

const Search = (props) => {
    const [values, setValues] = useState({
        search: undefined,
        results: [],
        searched: false,
        message: ''
    })

    const { search, results, searched, message} = values;
    const searchSubmit =e=>{
        e.preventDefault();
        listSearch({search}).then(data=>{
            setValues({...values, searched: true, results:data, message: `${data.length} blogs found`})
        })
        console.log(results);
    }

    const handleChange = e=>{
        setValues({
            ...values, search: e.target.value, searched: false, results:[]
        })
    }

    const searchForm = ()=>(
        <form onSubmit={searchSubmit}>
            <div className="row">
                <div className="col-md-8">
                    <input type="search" 
                    className="form-control" 
                    placeholder="Search.."
                    onChange={handleChange}/>
            
                </div>

                <div className="col-md-4">
                    <button className="btn btn-block btn-outline-primary" type="submit">
                        Search
                    </button>
                </div>
            </div>
        </form>
    )

    const searchedBlogs = (results = []) => {
        return (
            <div className="jumbotron bg-white">
                {message && <p className="pt-4 text-muted font-italic">{message}</p>}
                <hr/>
                {results.map((blog, i) => {
                    return (
                        <div key={i}>
                            <Link href={`/blogs/${blog.slug}`}>
                                <a className="text-primary">{blog.title}</a>
                            </Link>
                        </div>
                    );
                })}
            </div>
        );
    };
  return(
    <div className="container-fluid">
        <div className="pt-3 pb-5">{searchForm()}</div>
        {searched && <div style={{ marginTop: '-120px', marginBottom: '-80px' }}>{searchedBlogs(results)}</div>}
    </div>
   )

 }

export default Search