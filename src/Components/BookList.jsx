import React, { useContext, useState, useMemo } from 'react';
import BookShow from './BookShow';
import BookSearch from './BookSearch';
import './BookList.css';
import BookPagination from './BookPagenation';
import BookContext from '../context/book';

const BookList = () => {
  const { books } = useContext(BookContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(8);

  const filteredBooks = useMemo(() => {
    return books.filter((book) =>
      (book.title && book.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (book.des && book.des.toLowerCase().includes(searchTerm.toLowerCase())),
    );
  }, [books, searchTerm]);

  const searchBooks = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };
  const LastBook = currentPage * booksPerPage;
  const FirstBook = LastBook - booksPerPage;

  const currentBooks = filteredBooks.slice(FirstBook, LastBook);

  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className='book-list'>
      <BookSearch onSearch={searchBooks} />
      {currentBooks.length > 0 ? (
        <>
          {currentBooks.map((book) => (
            <BookShow key={book.id} book={book} />
          ))}
          <BookPagination
            totalBooks={filteredBooks.length}
            booksPerPage={booksPerPage}
            currentPage={currentPage}
            onPageChange={onPageChange}
          />
        </>
      ) : (
        <p>Không tìm thấy</p>
      )}
    </div>
  );
};

export default BookList;