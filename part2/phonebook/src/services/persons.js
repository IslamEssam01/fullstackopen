import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
  return axios.get(baseUrl).then((response) => response.data);
};

const create = (newName, newNumber) => {
  return axios
    .post(baseUrl, {
      name: newName,
      number: newNumber,
    })
    .then((response) => response.data);
};

const deletePerson = (id) => {
  return axios.delete(`${baseUrl}/${id}`).then((response) => response.data);
};

const updateNumber = (person, newNumber) => {
  return axios
    .put(`${baseUrl}/${person.id}`, { ...person, number: newNumber })
    .then((response) => response.data);
};

export default { getAll, create, deletePerson ,updateNumber};
