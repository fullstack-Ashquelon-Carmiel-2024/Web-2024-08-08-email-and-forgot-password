import {jwtDecode} from 'jwt-decode';

const userReducer = (state, action) => {

    switch(action.type) {
        case "LOGIN": {
            sessionStorage.setItem('olymp-user',action.user);
            let decoded = jwtDecode(action.user);

            return {user: {...decoded,role: decoded.role.userType}};
        }
        case "LOGOUT": {
            sessionStorage.removeItem('olymp-user');
            return {
                user: {role: 'guest'}
            };
        }
        case "CHECK_STORAGE_FOR_USER": {

            if (sessionStorage.getItem('olymp-user')) {

                let decoded = jwtDecode(sessionStorage.getItem('olymp-user'));
                return {user: {...decoded,role: decoded.role.userType}};

            } else {
                return {user: {role: 'guest'}};
            };
        }
        default: {
            return state;
        }
    }

}

export default userReducer;