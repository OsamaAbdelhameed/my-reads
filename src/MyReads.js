import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ShowBook from "./ShowBook";

const MyReads = ({ allBooks, setAllBooks }) => {
    const [current, setCurrent] = useState([]);
    const [wanTo, setWanTo] = useState([]);
    const [read, setRead] = useState([]);

    useEffect(() => {
        setCurrent(allBooks.filter((book) => book.shelf === 'currentlyReading'));
        setWanTo(allBooks.filter((book) => book.shelf === 'wantToRead'));
        setRead(allBooks.filter((book) => book.shelf === 'read'));
    }, [allBooks])

    return <div className="list-books">
        <div className="list-books-title">
            <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
            <div>
                <div className="bookshelf">
                    <h2 className="bookshelf-title">Currently Reading</h2>
                    <div className="bookshelf-books">
                        <ol className="books-grid">
                            {current.map((b, k) => <ShowBook key={k} b={b} title={b.title} author={(b.authors) ? b.authors[0] : 'No Author'} imageBG={(b.imageLinks && b.imageLinks.thumbnail) ? b.imageLinks.thumbnail : ''} allBooks={allBooks} setAllBooks={setAllBooks} />)}
                        </ol>
                    </div>
                </div>
                <div className="bookshelf">
                    <h2 className="bookshelf-title">Want to Read</h2>
                    <div className="bookshelf-books">
                        <ol className="books-grid">
                            {wanTo.map((b, k) => <ShowBook key={k} b={b} title={b.title} author={(b.authors) ? b.authors[0] : 'No Author'} imageBG={(b.imageLinks && b.imageLinks.thumbnail) ? b.imageLinks.thumbnail : ''} allBooks={allBooks} setAllBooks={setAllBooks} />)}
                        </ol>
                    </div>
                </div>
                <div className="bookshelf">
                    <h2 className="bookshelf-title">Read</h2>
                    <div className="bookshelf-books">
                        <ol className="books-grid">
                            {read.map((b, k) => <ShowBook key={k} b={b} title={b.title} author={(b.authors) ? b.authors[0] : 'No Author'} imageBG={(b.imageLinks && b.imageLinks.thumbnail) ? b.imageLinks.thumbnail : ''} allBooks={allBooks} setAllBooks={setAllBooks} />)}
                        </ol>
                    </div>
                </div>
            </div>
        </div>
        <div className="open-search">
            <Link to='/search'>Add a book</Link>
        </div>
    </div>
}
export default MyReads;