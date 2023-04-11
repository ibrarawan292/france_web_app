import React, { useEffect, useState } from "react";
import Pagination from "../../Components/Pagination/Pagination";
import ResultShowing from "../../Components/Pagination/ResultShowing";
import Table from "../../Components/Table/Table";
import Filters from "../../Components/Filters/Filters";
import ExportAll from "../../Components/ButtonsComp/ExportAll";
import Button from "../../Components/ButtonsComp/Button";
import Search from "../../Components/SearchComp/Search";
import TotalServices from "../../TotalServices";
import ZipCodeTable from "../../Components/Table/ZipCodeTable";
import ZipModal from "../../Components/Modals/ZipModal";

const CreateQuery = () => {
  const [loader, setLoader] = useState(false);
  const [showZipModal, setShowZipModal] = useState(false);
  const [editZippedData, setEditZippedData] = useState([]);
  const [isEditZipped, setIsEditZipped] = useState(false);
  const [editId, setEditId] = useState([]);
  const [zipData, setZipData] = useState("");
  // const [category, setCategory] = useState("");
  // const [country, setCountry] = useState("");

  const [record, setRecord] = useState(0);
  const [totalRecords, setTotalRecords] = useState("");
  const [NumberOfRecordsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [goto, setGoto] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

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
        setZipData(res.data.zipcodes);
        setTotalPages(res.data.pages);
        if (searchTerm === "") {
          setCurrentPage(1);
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
  }, [searchTerm, currentPage]);

  const handleShowAddZipModal = () => {
    setShowZipModal(true);
    setIsEditZipped(false);
    setEditZippedData(null);
  };

  const handleShowEditModal = (data, id) => {
    console.log(data, id);
    setShowZipModal(true);
    setEditZippedData(data);
    setEditId(id);
    setIsEditZipped(true);
  };

  const handleSearch = (value) => {
    console.log(value);
    setSearchTerm(value);
  };
  return (
    <section class=" w-[90%]  py-3 sm:py-5">
      <div class="px-4 mx-auto max-w-screen-2xl lg:px-12">
        <div class="relative overflow-hidden  sm:rounded-lg">
          <div class="flex flex-col px-4 py-3 space-y-3 lg:flex-row lg:items-center lg:justify-between lg:space-y-0 lg:space-x-4">
            <div class="flex items-center flex-1 space-x-4">
              {/* search component--->> */}
              <Search onSearch={handleSearch} />
            </div>

            <div class="relative flex flex-col flex-shrink-0 space-y-3 md:flex-row md:items-center lg:justify-end md:space-y-0 md:space-x-3">
              {/* create zip button-->> */}
              <Button
                title={"Create ZipCode"}
                handleShowModal={handleShowAddZipModal}
              />
            </div>
          </div>

          {/* <div class="flex flex-col px-4 py-3 space-y-3 lg:flex-row lg:items-center lg:justify-between lg:space-y-0 lg:space-x-4">
            <div class="flex items-center flex-1 space-x-4"></div>

            <div class="relative flex flex-col flex-shrink-0 space-y-3 md:flex-row md:items-center lg:justify-end md:space-y-0 md:space-x-3">
             

              <Filters
                label="Zipcode"
                options={zipcode}
                value={zipcode}
                onChange={handleZipcodeChange}
              />
            </div>
          </div> */}
          <div class="overflow-x-auto">
            {/* query table---->> */}
            <ZipCodeTable
              zipData={zipData}
              handleShowEditModal={handleShowEditModal}
              loader={loader}
              setLoader={setLoader}
              getZipCodeList={getZipCodeList}
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
          {showZipModal ? (
            <ZipModal
              setShowZipModal={setShowZipModal}
              editZippedData={editZippedData}
              isEditZipped={isEditZipped}
              getZipCode={getZipCodeList}
              editId={editId}
            />
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default CreateQuery;
