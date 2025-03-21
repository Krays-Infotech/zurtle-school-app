const configuration = {

    baseUrl: "https://java.expolarity.ai/",

    // baseUrl: "http://localhost:8080/",

    apis: {
        login: "zurtle/api/school/auth/login",
        getQuestions: "zurtle/api/school/questionBank/all",
        storeQuestion: "zurtle/api/school/questionBank/store",
        storeInterest: "zurtle/api/interest/store",
        saveTestReport: "zurtle/api/school/questionBank/testReport",
        getTestReport: "zurtle/api/school/questionBank/getReport",
        getGoogleLogin: "oauth2/authorization/google",
        payment: "zurtle/api/payments/createCheckoutSession",
        paymentStatus: "zurtle/api/payments/savePaymentDetails",
    }
}

export default configuration;