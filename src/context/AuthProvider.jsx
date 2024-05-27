import { useContext, createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext()

export const AuthProvider = ({children}) => {

    let [user, setUser] = useState(() => localStorage.getItem('authTokens' || null))
    let [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens' || null))
    let [loading, setLoading] = useState(true)

    const navigate = useNavigate()

    let loginUser = async (formData) => {
        const response = await fetch('https://dummyjson.com/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        let data = await response.json();

        if(response.status === 200){
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
        const response = await fetch('https://dummyjson.com/auth/refresh', {
			method: 'POST',
			headers: {
			  'Content-Type': 'application/json',
			  'Authorization': `Bearer ${authTokens}`, 
			},
			body: JSON.stringify({
			  expiresInMins: 30, // optional, defaults to 60
			})
		  })
       
        const data = await response.json()
        if (response.status === 200) {
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

        const REFRESH_INTERVAL = 1000 * 60 * 4 // 4 minutes
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

export const useAuth = () => {
  return useContext(AuthContext);
};