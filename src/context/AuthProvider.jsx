import { useContext, createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as authService from '~/services/authService';

const AuthContext = createContext()
export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({children}) => {
    let [user, setUser] = useState(() => localStorage.getItem('authTokens' || null))
    let [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens' || null))
    let [loading, setLoading] = useState(true)

    const navigate = useNavigate()

    let loginUser = async (formData) => {
        let data = await authService.login(formData);
        if(data){
            localStorage.setItem('authTokens',data.token);
            setAuthTokens(data.token)
            setUser(data.username)
            navigate('/')
        } else {
            alert('Something went wrong while logging in the user!')
        }
    }

    let logoutUser = () => {
        localStorage.removeItem('authTokens')
        setAuthTokens(null)
        setUser(null)
        navigate('/login')
    }

    const updateToken = async () => {
        const data = await authService.refreshToken(
            JSON.stringify({expiresInMins: 30}),
            authTokens
        );
        if (data) {
            setAuthTokens(data.token)
            setUser(data.username)
            localStorage.setItem('authTokens',data.token)
        } else {
            logoutUser()
        }

        if(loading){
            setLoading(false)
        }
    }

    let contextData = {
        user:user,
        authTokens:authTokens,
        loginUser:loginUser,
        logoutUser:logoutUser,
    }

    useEffect(()=>{
        if(loading){
            updateToken()
        }

        const REFRESH_INTERVAL = 1000 * 60 * 4
        let interval = setInterval(()=>{
            if(authTokens){
                updateToken()
            }
        }, REFRESH_INTERVAL)
        return () => clearInterval(interval)

    },[authTokens, loading])

    return(
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthProvider;
