import React, { useState } from 'react';
import './UploadBook.css'
import { useAuth } from '../contexts/AuthContext';
import { doc, setDoc } from 'firebase/firestore';
import { db, storage } from '../firebase';
import { getDownloadURL, uploadBytes, ref } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';
//import { toast } from 'react-toastify';
import { v4 } from 'uuid';

export default function UploadBook() {
  const [bookName, setBookName] = useState('');
  const [publication, setPublication] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [bookFile, setBookFile] = useState(null);
  const {currentUser} = useAuth()
  const [isSubmit, setIsSubmit] = useState(false)
  const navigate = useNavigate()

  const handleBookChange = (e) => {
    if (e.target.files[0]) {
      setBookFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmit(true)

    const bookFileRef = ref(storage, `bookfile/${currentUser.uid + v4()}`)
    
    const bookFileSnap = !bookFile ? null : await uploadBytes(bookFileRef, bookFile)
    const bookFileUrl = !bookFile ? null : await getDownloadURL(bookFileSnap?.ref)
    // upload resume to firebase storage

    // create book document in firebase firestore
    try { await setDoc(doc(db, 'books', currentUser.uid + v4()), {
      bookName,
      publication,
      authorName,
      publishYear,
      bookFileUrl,
      'userId': currentUser.uid 
    }
   
    )
    navigate(-1)
    //toast.success("Success")
    
    } catch {
      //toast.error("An Error Occured")
      
    }
  }

    return (
        <div className='main-container2'>
        <div className="container3">
      <header>Upload Book Form</header>
      <form className="form2" onSubmit={handleSubmit}>
        

        <div className="column">
        <div className="input-box">
          <label htmlFor='name'>Book Name</label>
          <input id='name' type="text" value={bookName} onChange={(e) => setBookName(e.target.value)} placeholder="Enter book name" required />
        </div>
        <div className="input-box">
            <label htmlFor='author'>Author</label>
            <input id='author' type="text" value={authorName} onChange={(e) => setAuthorName(e.target.value)} placeholder="Enter Author Name" required />
        </div>
        </div>

          <div className="column">
            <div className="input-box">
                <label htmlFor='nationality'>Publication</label>
                <input id='nationality' type="text" value={publication} onChange={(e) => setPublication(e.target.value)} placeholder="Enter Publication" required />
            </div>
            <div className="input-box">
                <label htmlFor='postalcode'>Publish Year</label>
                <input id='postalcode' type="number" value={publishYear} onChange={(e) => setPublishYear(e.target.value)} placeholder="Enter Publish Year" required />
            </div>
          </div>
        <div className="column">
          <div className="input-box">
            <label htmlFor='cv'>Upload Book</label>
            <input id='cv' className="filebox" type="file" onChange={handleBookChange} />
          </div>
        </div>
        <button type='submit' disabled={isSubmit}>Submit</button>
      </form>
    </div>
    </div>
    )
    
};
