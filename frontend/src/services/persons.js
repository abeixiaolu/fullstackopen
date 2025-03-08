import axios from "axios";

const request = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3001/api",
});

const getAll = () => {
  return request({
    url: "/persons",
  }).then((response) => response.data);
};

const save = (data) => {
  return request({
    url: "/persons",
    method: "post",
    data,
  }).then((response) => response.data);
};

const remove = (id) => {
  return request({
    url: `/persons/${id}`,
    method: "delete",
  }).then((response) => response.data);
};

const edit = (id, data) => {
  return request({
    url: `/persons/${id}`,
    method: "put",
    data,
  }).then((response) => response.data);
};

export default {
  getAll,
  save,
  remove,
  edit,
};
