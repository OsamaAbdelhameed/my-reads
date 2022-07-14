// import { BiCheck } from "react-icons/bi";
import PropTypes from "prop-types";
import * as BookAPI from './BooksAPI';

const ShowBook = ({ b, title, author, imageBG, allBooks, setAllBooks }) => {
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
                        backgroundImage: `url(${imageBG})`,
                    }}
                ></div>
                <div className="book-shelf-changer">
                    <select onClick={onChange} defaultValue={b.shelf ? b.shelf : 'none'}>
                        <option value="none" disabled>
                            Move to...
                        </option>
                        <option value="currentlyReading">
                            Currently Reading
                        </option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                    </select>
                </div>
            </div>
            <div className="book-title">{title}</div>
            <div className="book-authors">{author}</div>
        </div>
    </li>
}

ShowBook.propTypes = {
    b: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    imageBG: PropTypes.string.isRequired,
    allBooks: PropTypes.array.isRequired,
    setAllBooks: PropTypes.func.isRequired,
};

export default ShowBook;