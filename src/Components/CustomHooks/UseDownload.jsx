import React from "react";
import TotalServices from "../../TotalServices";

const UseDownload = () => {
  const downloadFile = async (id, date) => {
    console.log(id);
    try {
      const res = await TotalServices.downloadQuery(id);
      console.log(res.data)
      if (res.status === 200) {
        var a = document.createElement("a");

        var binaryData = [];
        binaryData.push(res.data);
        a.href = window.URL.createObjectURL(
          new Blob(binaryData, { type: "text/csv" })
        );
        a.download = `Single Query, ${date.slice(0, 16)}`;
        a.click();
      } else if (res.data.status !== 200) {
        document.getElementById("error").style.display = "block";
      }
    } catch (error) {
      console.log("error ", error);
    }
  };

  const downloadAllFile = async () => {
    try {
      const res = await TotalServices.downloadAllQuery();
      console.log(res)
      if (res.status === 200) {
        var a = document.createElement("a");

        var binaryData = [];
        binaryData.push(res.data);
        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleDateString("en-US", {
          weekday: "short",
          day: "numeric",
          month: "short",
          year: "numeric",
        });
        a.href = window.URL.createObjectURL(
          new Blob(binaryData, { type: "text/csv" })
        );
        a.download = `All Queries, ${formattedDate}`;
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
