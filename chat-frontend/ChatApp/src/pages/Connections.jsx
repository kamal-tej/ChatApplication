import Connection from "../components/Connection"
import {connections} from "../assets/ConnectionsList"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
export default function Connections(){
    return(
        <div className="flex flex-col justify-center">
            <Connection data={connections}/>
        </div>
    )
}