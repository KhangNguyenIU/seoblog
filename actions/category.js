import { API } from '../config'
import fetch from 'isomorphic-fetch'
import cookie from 'js-cookie'
import { handleResponse } from './auth'


export const create =(category, token)=>{
    return fetch(`${API}/category`,{
        method: 'POST',
        headers: {
            Accept: 'Application/json',
            'Content-Type': 'Application/json',
            'Authorization' : `Bearer ${token}`
        },
        body: JSON.stringify(category)
    }).then(response=>{
        handleResponse(response)
        return response.json()
    }).catch(err=>{
        console.log(err);
    })
}

export const getCategories =()=>{
    return fetch(`${API}/categories`,{
        method: 'GET'
    }).then(response=>{
       // handleResponse(response)
        return response.json()
    }).catch(err=>{
        console.log(err);
    })
}

export const singleCategory =(slug)=>{
    return fetch(`${API}/category/${slug}`,{
        method: 'GET'
    }).then(response=>{
        return response.json()
    }).catch(err=>{
        console.log(err);
    })
}

export const removeCategory =(slug, token)=>{
    return fetch(`${API}/category/${slug}`,{
        method: 'DELETE',
        headers: {
            Accept: 'Application/json',
            'Content-Type': 'Application/json',
            'Authorization' : `Bearer ${token}`
        }
    }).then(response=>{
        handleResponse(response)
        return response.json()
    }).catch(err=>{
        console.log(err);
    })
}