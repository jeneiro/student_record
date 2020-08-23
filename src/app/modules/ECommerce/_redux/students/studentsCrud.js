import axios from "axios";

export const STUDENTS_URL = "api/students";

// CREATE =>  POST: add a new student to the server
export function createStudent(student) {
  return axios.post(STUDENTS_URL, { student });
}

// READ
export function getAllStudents() {
  return axios.get(STUDENTS_URL);
}

export function getStudentById(studentId) {
  return axios.get(`${STUDENTS_URL}/${studentId}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findStudents(queryParams) {
  return axios.post(`${STUDENTS_URL}/find`, { queryParams });
}

// UPDATE => PUT: update the procuct on the server
export function updateStudent(student) {
  return axios.put(`${STUDENTS_URL}/${student.id}`, { student });
}

// UPDATE Status
export function updateStatusForStudents(ids, status) {
  return axios.post(`${STUDENTS_URL}/updateStatusForStudents`, {
    ids,
    status,
  });
}

// DELETE => delete the Student from the server
export function deleteStudent(studentId) {
  return axios.delete(`${STUDENTS_URL}/${studentId}`);
}

// DELETE students by ids
export function deleteStudents(ids) {
  return axios.post(`${STUDENTS_URL}/deleteStudents`, { ids });
}
