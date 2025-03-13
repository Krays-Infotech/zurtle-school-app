const configuration = {

    baseUrl: "https://java.expolarity.ai/",

    //baseUrl: "http://localhost:8080/",

    apis: {
        login: "zurtle/api/school/auth/login",
        getQuestions: "zurtle/api/school/questionBank/all",
        storeQuestion: "zurtle/api/school/questionBank/store",
        saveTestReport: "zurtle/api/school/questionBank/testReport",
        getTestReport: "zurtle/api/school/questionBank/getReport"
    }
}

export default configuration;