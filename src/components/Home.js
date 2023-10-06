import {useNavigate} from 'react-router-dom'
import { useRole } from "../contexts/RoleContext"

export default function Home() {

    const {changeRole} = useRole()
    const navigate = useNavigate()
    const handleOnClick = (e) => {
        console.log(e.target.value)
        changeRole(e.target.value)
        navigate("/login");
    }

    return (
        <>
        <div>
            <button value="Author" onClick={handleOnClick}>Login as Author</button>
            <button value="Commitee" onClick={handleOnClick}>Login as Commitee</button>
            <button value="Reviewer" onClick={handleOnClick}>Login as Reviewer</button>
        </div>
        </>
    )
}