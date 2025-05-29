import ReactPaginate from 'react-paginate';
import './Pagination.css';
export default function PaginatedItems({ setPage, itemsPerPage, totalData }) {
    
    const pageCount = Math.ceil(totalData / itemsPerPage); // Assuming you have 100 items in total
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % totalData;
        console.log(
            `User requested page number ${event.selected}, which is offset ${newOffset}`
        );

        setPage(event.selected + 1);

    };

    return (
        <>
            <ReactPaginate
                breakLabel="..."
                nextLabel=">>"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel="<<"
                renderOnZeroPageCount={null}
                containerClassName="custom-pagination color-primary d-flex justify-content-center align-items-center gap-3 mx-3 my-3"
                pageLinkClassName="pagination-circle "
                previousLinkClassName=" text-primary bg-white"
                nextLinkClassName=" text-primary bg-white"
                activeLinkClassName="pagination-active bg-primary text-white"
                disabledLinkClassName="pagination-disabled"







            />
        </>
    );
}