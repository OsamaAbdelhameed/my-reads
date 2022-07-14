import { useState } from "react";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import * as BookAPI from './BooksAPI';
import ShowBook from "./ShowBook";

const Search = ({ allBooks, setAllBooks }) => {
    const MySwal = withReactContent(Swal);
    const [searchedBooks, setSearchedBooks] = useState([]);

    const onSearch = async (e) => {
        setSearchedBooks([]);
        // console.log(e.target.value);
        if (e.target.value !== '') {
            try {
                const res = await BookAPI.search(e.target.value, 12);
                let existed = allBooks.filter(b => b.title.toLowerCase().includes(e.target.value.toLowerCase()));
                // console.log(res);
                // console.log(existed);
                setSearchedBooks([...existed, ...res]);
                // console.log(searchedBooks);
            } catch (e) {
                MySwal.fire({
                    icon: 'error',
                    title: `${e}`,
                    showConfirmButton: false,
                    timer: 2000
                })
            }
        }
    }

    return <div className="search-books">
        <div className="search-books-bar">
            <Link
                className="close-search"
                to='/'
            >
                Close
            </Link>
            <div className="search-books-input-wrapper">
                <input
                    type="text"
                    onChange={onSearch}
                    placeholder="Search by title, author, or ISBN"
                />
            </div>
        </div>
        <div className="search-books-results">
            <ol className="books-grid">{(searchedBooks && searchedBooks.length !== 0) ?
                searchedBooks.map((b, k) =>
                    <ShowBook key={k} b={b} title={b.title} author={(b.authors) ? b.authors[0] : 'No Author'} imageBG={(b.imageLinks && b.imageLinks.thumbnail) ? b.imageLinks.thumbnail : ''} allBooks={allBooks} setAllBooks={setAllBooks} searchedBooks={searchedBooks} />)
                : (<>No Element Exist</>)}</ol>
        </div>
    </div>
}
export default Search;