import React from "react";

const DeleteModal = ({ handleDelete, setShowDeleteModal, deleteId }) => {
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none m-0 p-0">
        <div className="relative w-auto mt-20 mx-auto max-w-full">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-[500px] bg-white outline-none focus:outline-none">
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-2xl font-semibold">Shall We Proceed?</h3>
              <button
                className="p-1 ml-auto bg-dark border-0 text-black  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => setShowDeleteModal(false)}
              >
                <span className="text-black  h-6 w-6 text-2xl block outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>
            {/*body*/}

            {/*footer*/}
            <div className="flex text-red-600 items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
              <p className="mr-12 text-lg">Are you sure, you want to delete?</p>
              <button
                style={{ background: "var(--bg-fill1)" }}
                className="btn-hover text-black font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => {
                  handleDelete(deleteId);
                  setShowDeleteModal(false);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default DeleteModal;
