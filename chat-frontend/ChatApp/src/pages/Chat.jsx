import { useLocation, useParams } from "react-router-dom";
import UserChat from "../components/UserChat";
export default function Chat(){
    const {id} = useParams();
    const location = useLocation();
    const {name} = location.state;
    console.log(id);
    return(
        <div>
            <UserChat user={id} userName={name}/>
        </div>
    )
}