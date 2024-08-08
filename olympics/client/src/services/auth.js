import axios from 'axios';
const baseAPIURL = ''

export const forgotPassword = async (formData) => {

    try {

        const result = await axios.post(`${baseAPIURL}/auth/forgot-password`,formData);
        return {status: true, msg: 'The mail have been sent successfully'}

    }catch(err) {

        console.log(e.message)
        return {status: false, msg: e.message}

    }

}