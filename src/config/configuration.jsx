const configuration = {
    baseUrl: "http://localhost:8080/",

    apis: {
        login: "zurtle/api/school/auth/login",
        createTeacher: "zurtle/api/school/teacher",
        updateTeacher: "zurtle/api/school/teacher",
        deleteTeacher: "zurtle/api/school/teacher",
        deleteAllTeacher: "zurtle/api/school/teacher/deleteAll",
        getAllTeacher: "zurtle/api/school/teacher/all",
        createParent: "zurtle/api/school/parent",
        updateParent: "zurtle/api/school/parent",
        deleteParent: "zurtle/api/school/parent",
        deleteAllParent: "zurtle/api/school/parent/deleteAll",
        getAllParent: "zurtle/api/school/parent/all",
        createStudent: "zurtle/api/school/student",
        updateStudent: "zurtle/api/school/student",
        getAllStudent: "zurtle/api/school/student/all",
        deleteStudent: "zurtle/api/school/student",
        deleteAllStudent: "zurtle/api/school/student/deleteAll",
        getReportByStudent: "zurtle/api/school/progressReport/list"
    }
}

export default configuration;