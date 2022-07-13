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
        // setSearchedBooks([]);
        console.log(e.target.value);
        if (e.target.value !== '') {
            try {
                const res = await BookAPI.search(e.target.value.toLowerCase(), 12);
                if (res.isArray()) {
                    setSearchedBooks([...allBooks.filter(b => b.title.toLowerCase().includes(e.target.value.toLowerCase()) || b.authors[0].toLowerCase().includes(e.target.value.toLowerCase())), ...res])
                    console.log(res);
                    console.log(searchedBooks);
                } else if (res.error) {
                    MySwal.fire({
                        icon: 'error',
                        title: `${res.error}`,
                        showConfirmButton: false,
                        timer: 2000
                    })
                    console.log(res);
                }
            } catch (e) {
                MySwal.fire({
                    icon: 'error',
                    title: 'Please Type More',
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
            <ol className="books-grid">{searchedBooks.length !== 0 ? searchedBooks.map((b, k) => <ShowBook key={k} b={b} allBooks={allBooks} setAllBooks={setAllBooks} searchedBooks={searchedBooks} />) : (<>No Element Exist</>)}</ol>
        </div>
    </div>
}
export default Search;