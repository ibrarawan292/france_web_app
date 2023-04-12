import React from "react";
import TotalServices from "../../TotalServices";

const UseDownload = () => {
  const downloadFile = async (id) => {
    console.log(id);
    try {
      const res = await TotalServices.downloadQuery(id);
      console.log(res);
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

  const downloadAllFile = async (id) => {
    try {
      const res = await TotalServices.downloadAllQuery(id);
      console.log(res)
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
  return { downloadFile, downloadAllFile };
};

export default UseDownload;
