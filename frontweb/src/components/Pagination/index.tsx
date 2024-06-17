import './styles.css';

import { FaAngleRight } from 'react-icons/fa';
import ReactPaginate from 'react-paginate';

type Props = {
  pageCount: number;
  range: number;
  onChange?: (pageNumber: number) => void;
  forcePage?: number
};

const Pagination = ({ pageCount, range, onChange, forcePage }: Props) => {
  return (
    <ReactPaginate
    forcePage={forcePage}
      pageCount={pageCount}
      pageRangeDisplayed={range}
      marginPagesDisplayed={1}
      containerClassName="pagination-container"
      pageLinkClassName="pagination-item"
      breakClassName="pagination-item"
      previousClassName="arrow-previous"
      nextClassName="arrow-next"
      activeLinkClassName="pagination-link-active"
      disabledClassName="arrow-inactive"
      previousLabel={<div className="pagination-arrow-container" data-testid='arrow-previous'><FaAngleRight /></div>}
      nextLabel={<div className="pagination-arrow-container" data-testid='arrow-next'><FaAngleRight /></div>}
      onPageChange={(items) => (onChange ? onChange(items.selected) : {})}
    />
  );
};

export default Pagination;