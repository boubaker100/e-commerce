import { useEffect, useState, useCallback } from 'react';
import { FormControl, FormSelect, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { R_ADMIN, R_PRODUCT, R_USER, R_WRITER } from '../../Api/Api';
import './Table.css';
import PaginatedItems from '../Pagination/Pagination';
import LoadingIcon from '../Loading/LodingIcon';
import { Axios } from '../../Api/Axios';
import transformDate from '../../helpers/TransformDate';

// Define the TableShow component
export default function TableShow(props) {
  const [search, setSearch] = useState("");
  const [date, setDate] = useState(""); // State for date search
  const [deletingId, setDeletingId] = useState(null);
  const [SearchLoading, setSearchLoading] = useState(false);
  const currentUser = props.currentUser || false;
  const [filterData, setFilterData] = useState([]);

  const getSearchData = useCallback(async () => {
    if (!props.searchLink) return; // Do not proceed if searchLink is not defined
    setSearchLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) {
        params.append('title', search);
      }
      if (date) {
        params.append('date', date); // Add date to params if it exists
      }

      // Only make the API call if there's at least one search parameter
      if (params.toString()) {
        const res = await Axios.post(`${props.searchLink}/search?${params.toString()}`);
        setFilterData(res.data);
      } else {
        setFilterData([]); // Clear filter data if no search params
      }
    } catch (error) {
      console.error("Error fetching search data:", error);
      setFilterData([]); // Clear data on error
    } finally {
      setSearchLoading(false);
    }
  }, [search, date, props.searchLink]);

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (search.length > 0 || date.length > 0) {
        getSearchData();
      } else {
        setFilterData([]); // Clear filterData if both search and date are empty
        setSearchLoading(false);
      }
    }, 400);

    return () => clearTimeout(debounce);
  }, [search, date, getSearchData]);

  useEffect(() => {
    if (typeof props.setTotalData === 'function') {
      // Only update totalData if a search (title or date) is active.
      // When search/date are cleared, filterData will be empty,
      // and we should not push props.setTotalData(0) to allow parent's totalData to be used.
      if (search.length > 0 || date.length > 0) {
        props.setTotalData(filterData.length);
      }
      // If search and date are empty, filterData becomes [],
      // and we don't call props.setTotalData. The parent's props.totalData should be used.
    }
  }, [filterData, search, date, props.setTotalData]);

  const page = props.page || 1;
  const limit = props.limit || 10;

  const showWichData = (search.length > 0 || date.length > 0) ? filterData : props.data;
  const paginatedData = showWichData.slice((page - 1) * limit, page * limit);

  const headerShows = props.header.map((item, index) => (
    <th key={index} className='colorTable'>{item.name}</th>
  ));


  const dataShow = paginatedData.map((item, index) => (
    <tr key={index} >
      <td > {item.id} </td>
      {props.header.map((item2, key2) => (
        <td key={key2} >
          {item2.key === "image" ? (
        <img src={item[item2.key]}
         alt={item[item2.key] || 'image'} width="200" height="150" />

          ) : item2.key === "images" ? (
            <div className='flex-wrap d-flex justify-content-start align-items-center gap-2'>
              {Array.isArray(item[item2.key]) && item[item2.key].map((img, imgIndex) => (
                <img key={imgIndex} src={img.image}
                  alt="" width="70" />))}
            </div>)
            : item2.key === "created_at" || item2.key === "updated_at"
              ? (transformDate(item[item2.key]))
              : item[item2.key] === `${R_USER}`
                ? "User"
                : item[item2.key] === `${R_WRITER}`
                  ? "Writer"
                  : item[item2.key] === `${R_ADMIN}`
                    ? "Admin"
                    : item[item2.key] === `${R_PRODUCT}`
                      ? "Product"
                      : (item[item2.key])}
          {currentUser && item[item2.key] === currentUser.name && " (You)"}
        </td>
      ))}
      <td>
        <div className='d-flex align-items-center gap-2 '>
          <Link to={`${item.id}`} >
            <FontAwesomeIcon
              fontSize={"19px"}
              color=' #038EDC'
              style={{ cursor: "pointer" }}
              icon={faPenToSquare} />
          </Link>
          {(currentUser ? currentUser.name !== item.name : true) &&
            (deletingId === item.id ? (<LoadingIcon />
            ) : (
              <FontAwesomeIcon
                onClick={async () => {
                  setDeletingId(item.id);
                  if (props.delete) {
                    await props.delete(item.id);
                  }
                  setDeletingId(null);
                }}
                fontSize={"19px"}
                // cursor={"pointer"} // Deprecated, use style
                color='red'
                style={{ cursor: "pointer" }}
                icon={faTrash} />
            ))
          }
        </div>
      </td>
    </tr>
  ));

  return (
    <div className='bg-white w-100 p-3'>
      <div className='d-flex gap-3 mb-3'>
        <FormControl
          type="search"
          placeholder="البحث بالعنوان..."
          className="w-100"
          aria-label="Search"
          onChange={(e) => {
            setSearchLoading(true);
            setSearch(e.target.value);
          }}
          value={search}
          disabled={props.loading}
        />
        <FormControl
          type="date"
          placeholder="البحث بالتاريخ..."
          className="w-100"
          aria-label="Date"
          onChange={(e) => {
            setSearchLoading(true);
            setDate(e.target.value);
          }}
          value={date}
          disabled={props.loading}
        />
      </div>

      <Table className='w-100' striped bordered hover>
        <thead >
          <tr>
            <th >id</th>
            {headerShows}
            <th >Action</th>
          </tr>
        </thead>
        <tbody>
          {props.loading || SearchLoading ? (
            <tr>
              <td colSpan={props.header.length + 2} className='text-center'>
                Loading...
              </td>
            </tr>
          ) : dataShow.length > 0 ? (
            dataShow
          ) : (
            <tr>
              <td colSpan={props.header.length + 2} className='text-center'>
                لا توجد بيانات لعرضها.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
      <div>
        <div className='d-flex justify-content-between align-items-center mt-3'>
          <div className='d-flex gap-2 '>
            <FormSelect
              value={props.limit}
              onChange={(e) => props.setLimit && props.setLimit(Number(e.target.value))}
              className='w-auto'
              aria-label="Default select example">
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </FormSelect>
          </div>
          {props.totalData > 0 && ( // Only show pagination if there's data
            <PaginatedItems
              setPage={props.setPage}
              itemsPerPage={props.limit}
              totalData={props.totalData}
            />
          )}
        </div>
      </div>
    </div>
  );
}