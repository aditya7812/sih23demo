import { useState } from "react"
import { db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { useAuth } from "../contexts/AuthContext";
import { useRole } from "../contexts/RoleContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {signup} = useAuth()
    const {role} = useRole()
    const navigate = useNavigate()


    const handleOnSubmit = async (e) => {
        e.preventDefault();

        try {
            const userCredential = await signup(email, password)
            console.log(userCredential)
            const docRef = await setDoc(doc(db, "users", userCredential.user.uid), {
                email,
                role
            });
            if (role === "Author") {
                navigate("/author")
            } else if (role === "Commitee") {
                navigate("/commitee")
            } else if (role === "Reviewer") {
                navigate("/reviewer")
            }
            console.log(docRef)
        } catch(error) {
            alert("Error")
            console.log(error)
        }
    }

    return (
        <>
        <h2>Join as {role}</h2>
        <form onSubmit={handleOnSubmit}>
            <label htmlFor="email">Email:
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>
            <label htmlFor="password">
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
            <button type="submit">Submit</button>
        </form>
        </>
    )
}