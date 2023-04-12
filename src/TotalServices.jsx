import http from "./axios";


const login = (data) => {
  return http.post("/Login", data);
};

const logout = (data) => {
  return http.post("/Logout", data);
};
const getZipCode = (limit, offset, data) => {
  return http.post("/ListZipcodes/" + limit + "/" + offset, data)
}
const getZipCodes = () => {
  return http.get("/GetZipcodes" )
}
const createZipCode = ( data) => {
  return http.post("/CreateZipcode", data)
}

const editZipCode = (id,data) => {
  return http.patch("/EditZipcode/"+ id ,data)
}

const deleteZipCode = (id) => {
  return http.patch("/DeleteZipcode/" + id)
}

const getQueriesList = (limit, offset, data) => {
  return http.post("/ListQueries/" + limit + "/" + offset, data);
};
const createQuery = (data) => {
  return http.post("/CreateUserQuery", data);
};

const deleteQuery = (id, data) => {
  return http.patch("/UserDeleteQuery/" + id, data);
};

const editQuery = (id, data) => {
  return http.patch("/UserEditQuery/" + id, data)
}

const getSingleQuery = (id) => {
  return http.get("/SingleQuery/" + id)
}

const downloadQuery = (id) => {
  return http.get("/DownloadQuery/" + id)
}

const downloadAllQuery = () => {
  return http.get("/DownloadAllQueries")
}





const TotalServices = {
  login,
  logout,
  getZipCode,
  getZipCodes,
  createZipCode,
  editZipCode,
  deleteZipCode,
  getQueriesList,
  createQuery,
  deleteQuery,
  editQuery,
  getSingleQuery,
  downloadQuery,
  downloadAllQuery
};

export default TotalServices;
