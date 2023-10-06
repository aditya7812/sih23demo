export default function BookCard({bookData}) {
    return (
        <div style={{border: '4px solid black', padding: "5px"}}>
            <div>Name: {bookData?.bookName}</div>
            <div>Author:{bookData?.authorName}</div>
            <div>Publication:{bookData?.publication}</div>
            <div>Publish Year:{bookData?.publishYear}</div>
        </div>
    )
}