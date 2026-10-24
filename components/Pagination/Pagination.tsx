import ReactPaginate from 'react-paginate';
import css from './Pagination.module.css';

interface PaginationProps {
  totalPages: number;
  onPageChange: (page: number) => void;
  currentPage: number;
}

const Pagination = ({
  totalPages,
  onPageChange,
  currentPage,
}: PaginationProps) => {
  const handlePageClick = (event: { selected: number }) => {
    onPageChange(event.selected + 1);
  };

  return (
    <ReactPaginate
      pageCount={totalPages}
      onPageChange={handlePageClick}
      forcePage={currentPage - 1}

      containerClassName={css.container}
      pageClassName={css.pageItem}
      pageLinkClassName={css.pageLink}

      previousClassName={css.pageItem}
      previousLinkClassName={css.pageLink}

      nextClassName={css.pageItem}
      nextLinkClassName={css.pageLink}

      activeLinkClassName={css.activeLink}
      disabledLinkClassName={css.disabledLink}

      previousLabel="←"
      nextLabel="→"
    />
  );
};

export default Pagination;
