const configuration = {

    baseUrl: "https://java.expolarity.ai/",

    // baseUrl: "http://localhost:8080/",

    apis: {
        login: "zurtle/api/auth/login",
        getQuestions: "zurtle/api/getAllQuestions",
        storeQuestion: "zurtle/api/store",
        storeInterest: "zurtle/api/interest/store",
        saveTestReport: "zurtle/api/testReport",
        getTestReport: "zurtle/api/getTestReport",
        getGoogleLogin: "oauth2/authorization/google",
        payment: "zurtle/api/payments/createCheckoutSession",
        paymentStatus: "zurtle/api/payments/savePaymentDetails",
    }
}

export default configuration;