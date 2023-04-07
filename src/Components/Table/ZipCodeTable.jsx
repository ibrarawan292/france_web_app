import React, { useContext } from "react";
import {
  AiOutlineDelete,
  AiOutlineDownload,
  AiOutlineEdit,
} from "react-icons/ai";
import { ThemeContext } from "../../App";
import ZipModal from "../Modals/ZipModal";

const ZipCodeTable = ({ zipcode , getZipCodeList}) => {
  const {
    showZipped,
    setShowZipped,
    editZippedData,
    setEditZippedData,
    isEditZipped,
    setIsEditZipped,
  } = useContext(ThemeContext);
  return (
    <div>
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-white uppercase bg-gray-50 dark:bg-gray-700 dark:text-white">
          <tr>
            <th scope="col" class="px-4 py-3">
              Zip Code
            </th>
            <th scope="col" class="px-4 py-3">
              ACTION
            </th>
          </tr>
        </thead>
        <tbody>
          {zipcode &&
            zipcode.map((item, index) => {
              return (
                <tr key={index} class="border-b  ">
                  <td class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap ">
                    {item.zipcode}
                  </td>
                  <td class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap ">
                    <button
                      onClick={() => {
                        setEditZippedData(item);
                        setShowZipped(true);
                        setIsEditZipped(true);
                      }}
                      type="button"
                      className="px-1 py-2  rounded-full border text-green-800 hover:text-green-400 text-lg border-white"
                    >
                      <AiOutlineEdit />
                    </button>
                    <button
                      onClick={() => setShowDelete(true)}
                      type="button"
                      className="px-1 py-2 rounded-full border text-red-500 hover:text-red-400 text-lg border-white "
                    >
                      <AiOutlineDelete />
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      {showZipped ? <ZipModal getZipCodeList={getZipCodeList}/> : null}
      {/* {showDelete ? <DeleteModal setShowDelete={setShowDelete} showDelete={showDelete} /> : null} */}
    </div>
  );
};

export default ZipCodeTable;
