import React, { useState } from 'react';
import Link from 'next/link'
import NProgress from 'nprogress'
import { APP_NAME } from '../config'
import { signout, isAuth } from '../actions/auth'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
    NavLink,

} from 'reactstrap';
import Router from 'next/router';
import Search from '../components/blog/Search'
Router.onRouteChangeStart = url => NProgress.start();
Router.onRouteChangeComplete = url => NProgress.done();
Router.onRouteChangeError = url => NProgress.done();

const Header = () => {

    const [isOpen, setIsOpen] = useState(false)

    const toggle = () => {
        setIsOpen(!isOpen)
    }

    return (
        <React.Fragment>
            <Navbar color="light" light expand="md">
                <Link href='/'>
                    <NavLink className='font-weight-bold'>{APP_NAME}</NavLink>
                </Link>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <React.Fragment>
                            <NavItem>
                                <Link href="/blogs">
                                    <NavLink>Blogs</NavLink>
                                </Link>
                            </NavItem>

                            <NavItem>
                                <Link href="/contact">
                                    <NavLink>Contact</NavLink>
                                </Link>
                            </NavItem>

                        </React.Fragment>
                        {
                            !isAuth() && (
                                <React.Fragment>
                                    <NavItem>
                                        <Link href="/signup">
                                            <NavLink>Sign up</NavLink>
                                        </Link>
                                    </NavItem>

                                    <NavItem>
                                        <Link href="/signin">
                                            <NavLink>Sign in</NavLink>
                                        </Link>
                                    </NavItem>
                                </React.Fragment>
                            )
                        }

                        {
                            isAuth() &&
                            (<NavItem>
                                <NavLink style={{ cursor: 'pointer' }}
                                    onClick={() => signout(() => Router.replace('/signin'))}>
                                    Signout
                            </NavLink>
                            </NavItem>)
                        }


                        {
                            (isAuth() && isAuth().role == 1) && (
                                <NavItem>
                                    <Link href="/admin">
                                        <NavLink style={{ cursor: 'pointer' }}>{isAuth().name}'s Dashboard</NavLink>
                                    </Link>
                                </NavItem>
                            )
                        }

                        {
                            (isAuth() && isAuth().role == 0) && (
                                <NavItem>
                                    <Link href="/user">
                                        <NavLink style={{ cursor: 'pointer' }}>{isAuth().name}'s Dashboard</NavLink>
                                    </Link>
                                </NavItem>
                            )
                        }
                    <NavItem>
                    
                            <a href="/user/crud/blog" className="btn btn-primary text-light">Write a Blog</a>
                  
                    </NavItem>

                    </Nav>

                </Collapse>
            </Navbar>
            <Search />
        </React.Fragment>
    )
}

export default Header;