import studentTableMock from "./studentTableMock";
import MockUtils from "./mock.utils";

export default function mockStudents(mock) {
  mock.onPost("api/students").reply(({ data }) => {
    const { student } = JSON.parse(data);
    const {
      firstname = "",
      lastname = "",
      state = "",
      lga = "",
      level = 0,
      course = "",
      department = "",
      school = "",
      status = 0,
      regNo = "",
    } = student;

    const id = generateStudentId();
    const newStudent = {
      id,
      firstname,
      lastname,
      state,
      lga,
      level,
      course,
      department,
      school,
      status,
      regNo,
    };
    studentTableMock.push(newStudent);
    return [200, { student: newStudent }];
  });

  mock.onPost("api/students/find").reply((config) => {
    const mockUtils = new MockUtils();
    const { queryParams } = JSON.parse(config.data);
    const filteredStudents = mockUtils.baseFilter(
      studentTableMock,
      queryParams
    );
    return [200, filteredStudents];
  });

  mock.onPost("api/students/deleteStudents").reply((config) => {
    const { ids } = JSON.parse(config.data);
    ids.forEach((id) => {
      const index = studentTableMock.findIndex((el) => el.id === id);
      if (index > -1) {
        studentTableMock.splice(index, 1);
      }
    });
    return [200];
  });

  mock.onPost("api/students/updateStatusForStudents").reply((config) => {
    const { ids, status } = JSON.parse(config.data);
    studentTableMock.forEach((el) => {
      if (ids.findIndex((id) => id === el.id) > -1) {
        el.status = status;
      }
    });
    return [200];
  });

  mock.onGet(/api\/students\/\d+/).reply((config) => {
    const id = config.url.match(/api\/students\/(\d+)/)[1];
    const student = studentTableMock.find((el) => el.id === +id);
    if (!student) {
      return [400];
    }

    return [200, student];
  });

  mock.onPut(/api\/students\/\d+/).reply((config) => {
    const id = config.url.match(/api\/students\/(\d+)/)[1];
    const { student } = JSON.parse(config.data);
    const index = studentTableMock.findIndex((el) => el.id === +id);
    if (!index) {
      return [400];
    }

    studentTableMock[index] = { ...student };
    return [200];
  });

  mock.onDelete(/api\/students\/\d+/).reply((config) => {
    const id = config.url.match(/api\/students\/(\d+)/)[1];
    const index = studentTableMock.findIndex((el) => el.id === +id);
    studentTableMock.splice(index, 1);
    if (!index === -1) {
      return [400];
    }

    return [200];
  });
}

function generateStudentId() {
  const ids = studentTableMock.map((el) => el.id);
  const maxId = Math.max(...ids);
  return maxId + 1;
}
