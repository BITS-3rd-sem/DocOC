import { Navigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext"

export const RequireNoAuth = ({children}) =>{
    const auth = useAuth();

    if(auth.user){
        const path = auth?.user?.roleType === "ADMIN" ? '/admin-dashboard' : auth?.user?.roleType === "DOCTOR"? '/doctor-dashboard' : '/patient-dashboard';

        return <Navigate to={path}/>
    }

    return children;
}