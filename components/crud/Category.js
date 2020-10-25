const { useState, useEffect } = require("react")
const { getCookie } = require("../../actions/auth")
const { create, getCategories, removeCategory } = require('../../actions/category')

const Category = () => {
    const [values, setValues] = useState({
        name: '',
        error: false,
        success: false,
        categories: [],
        removed: false,
        reload: false
    })
    const { name, error, success, categories, removed, reload } = values
    const token = getCookie('token')
    const loadCategories = () => {
        getCategories().then(data => {
            if (data.error) {
                console.log(data.error);
                //  setValues({...values, error:data.error})
            } else {
                setValues({ ...values, categories: data })
            }
        })
    }

    useEffect(() => {
        loadCategories()
    }, [reload])

    const showCategories = () => {
        return categories.map((c, i) => {
            return (
                <button key={i}
                    title="Double click to delete"
                    onDoubleClick={() => deleteConfirm(c.slug)}
                    className="btn btn-outline-secondary mr-1 ml-1 mt-3 rounded-pill">
                    {c.name}
                </button>
            )
        })
    }

    const showSuccess = () => {
        if (success) {
            return <p className="text-success">Category is created</p>;
        }
    };

    const showError = () => {
        if (error) {
            return <p className="text-danger">Category already exist</p>;
        }
    };

    const showRemoved = () => {
        if (removed) {
            return <p className="text-danger">Category is removed</p>;
        }
    };

    const mouseMoveHandler = e => {
        setValues({ ...values, error: false, success: false, removed: '' });
    };

    const deleteConfirm = slug => {
        let answer = window.confirm("Are you sure to delete this item")
        if (answer) {
            deleteCategory(slug)
        }
    }

    const deleteCategory = slug => {
        removeCategory(slug, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setValues({ ...values, error: false, success: false, removed: !removed, reload: !reload })
            }
        })
    }
    const clickSubmit = (e) => {
        e.preventDefault()
        create({ name }, token).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, success: false })
            } else {
                setValues({ ...values, error: false, success: true, name: '', reload: !reload })
            }
        })
    }

    const handleChange = (e) => {
        setValues({
            ...values, name: e.target.value,
            error: false, success: false, removed: ''
        })
    }
    //form
    const newCategoryForm = () => (
        <form onSubmit={clickSubmit}>
            <div>
                <label className="text-muted">Name</label>
                <input
                    type="text"
                    className="form-control"
                    onChange={handleChange}
                    value={name}
                    required />
            </div>

            <div style={{display:'flex',justifyContent:'center', paddingTop:'20px'}}>
                <button type="submit" className="btn btn-primary">Create</button>
            </div>

        </form>

    )


    return (
        <React.Fragment>
            <div style={{height:'30px', width:'full'}}>
                {showSuccess()}
                {showError()}
                {showRemoved()}
            </div>

            <div onMouseMove={mouseMoveHandler}>
                {newCategoryForm()}
                {showCategories()}
            </div>
        </React.Fragment>
    )
}

export default Category;