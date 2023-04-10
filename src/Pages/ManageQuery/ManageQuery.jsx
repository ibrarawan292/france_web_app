import React, { useContext, useEffect, useState } from "react";
import Search from "../../Components/SearchComp/Search";
import Button from "../../Components/ButtonsComp/Button";
import ExportAll from "../../Components/ButtonsComp/ExportAll";
import Table from "../../Components/Table/Table";
import Pagination from "../../Components/Pagination/Pagination";
import ResultShowing from "../../Components/Pagination/ResultShowing";
import Category from "../../Components/Filters/Category";
import Country from "../../Components/Filters/Country";
import ZipCode from "../../Components/Filters/ZipCode";
import Filters from "../../Components/Filters/Filters";
import { useStateContext } from "../../contexts/ContextProvider";
import { ThemeContext } from "../../App";
import AddEditModal from "../../Components/Modals/AddEditModal";
import TotalServices from "../../TotalServices";
const ManageQuery = () => {
  const [loader, setLoader] = useState(false);
  const [showQueryModal, setShowQueryModal] = useState(false);
  const [editQueryData, setEditQueryData] = useState([]);
  const [isEditQuery, setIsEditQuery] = useState(false);

  const [zipcode, setZipcode] = useState("");
  const [category, setCategory] = useState("");
  const [country, setCountry] = useState("");

  const [data, setData] = useState("")
  // Pagination
  const [totalRecords, setTotalRecords] = useState("");
  const [record, setRecord] = useState(0);
  const [NumberOfRecordsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [goto, setGoto] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [tempData, setTempData] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
 const getQueries = async (str) => { 
    setLoader(true);
    try {
      const res = await TotalServices.getQueriesList(
        NumberOfRecordsPerPage,
        (currentPage - 1) * NumberOfRecordsPerPage,
        {
          query: searchTerm,
        }
      );
        console.log(res.data)
      if (res.data.status === 200) {
        if (res.data.pages === 1) {
          setCurrentPage(1);
        }
        setLoader(false);
        setData(res.data.user_queries);
        setTotalPages(res.data.pages);
        if (searchTerm === "") {
          setTempData(res);
        }
        setTotalRecords(res.data.total_records);
      } else if (res.data.status !== 200) {
        document.getElementById("error").style.display = "block";
      }
    } catch (error) {
      console.log("error ", error);
    }
  };

  useEffect(() => {
    getQueries();
  }, [ searchTerm, currentPage]);

  // ADD Query API STARTS
  // const CreateQuery = async () => {
  //   console.log(Category.label);

  //   console.log(QueryText);

  //   let data = {
  //     url: QueryText,
  //     category: Category.label,
  //     region: Region.label,
  //   };

  //   if (Category === [] || QueryText === "" || Region === []) {
  //     toast.error("Fields must not be empty!!");
  //   } else {
  //     try {
  //       const res = await TotalServices.CreateUserQuery(data);
  //       console.log(res);
  //       if (res.status === 200) {
  //         toast.success("Query Created Successfully");
  //         getQueries();
  //         setShowModal(false);
  //       } else if (res.data.status !== 200) {
  //         toast.error("Ops! some error occurred!!");
  //       }
  //     } catch (error) {
  //       console.log("error ", error);
  //     }
  //   }
  // };
  // ADD Query API ENDS

  // DELETE QUERY API STARTS
  // const UserDeleteQuery = async (id) => {
  //   try {
  //     const res = await TotalServices.UserDeleteQuery(id);
  //     console.log(res);
  //     if (res.status === 200) {
  //       toast.success("Query Deleted Successfully");
  //       getQueries();
  //     } else if (res.data.status !== 200) {
  //       toast.error("Ops! some error occurred!!");
  //     }
  //   } catch (error) {
  //     console.log("error ", error);
  //   }
  // };

  // DELETE QUERY API ENDS

  // const ExportCSVAll = async () => {
  //   try {
  //     const res = await TotalServices.DownloadAllQueries();
  //     if (res.status === 200) {
  //       var a = document.createElement("a");

  //       var binaryData = [];
  //       binaryData.push(res.data);
  //       a.href = window.URL.createObjectURL(
  //         new Blob(binaryData, { type: "text/csv" })
  //       );
  //       a.download = "All Queries";
  //       a.click();
  //     } else if (res.data.status !== 200) {
  //       document.getElementById("error").style.display = "block";
  //     }
  //   } catch (error) {
  //     console.log("error ", error);
  //   }
  // };

  // const ExportCSV = async (queryid) => {
  //   try {
  //     const res = await TotalServices.DownloadQuery(queryid);
  //     if (res.status === 200) {
  //       var a = document.createElement("a");

  //       var binaryData = [];
  //       binaryData.push(res.data);
  //       a.href = window.URL.createObjectURL(
  //         new Blob(binaryData, { type: "text/csv" })
  //       );
  //       a.download = "Single Query";
  //       a.click();
  //     } else if (res.data.status !== 200) {
  //       document.getElementById("error").style.display = "block";
  //     }
  //   } catch (error) {
  //     console.log("error ", error);
  //   }
  // };

  // useEffect(() => {
  //   setAddButton("Download All");
  // }, []);

  const options = {
    zipcodes: ["10001", "10002", "10003", "10004"],
    categories: ["Category 1", "Category 2", "Category 3", "Category 4"],
    countries: ["USA", "Canada", "Mexico", "France"],
  };

 

  const handleZipcodeChange = (event) => {
    setZipcode(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleCountryChange = (event) => {
    setCountry(event.target.value);
  };

  const handleShowAddQueryModal = () => {
    setShowQueryModal(true);
    setIsEditQuery(false);
    setEditQueryData(null);
  };

  const handleShowEditModal = (data) => {
    console.log(data);
    setShowQueryModal(true);
    setEditQueryData(data);
    setIsEditQuery(true);
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
  };
  return (
    <>
      <section class=" w-[90%]  py-3 sm:py-5">
        <div class="px-4 mx-auto max-w-screen-2xl lg:px-12">
          <div class="relative overflow-hidden  sm:rounded-lg">
            <div class="flex flex-col px-4 py-3 space-y-3 lg:flex-row lg:items-center lg:justify-between lg:space-y-0 lg:space-x-4">
              <div class="flex items-center flex-1 space-x-4">
                {/* search component--->> */}
                <Search onSearch={handleSearch} />
              </div>

              <div class="relative flex flex-col flex-shrink-0 space-y-3 md:flex-row md:items-center lg:justify-end md:space-y-0 md:space-x-3">
                {/* create query button-->> */}
                <Button
                  title={"Create Query"}
                  handleShowModal={handleShowAddQueryModal}
                />
                {/* export all button-->> */}
                <ExportAll />
              </div>
            </div>

            <div class="flex flex-col px-4 py-3 space-y-3 lg:flex-row lg:items-center lg:justify-between lg:space-y-0 lg:space-x-4">
              <div class="flex items-center flex-1 space-x-4"></div>

              <div class="relative flex flex-col flex-shrink-0 space-y-3 md:flex-row md:items-center lg:justify-end md:space-y-0 md:space-x-3">
                {/* Filters--->> */}
                <Filters
                  label="Categories"
                  options={options.categories}
                  value={category}
                  onChange={handleCategoryChange}
                />
                <Filters
                  label="Countries"
                  options={options.countries}
                  value={country}
                  onChange={handleCountryChange}
                />
                <Filters
                  label="Zipcode"
                  options={options.zipcodes}
                  value={zipcode}
                  onChange={handleZipcodeChange}
                />
              </div>
            </div>
            <div class="overflow-x-auto">
              {/* query table---->> */}
              <Table
                queryData={data}
                handleShowEditModal={handleShowEditModal}
                loader={loader}
                setLoader={setLoader}
                getQueryData={getQueries}
              />
            </div>
            <nav
              class="flex flex-col items-start justify-between p-4 space-y-3 md:flex-row md:items-center md:space-y-0"
              aria-label="Table navigation"
            >
              <ResultShowing />
              <ul class="inline-flex items-stretch -space-x-px">
                <Pagination
                  totalRecords={totalRecords}
                  setRecord={setRecord}
                  record={record}
                  NumberOfRecordsPerPage={NumberOfRecordsPerPage}
                  setCurrentPage={setCurrentPage}
                  currentPage={currentPage}
                  setGoto={setGoto}
                  goto={goto}
                  totalPages={totalPages}
                />
              </ul>
            </nav>
            {showQueryModal ? (
              <AddEditModal
                setShowQueryModal={setShowQueryModal}
                editQueryData={editQueryData}
                isEditQuery={isEditQuery}
                getQueryData={getQueries}
              />
            ) : null}
          </div>
        </div>
      </section>
    </>
  );
};

export default ManageQuery;
