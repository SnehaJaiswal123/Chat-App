import CheckIcon from '@mui/icons-material/Check';
import { IconButton } from '@mui/material';
function Group(){
    return(
        <div className="group">
       
            <div className="input-field">
            <input type="text" className="grp-input"/>  
            </div>
            <div>
                    <IconButton>
                            <CheckIcon/>
                    </IconButton>
            </div>
        
        </div>
    )
}
export default Group;