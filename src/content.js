import { useContext, createContext } from "react";

const AppContext = createContext();
const AppProvider = ({ children }) => {


  return <AppContext.Provider value={'hi'}>{children}</AppContext.Provider>;
};
export default AppProvider
export const useGlobalContext = ()=>{
    return useContext(AppContext)
}