const defaultState = {
    users: [],
    user: { userName: '', userId: '', isAuthenticated: '', numberOfCompanies: '' },
    loading: false,
    isAuthenticated: true,
    loginModel: { userName: '', password: '' },
    isSignupGood: '',
    errorMessage: '',
    errors: {},
    loaderInfo: {
        progressBarValue: 0,
        isloading: false,
        loadingMessage: '',
        loginSuccess: ''
    },
    userSchema: {

        firstName: '',
        lastName: '',
        userName: '',
        email: '',
        password: '',
        activationCode: '',
        isActivated: '',
        numberOfCompanies: '',
        RoleName: '',
        RoleId: '',

    }
}

export default (state = defaultState, action = {}) => {
    switch (action.type) {

            
        case 'FETCH_USERS_FULFILLED': {
            return {
                ...state,
                users: action.payload.data.data,
                loading: false,
                errors: {}
            }
        }

        case 'FETCH_USERS_PENDING': {
            return {
                ...state,
                loading: true,
                errors: {}
            }
        }

        case 'PROG_INC': {


            var iVal = Number(state.loaderInfo.progressBarValue) + Number(action.payload);

            return {
                ...state,
                loaderInfo: {
                    progressBarValue: iVal,
                    isloading: false,
                    loadingMessage: '',
                    loginSuccess: ''
                }
            }
        }

        case 'SET_LOGIN': {
            var tempLoginModel = {
                userName: action.payload.userName, password: action.payload.password
            };
            return {
                ...state,
                loginModel: tempLoginModel
            }
        }


        case 'RESET_FLAG': {

            return {
                ...state,
                isSignupGood: ''
            }
        }


        case 'FETCH_USERS_REJECTED': {
            return {
                ...state,
                loading: false,
                errors: { global: action.payload.message }
            }
        }

        case 'SET_USERNAME': {
            return {
                ...state,
                uName: action.payload
            }
        }


        case 'GET_USERNAME': {
            return state;
        }



        case 'NEW_USER': {
            return {
                ...state,
                user: { name: {} }
            }
        }

        case 'SAVE_USER_PENDING': {
            return {
                ...state,
                loading: true
            }
        }

        case 'SAVE_USER_FULFILLED': {

            return {
                ...state,
                users: [...state.users, action.payload.data],
                user: action.payload.data,
                userName: action.payload.data.userName,
                isSignupGood: action.payload.data._id.length > 0 ? 'true' : 'false',
                errors: {},
                loading: false
            }
        }



        case 'SAVE_USER_REJECTED': {

            var errMsg = '';
            //action.payload.response.data.message.indexOf('email dup key') > 1 ==>> means email exists
            if (action.payload.response.data.message.indexOf('email dup key') > 1) {
                errMsg = 'This email is already exists.';
            }
            //action.payload.response.data.message.indexOf('userName dup key') > 1  == means userName exists
            if (action.payload.response.data.message.indexOf('userName dup key') > 1) {
                errMsg = 'This username is already taken.';
            }

            const data = action.payload.response.data;

            // convert feathers error formatting to match client-side error formatting

            const { "name.first": first, "name.last": last, phone, email } = data.errors;
            const errors = { global: data.message, name: { first, last }, phone, email };


            return {
                ...state,
                errors: errors,
                isSignupGood: 'false',
                errorMessage: errMsg,
                loading: false
            }
        }




        case 'LOGIN_USER_PENDING': {
            return {
                ...state,
                loading: true,
                user: { name: {} }
            }
        }

        case 'LOGIN_USER_FULFILLED': {

            var user = {
                userName: '',
                userId: '',
                isAuthenticated: ''
            };
            var loginUserName = action.payload.data.data.loginUser.userName;
            var loginUserPassword = action.payload.data.data.loginUser.password;
            if (action.payload.data.data.userName === loginUserName) {
                if (action.payload.data.data.password === loginUserPassword) {

                    user = {
                        userName: action.payload.data.data.userName,
                        userId: action.payload.data.data._id,
                        isAuthenticated: 'true'
                    }
                }
            }

            return {
                ...state,
                errors: {},
                loading: false,
                user: user

            }
        }



        case 'FETCH_USER_PENDING': {

            return {
                ...state,
                loading: true,
                user: {}
            }
        }

        case 'SET_USER_FROM_SESSION': {
            return {
                ...state,
                user: action.payload.length > 0 ? JSON.parse(action.payload) : ''
            }

        }

        case 'FETCH_USER_FULFILLED': {
            var loggedInUser = {
                userName: '',
                userId: '',
                numberOfCompanies: '',
                isAuthenticated: ''
            };


            var userSchema = {
                firstName: '',
                lastName: '',
                userName: '',
                email: '',
                password: '',
                activationCode: '',
                isActivated: '',
                numberOfCompanies: '',
                RoleName: '',
                RoleId: ''
            };

            if (action.payload.data.data.length) {
                if ((action.payload.data.data[0].userName === state.loginModel.userName) && (action.payload.data.data[0].password === state.loginModel.password)) {

                    userSchema = {
                        id: action.payload.data.data[0]._id,
                        firstName: action.payload.data.data[0].firstName,
                        lastName: action.payload.data.data[0].lastName,
                        userName: action.payload.data.data[0].userName,
                        email: action.payload.data.data[0].email,
                        password: action.payload.data.data[0].password,
                        activationCode: action.payload.data.data[0].activationCode,
                        isActivated: action.payload.data.data[0].isActivated,
                        numberOfCompanies: action.payload.data.data[0].numberOfCompanies,
                        RoleName: action.payload.data.data[0].RoleName,
                        RoleId: action.payload.data.data[0].RoleId
                    }

                    loggedInUser = {
                        userName: action.payload.data.data[0].userName,
                        userId: action.payload.data.data[0]._id,
                        numberOfCompanies: action.payload.data.data[0].numberOfCompanies,
                        isAuthenticated: 'true'
                    }
                }

                sessionStorage.setItem('user', JSON.stringify(loggedInUser));
                sessionStorage.setItem('userSchema', JSON.stringify(userSchema));
            }
            else {
                loggedInUser = {
                    userName: '',
                    numberOfCompanies: '',
                    userId: '',
                    isAuthenticated: 'false'
                }
            }

            return {
                ...state,
                userSchema: userSchema,
                user: loggedInUser,
                errors: {},
                loading: false
            }
        }

        case 'UPDATE_USER_PENDING': {
            return {
                ...state,
                loading: true
            }
        }

        case 'UPDATE_USER_FULFILLED': {
            const user = action.payload.data;
            return {
                ...state,
                users: state.users.map(item => item._id === user._id ? user : item),
                errors: {},
                loading: false
            }
        }

        case 'UPDATE_USER_REJECTED': {
            const data = action.payload.response.data;
            const { "name.first": first, "name.last": last, phone, email } = data.errors;
            const errors = { global: data.message, name: { first, last }, phone, email };
            return {
                ...state,
                errors: errors,
                loading: false
            }
        }

        case 'DELETE_USER_FULFILLED': {
            const _id = action.payload.data._id;
            return {
                ...state,
                users: state.users.filter(item => item._id !== _id)
            }
        }

        default:
            return state;
    }
}
