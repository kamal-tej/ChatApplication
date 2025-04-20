import { Link } from "react-router-dom";

export default function Connection({data}){
    console.log(data);
    return(
        <div className="flex flex-col text-white m-4 md:m-8 mx-8 md:mx-32">
            {data.map((connection,index)=> {
                return  (
                            <div className="flex flex-row justify-between bg-black p-4 m-4 rounded-2xl">
                                <ul key={index} className="flex flex-col text-start text-2xl">
                                        <li key={connection.name}>{connection.name}</li>
                                        <li key={connection.age}>{connection.age}</li>
                                        <li key={connection.gender}>{connection.gender}</li>
                                </ul>
                                <Link to={`/chat/${connection.id}`} state={{name:connection.name}}>
                                    <button className="text-orange-400 text-2xl hover:cursor-pointer border p-4 border-orange-400">Chat</button>
                                </Link>
                            </div>
                        )
            })}
        </div>
      
    )
}