import Helmet from "react-helmet";
import { useState } from "react";
// import NotAllowedImage from "../../Assets/Images/access-denied.png"

const NotAllowed = () => {
    const messages = [{
        "message": "Ooppss!!! You are NOT Allowed to Access this Page",
      },
      
      ]
      const [data, setData] = useState(messages);
      console.log(data[0].message)
  return (
    <>
      <Helmet>
        <title>Error 406</title>
      </Helmet>
      <div className="flex items-center justify-center  ">
        <div className="lg:px-40 lg:py-16 md:px-20 md:py-10 py-8 px-4 bg-white rounded-md ">
          <div className="flex flex-col items-center">
            {/* <img src={NotAllowedImage} width ={"200px"} className ="rounded-xl mb-2" /> */}
            <h6 className="mb-8 text-center text-red-600 text-2xl">
              {data[0].message}
            </h6>

           
          </div>
        </div>
      </div>
    </>
  );
};

export default NotAllowed;
