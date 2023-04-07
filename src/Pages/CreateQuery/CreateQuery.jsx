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

const CreateQuery = () => {
  const [loader, setLoader] = useState(false);
  // const options = {
  //   zipcodes: ["10001", "10002", "10003", "10004"],
  //   categories: ["Category 1", "Category 2", "Category 3", "Category 4"],
  //   countries: ["USA", "Canada", "Mexico", "France"],
  // };

  const [zipcode, setZipcode] = useState("");
  const [category, setCategory] = useState("");
  const [country, setCountry] = useState("");

  const [totalRecords, setTotalRecords] = useState("");
  const [NumberOfRecordsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [goto, setGoto] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [searchUsers, setSearchUser] = useState("");

  const handleZipcodeChange = (event) => {
    setZipcode(event.target.value);
  };

  const getZipCodeList = async () => {
    setLoader(true);
    try {
      const res = await TotalServices.getZipCode(
        NumberOfRecordsPerPage,
        (currentPage - 1) * NumberOfRecordsPerPage,
        {
          keyword: "",
        }
      );
      console.log(res, "res");
      if (res.data.status === 200) {
        if (res.data.pages === 1) {
          setCurrentPage(1);
        }
        setLoader(false);
        setZipcode(res.data.zipcodes);
        setTotalPages(res.data.pages);
        setTotalRecords(res.data.total_records);
        setLoader(false);
        console.log(res.data.plans);
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
  return (
    <section class=" w-[90%]  py-3 sm:py-5">
      <div class="px-4 mx-auto max-w-screen-2xl lg:px-12">
        <div class="relative overflow-hidden  sm:rounded-lg">
          <div class="flex flex-col px-4 py-3 space-y-3 lg:flex-row lg:items-center lg:justify-between lg:space-y-0 lg:space-x-4">
            <div class="flex items-center flex-1 space-x-4">
              {/* search component--->> */}
              <Search />
            </div>

            <div class="relative flex flex-col flex-shrink-0 space-y-3 md:flex-row md:items-center lg:justify-end md:space-y-0 md:space-x-3">
              {/* create zip button-->> */}
              <Button title={"Create ZipCode"}/>
             
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
            <ZipCodeTable zipcode={zipcode} getZipCodeList={getZipCodeList}/>
          </div>
          <nav
            class="flex flex-col items-start justify-between p-4 space-y-3 md:flex-row md:items-center md:space-y-0"
            aria-label="Table navigation"
          >
            {/* <ResultShowing /> */}
            <ul class="inline-flex items-stretch -space-x-px">
              {/* <Pagination
                  totalRecords={totalRecords}
                  setRecord={setRecord}
                  record={record}
                  NumberOfRecordsPerPage={NumberOfRecordsPerPage}
                  setCurrentPage={setCurrentPage}
                  currentPage={currentPage}
                  setGoto={setGoto}
                  goto={goto}
                  totalPages={totalPages}
                /> */}
            </ul>
          </nav>
        </div>
      </div>
    </section>
  );
};

export default CreateQuery;
