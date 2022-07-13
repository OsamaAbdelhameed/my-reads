import * as BookAPI from './BooksAPI';

const ShowBook = ({ b, allBooks, setAllBooks }) => {
    const onChange = async (e) => {
        if (b.shelf !== e.target.value && e.target.value !== 'none') {
            const res = await BookAPI.update(b, e.target.value);
            b.shelf = e.target.value;
            setAllBooks([...allBooks.filter(book => book.id !== b.id), b]);
            console.log(res);
        }
    }

    return <li>
        <div className="book">
            <div className="book-top">
                <div
                    className="book-cover"
                    style={{
                        width: 128,
                        height: 193,
                        backgroundImage:
                            `url(${b.imageLinks.thumbnail ? b.imageLinks.thumbnail : ''})`,
                    }}
                ></div>
                <div className="book-shelf-changer">
                    <select onClick={onChange}>
                        <option value="none" disabled>
                            Move to...
                        </option>
                        <option value="currentlyReading">
                            Currently Reading
                        </option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none" defaultChecked>None</option>
                    </select>
                </div>
            </div>
            <div className="book-title">{b.title ? b.title : 'No Title'}</div>
            <div className="book-authors">{b.authors.length >= 1 ? b.authors[0] : 'No author'}</div>
        </div>
    </li>
}

export default ShowBook;