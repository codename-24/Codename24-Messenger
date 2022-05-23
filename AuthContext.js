import {createContext, useReducer} from "react"
import AuthReducer from "./AuthReducer";
const INITIAL_STATE = {
    user: {
        _id: "628aef24bd771393c27659aa",
        username:"yoda",
        email:"yoda@gmail.com",
        profilePicture:"profile_pic/yoda.jpg",
        coverPicture: "",
        followers:[],
        following:[],
        isAdmin:false,
    },
    isFetching: false,
    error: false
};

export const AuthContext = createContext(INITIAL_STATE);
export const AuthContextProvider = ({children}) =>{
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

    return(
        <AuthContext.Provider value = {{
            user:state.user, 
            isFetching:state.isFetching,
            error:state.error,
            dispatch
        }}
        >
            {children}
        </AuthContext.Provider>
    )
}