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
  const [editQueryId, setEditQueryId] = useState("");
  // const [zipcode, setZipcode] = useState("");
  const [zipcodeList, setZipCodeList] = useState([]);
  // const [category, setCategory] = useState("");
  // const [country, setCountry] = useState("");
  const [zipcodeFilter, setZipCodeFilter] = useState([]);
  const [locationFilter, setLocationFilter] = useState([]);
  const [data, setData] = useState("");
  // Pagination
  const [totalRecords, setTotalRecords] = useState("");
  const [record, setRecord] = useState(0);
  const [NumberOfRecordsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [goto, setGoto] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [tempData, setTempData] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const Locations = [
    { label: "USA", value: "USA"},
    { label: "CANADA", value: "CANADA" },
    { label: "FRANCE", value: "FRANCE" },
    { label: "AMERICA", value: "AMERICA" },
  ];

  const handleZipcodeChange = (selectedOption) => {
    console.log(selectedOption)
    let zipArr = []
    selectedOption.map((item) => {
      zipArr.push(item.value)
    }) ;
    setZipCodeFilter(zipArr);
   
  };

  const handleLocationChange = (selectedOption) => {
    console.log(selectedOption)
    let locArr = []
    selectedOption.map((item) => {
      return (
      locArr.push(item.value)
      )
    });
    setLocationFilter(locArr);
  };

  const getQueries = async () => {
    setLoader(true);
    console.log(locationFilter, zipcodeFilter)
    try {
      const res = await TotalServices.getQueriesList(
        NumberOfRecordsPerPage,
        (currentPage - 1) * NumberOfRecordsPerPage,
        {
          query: searchTerm,
          location: locationFilter,
          zipcodes: zipcodeFilter
        }
      );
      console.log(res.data);
      if (res.data.status === 200) {
        if (res.data.pages === 1) {
          setCurrentPage(1);
        }
        setLoader(false);
        setData(res.data.user_queries);
        setTotalPages(res.data.pages);
        if (searchTerm === "") {
          setCurrentPage(1)
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
  }, [searchTerm, currentPage, locationFilter, zipcodeFilter]);

  const getZipCodeList = async () => {
    setLoader(true);
    console.log(searchTerm);
    try {
      const res = await TotalServices.getZipCode(
        NumberOfRecordsPerPage,
        (currentPage - 1) * NumberOfRecordsPerPage,
        {
          keyword: searchTerm,
        }
      );
      console.log(res, "res");
      if (res.data.status === 200) {
        if (res.data.pages === 1) {
          setCurrentPage(1);
        }
        setLoader(false);
        setZipCodeList(res.data.zipcodes);
        setTotalPages(res.data.pages);
        if (searchTerm === "") {
          setCurrentPage(1)
        }
        setTotalRecords(res.data.total_records);
        // setTempData(res);
        // setTempDataValue(res.data.plans);
        setLoader(false);
      } else if (res.data.status !== 200) {
        document.getElementById("error").style.display = "block";
      }
    } catch (error) {
      console.log("error ", error);
    }
  };

  useEffect(() => {
    getZipCodeList();
  }, [searchTerm, currentPage, locationFilter, zipcodeFilter]);
 

  const ExportCSVAll = async () => {
    try {
      const res = await TotalServices.downloadAllQuery();
      if (res.status === 200) {
        var a = document.createElement("a");

        var binaryData = [];
        binaryData.push(res.data);
        a.href = window.URL.createObjectURL(
          new Blob(binaryData, { type: "text/csv" })
        );
        a.download = "All Queries";
        a.click();
      } else if (res.data.status !== 200) {
        document.getElementById("error").style.display = "block";
      }
    } catch (error) {
      console.log("error ", error);
    }
  };

  const ExportCSV = async (queryid) => {
    console.log(queryid)
    try {
      const res = await TotalServices.downloadQuery(queryid);
      console.log(res)
      if (res.status === 200) {
        var a = document.createElement("a");

        var binaryData = [];
        binaryData.push(res.data);
        a.href = window.URL.createObjectURL(
          new Blob(binaryData, { type: "text/csv" })
        );
        a.download = "Single Query";
        a.click();
      } else if (res.data.status !== 200) {
        document.getElementById("error").style.display = "block";
      }
    } catch (error) {
      console.log("error ", error);
    }
  };

  // useEffect(() => {
  //   setAddButton("Download All");
  // }, []);



  const handleShowAddQueryModal = () => {
    setShowQueryModal(true);
    setIsEditQuery(false);
    setEditQueryData(null);
  };

  const handleShowEditModal = async (id) => {
    console.log(id);
    try {
      const res = await TotalServices.getSingleQuery(id);
      console.log(res.data.data);
      setShowQueryModal(true);
      setEditQueryData(res.data.data);
      setEditQueryId(id);
      setIsEditQuery(true);
    } catch (error) {
      console.log(error);
    }
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
                <Search onSearch={handleSearch} getQueries={getQueries} />
              </div>

              <div class="relative flex flex-col flex-shrink-0 space-y-3 md:flex-row md:items-center lg:justify-end md:space-y-0 md:space-x-3">
                {/* create query button-->> */}
                <Button
                  title={"Create Query"}
                  handleShowModal={handleShowAddQueryModal}
                />
                {/* export all button-->> */}
                <ExportAll handleDownloadAll={ExportCSVAll}/>
              </div>
            </div>

            <div class="flex flex-col px-4 py-3 space-y-3 lg:flex-row lg:items-center lg:justify-between lg:space-y-0 lg:space-x-4">
              <div class="flex items-center flex-1 space-x-4"></div>

              <div class="relative flex flex-col flex-shrink-0 space-y-3 md:flex-row md:items-center lg:justify-end md:space-y-0 md:space-x-3">
                {/* Filters--->> */}

                <Filters
                  label="Location"
                  options={Locations}
                  value={locationFilter}
                  onChange={handleLocationChange}
                />
                <Filters
                  label="Zipcode"
                  options={zipcodeList}
                  value={zipcodeFilter}
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
                ExportCSV={ExportCSV}
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
                editQueryId={editQueryId}
                zipcodeList={zipcodeList}
                Locations={Locations}
              />
            ) : null}
          </div>
        </div>
      </section>
    </>
  );
};

export default ManageQuery;
