import { useState, useEffect } from "react"
import { signup, isAuth, preSignup } from '../../actions/auth'
import Router from 'next/router';
const SignupComponent = () => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        loading: false,
        message: '',
        showForm: true
    })

    const { name, email, password, error, loading, message, showForm } = values

    useEffect(()=>{
        isAuth() && Router.push('/')
    },[])
    const handleSubmit = (e) => {
        e.preventDefault()
        // console.table( { name, email, password, error, loading, message, showForm } )
        setValues({ ...values, loading: true, error: false });
        const user = { name, email, password }
        preSignup(user).then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error })
                } else {
                    setValues({
                        ...values,
                        loading: false,
                        name: '',
                        email: '',
                        password: '',
                        error: '',
                        message: data.message,
                        showForm: false
                    });
                }
            })
    }

    const handleChange = name => (e) => {
        e.preventDefault()
        setValues({
            ...values, error: false, [name]: e.target.value
        })
    }

    const showLoading =()=>( loading ?<div className="alert alert-info">Loading...</div> : '')
    const showError =()=>( error ?<div className="alert alert-info">{error}</div> : '')
    const showMessage =()=>( message ?<div className="alert alert-info">{message}</div> : '')

    const SignupForm = () => {
        return (
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input type="text"
                        value={name}
                        placeholder="name"
                        className="form-control"
                        onChange={handleChange('name')} />
                </div>

                <div className="form-group">
                    <input type="email"
                        value={email}
                        placeholder="email"
                        className="form-control"
                        onChange={handleChange('email')} />
                </div>

                <div className="form-group">
                    <input type="password"
                        value={password}
                        placeholder="password"
                        className="form-control"
                        onChange={handleChange('password')} />
                </div>

                <div>
                    <button className="btn btn-primary">Submit</button>
                </div>
            </form>
        )
    }
    return (
        <React.Fragment>
            {showError()}
            {showLoading()}
            {showMessage()}
            {showForm && SignupForm()}
        </React.Fragment>


    )

}

export default SignupComponent;