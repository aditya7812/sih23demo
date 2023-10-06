import { useState } from "react"
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useRole } from "../contexts/RoleContext";

export default function Login () {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {login} = useAuth()
    const {role} = useRole()
    const navigate = useNavigate()
    
    const handleOnSubmit = async (e) => {
        e.preventDefault();

        try {
            await login(email, password)
            if (role === "Author") {
                navigate("/author")
            } else if (role === "Commitee") {
                navigate("/commitee")
            } else if (role === "Reviewer") {
                navigate("/reviewer")
            }
        } catch(error) {
            console.log(error)
        }
    }

    const handleNewClick = () => {
        navigate('/signup')
    }

    return (
        <>
        <h2>Login as {role}</h2>
        <form onSubmit={handleOnSubmit}>
            <label htmlFor="email">Email:
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>
            <label htmlFor="password">
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
            <button type="submit">Submit</button>
        </form>
        <br />
        <button onClick={handleNewClick}>New to Platform</button>
        </>
    )
}