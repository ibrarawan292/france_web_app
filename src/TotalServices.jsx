import http from "./axios";


const login = (data) => {
  console.log(data)
  return http.post("/Login", data);
};

const logout = (data) => {
  console.log(data)
  return http.post("/Logout", data);
};
const getZipCode = (limit, offset, data) => {
  console.log(data)
  return http.post("/ListZipcodes/" + limit + "/" + offset, data)
}
const createZipCode = ( data) => {
  console.log(data)
  return http.post("/CreateZipcode", data)
}

const editZipCode = (id,data) => {
  console.log(data)
  return http.patch("/EditZipcode/"+ id ,data)
}

const deleteZipCode = (id) => {
  return http.patch("/DeleteZipcode/" + id)
}

const getQueriesList = (limit, offset, data) => {
  return http.post("/ListQueries/" + limit + "/" + offset, data);
};
const createQuery = (data) => {
  console.log(data)
  return http.post("/CreateUserQuery", data);
};

const deleteQuery = (id, data) => {
  return http.patch("/UserDeleteQuery/" + id, data);
};

const editQuery = (id, data) => {
  console.log(id, data)
  return http.patch("/UserEditQuery/" + id, data)
}

const getSingleQuery = (id) => {
  console.log(id)
  return http.get("/SingleQuery/" + id)
}

const downloadQuery = (id) => {
  console.log(id)
  return http.get("/DownloadQuery/" + id)
}

const downloadAllQuery = (id) => {
  console.log(id)
  return http.get("/DownloadAllQueries/" + id)
}





const TotalServices = {
  login,
  logout,
  getZipCode,
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
