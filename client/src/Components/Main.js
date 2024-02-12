
import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar";
function Main(){
    return(
        <div className="Main-main">
            <Sidebar/>
            <Outlet/>      
        </div>
    )
}
export default Main;