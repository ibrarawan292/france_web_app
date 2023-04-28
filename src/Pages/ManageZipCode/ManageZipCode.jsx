import React, { useEffect, useState } from "react";
import Pagination from "../../Components/Pagination/Pagination";
import Button from "../../Components/ButtonsComp/Button";
import Search from "../../Components/SearchComp/Search";
import TotalServices from "../../TotalServices";
import ZipCodeTable from "../../Components/Table/ZipCodeTable";
import ZipModal from "../../Components/Modals/ZipModal";

const ManageZipCode = () => {
  const [loader, setLoader] = useState(false);
  const [showZipModal, setShowZipModal] = useState(false);
  const [editZippedData, setEditZippedData] = useState([]);
  const [isEditZipped, setIsEditZipped] = useState(false);
  const [editId, setEditId] = useState([]);
  const [zipData, setZipData] = useState("");

  const [record, setRecord] = useState(0);
  const [totalRecords, setTotalRecords] = useState("");
  const [NumberOfRecordsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [goto, setGoto] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const getZipCodeData = async () => {
    setLoader(true);
    try {
      const res = await TotalServices.getZipCode(
        NumberOfRecordsPerPage,
        (currentPage - 1) * NumberOfRecordsPerPage,
        {
          keyword: searchTerm,
        }
      );
      if (res.data.status === 200) {
        if (res.data.pages === 1) {
          setCurrentPage(1);
        }
        setLoader(false);
        setZipData(res.data.zipcodes);
        setTotalPages(res.data.pages);
        setTotalRecords(res.data.total_records);
        setLoader(false);
      } else if (res.data.status !== 200) {
        document.getElementById("error").style.display = "block";
      }
    } catch (error) {
      console.log("error ", error);
    }
  };

  useEffect(() => {
    getZipCodeData();
  }, [searchTerm, currentPage]);

  const handleShowAddZipModal = () => {
    setShowZipModal(true);
    setIsEditZipped(false);
    setEditZippedData(null);
  };

  const handleShowEditModal = (data, id) => {
    setShowZipModal(true);
    setEditZippedData(data);
    setEditId(id);
    setIsEditZipped(true);
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
  };
  return (
    <section className=" w-[90%]  py-3 sm:py-5">
      <div className="px-4 mx-auto max-w-screen-2xl lg:px-12">
        <div className="relative overflow-hidden  sm:rounded-lg">
          <div className="flex flex-col px-4 py-3 space-y-3 lg:flex-row lg:items-center lg:justify-between lg:space-y-0 lg:space-x-4">
            <div className="flex items-center flex-1 space-x-4">
              {/* search component--->> */}
              <Search
                onSearch={handleSearch}
                validationType={"number"}
                getData={getZipCodeData}
                placeholder={"Zip Code"}
              />
            </div>

            <div className="relative flex flex-col flex-shrink-0 space-y-3 md:flex-row md:items-center lg:justify-end md:space-y-0 md:space-x-3">
              {/* create zip button-->> */}
              <Button
                title={"Create ZipCode"}
                handleShowModal={handleShowAddZipModal}
              />
            </div>
          </div>

          {/* <div className="flex flex-col px-4 py-3 space-y-3 lg:flex-row lg:items-center lg:justify-between lg:space-y-0 lg:space-x-4">
            <div className="flex items-center flex-1 space-x-4"></div>

            <div className="relative flex flex-col flex-shrink-0 space-y-3 md:flex-row md:items-center lg:justify-end md:space-y-0 md:space-x-3">
             

              <Filters
                label="Zipcode"
                options={zipcode}
                value={zipcode}
                onChange={handleZipcodeChange}
              />
            </div>
          </div> */}
          <div className="overflow-x-auto mt-5 lg:mt-10">
            {/* query table---->> */}
            <ZipCodeTable
              zipData={zipData}
              handleShowEditModal={handleShowEditModal}
              loader={loader}
              setLoader={setLoader}
              getZipCodeList={getZipCodeData}
            />
          </div>
          <nav
            className="flex flex-col items-start justify-between p-4 space-y-3 md:flex-row md:items-center md:space-y-0"
            aria-label="Table navigation"
          >
            <div>{/* <ResultShowing /> */}</div>
            <ul className="inline-flex items-stretch -space-x-px">
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
              getZipCode={getZipCodeData}
              editId={editId}
            />
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default ManageZipCode;
