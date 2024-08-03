import  { createContext, useContext, useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Loading from '../components/Loading';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [initialized, setInitialized] = useState(false);
    // eslint-disable-next-line no-unused-vars
    const [loading, setLoading] = useState(true);
    const auth = getAuth();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
            setInitialized(true);  // firebase auth finished initializing
        });
        return () => unsubscribe();  // cleanup
    }, [auth]);

    return (
        <AuthContext.Provider value={{ user, initialized }}>
            {initialized ? children : <Loading/>}  
        </AuthContext.Provider>
    );
};


export default AuthProvider;
