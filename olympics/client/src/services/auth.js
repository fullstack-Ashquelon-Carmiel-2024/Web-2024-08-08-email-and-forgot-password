import axios from 'axios';

const baseAPIURL = 'http://localhost:3555/api';

export const login = async (formData,dispatchUser) => {

    try {

        const result = await axios.post(`${baseAPIURL}/auth/login`,formData);
        dispatchUser({type:'LOGIN',user:result.data.accessToken})

        return {status: true, msg: 'The login is successful'}

    }catch(err) {

        console.log(err.message)
        return {status: false, msg: err.message}

    }

}

export const forgotPassword = async (formData) => {

    try {

        const result = await axios.post(`${baseAPIURL}/auth/forgot-password`,formData);
        return {status: true, msg: 'The mail have been sent successfully'}

    }catch(err) {

        console.log(e.message)
        return {status: false, msg: e.message}

    }

}

export const logout = async (dispatchUser) => {

    try {

        const result = await axios.post(`${baseAPIURL}/auth/logout`);
        dispatchUser({type:'LOGOUT'})
        return {status: true, msg: 'Logged out successfully'}

    }catch(err) {

        console.log(e.message)
        return {status: false, msg: e.message}

    }

}