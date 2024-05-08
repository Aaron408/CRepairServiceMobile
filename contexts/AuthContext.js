// AuthContext.js
import React, { createContext, useReducer, useMemo } from "react";

const AuthContext = createContext();

export const useAuth = () => React.useContext(AuthContext);

export const AuthProvider = ({children}) => {
    const [state, dispatch] = useReducer((prevState, action) => {
        switch (action.type) {
            case 'SIGN_IN':
                return {
                    ...prevState,
                    userToken: action.token,
                    isSignOut: false
                }
            case 'SIGN_OUT':
                return {
                    ...prevState,
                    userToken: null,
                    isSignOut: true,
                }
            case 'RESTORE_TOKEN':
                return {
                    ...prevState,
                    userToken: action.token,
                    isLoading: false
                }
            default:
                return prevState;
        }
    }, {
        userToken: null,
        isSignOut: false,
        isLoading: true
    });

    const authContext = useMemo(() => ({
        state,
        signIn: async (data) => {
            // Logic for log in
            console.log(data);
            dispatch({ type: 'SIGN_IN', token: 'pollito' });
            console.log('INICIO SESION UN cabron');
        },
        signOut: () => {
            // Logic for close session delete no necessary items
            dispatch({ type: 'SIGN_OUT' })
            console.log('CERROOOOO SESION UN cabron');
        },
        signUp: async (data) => {
            // Logic for sign up
            dispatch({ type: 'SIGN_IN', token: 'pollito' });
        }
    }), [state]);

    return (
        <AuthContext.Provider value={authContext}>
            {children}
        </AuthContext.Provider>
    )
}
