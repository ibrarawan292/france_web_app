import React, { useEffect, useState } from "react";
import Search from "../../Components/SearchComp/Search";
import Button from "../../Components/ButtonsComp/Button";
import ExportAll from "../../Components/ButtonsComp/ExportAll";
import Table from "../../Components/Table/Table";
import Pagination from "../../Components/Pagination/Pagination";
import Filters from "../../Components/Filters/Filters";
import AddEditModal from "../../Components/Modals/AddEditModal";
import TotalServices from "../../TotalServices";
import { Locations } from "../../Components/LocationsList/Locations";

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
  const [filterSelected, setFilterSelected] = useState(3);
  const [totalRecords, setTotalRecords] = useState("");
  const [record, setRecord] = useState(0);
  const [NumberOfRecordsPerPage] = useState(filterSelected);
  const [currentPage, setCurrentPage] = useState(1);
  const [goto, setGoto] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [tempData, setTempData] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [tempDataValues, setTempDataValues] = useState([]);

  const handleZipcodeChange = (selectedOption) => {
    console.log(selectedOption);
    let zipArr = [];
    selectedOption.map((item) => {
      zipArr.push(item.value);
    });
    setZipCodeFilter(zipArr);
  };

  const handleLocationChange = (selectedOption) => {
    console.log(selectedOption);
    let locArr = [];
    selectedOption.map((item) => {
      return locArr.push(item.value);
    });
    setLocationFilter(locArr);
  };

  const getQueries = async () => {
    setLoader(true);
    try {
      const res = await TotalServices.getQueriesList(
        NumberOfRecordsPerPage,
        (currentPage - 1) * NumberOfRecordsPerPage,
        {
          query: searchTerm,
          location: locationFilter,
          zipcodes: zipcodeFilter,
        }
      );
      console.log(res);
      if (res.data.status === 200) {
        if (res.data.pages === 1) {
          setCurrentPage(1);
        }
        setLoader(false);
        setData(res.data.user_queries);
        setTotalPages(res.data.pages);
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
    try {
      const res = await TotalServices.getZipCodes();
      console.log(res, "reponse");
      if (res.data.status === 200) {
        if (res.data.pages === 1) {
          setCurrentPage(1);
        }
        setLoader(false);
        setZipCodeList(res.data.zipcodes);
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
  }, []);

  const handleShowAddQueryModal = () => {
    setShowQueryModal(true);
    setIsEditQuery(false);
    setEditQueryData(null);
  };

  const handleShowEditModal = async (id) => {
    try {
      const res = await TotalServices.getSingleQuery(id);
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
                <Search
                  onSearch={handleSearch}
                  getData={getQueries}
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  validationType={"string"}
                  placeholder={"Query Name"}
                />
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
                  label="Location"
                  options={Locations}
                  value={locationFilter}
                  onChange={handleLocationChange}
                  placeholder={"Select Location"}
                />
                <Filters
                  label="Zipcode"
                  options={zipcodeList}
                  value={zipcodeFilter}
                  onChange={handleZipcodeChange}
                  placeholder={"Select ZipCode"}
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
              <div>{/* <ResultShowing /> */}</div>
              <ul class="inline-flex items-stretch -space-x-px">
                <Pagination
                  totalRecords={totalRecords}
                  setRecord={setRecord}
                  record={record}
                  NumberOfRecordsPerPage={filterSelected}
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
