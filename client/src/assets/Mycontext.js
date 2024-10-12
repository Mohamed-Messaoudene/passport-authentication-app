import { createContext, useContext } from "react";


const myContext = createContext();
const  useSnackbarContext = ()=>{
    const context = useContext(myContext);
    return context;
}
export {useSnackbarContext,myContext};
