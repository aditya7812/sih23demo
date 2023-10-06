import { useNavigate } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"
import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import BookCard from "../BookCard";

export default function Author() {
    const navigate = useNavigate()
    const {currentUser} = useAuth()
    const [books, setBooks] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
        const q = query(collection(db, "books"), where("userId", "==", currentUser.uid));
        const querySnapshot = await getDocs(q);
        setBooks(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));  
        };
        fetchData();
  }, );
    return (
        <>
        <h2>Hello Author</h2>
        <button onClick={() => navigate("uploadbook")}>Upload Book</button>
        <div className="my__books" >
           {books.map((book) => (
                <BookCard key={book.id} bookData={book} />
                )
            )}
        </div>
        </>
    )
}