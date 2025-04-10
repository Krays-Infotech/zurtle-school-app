const configuration = {
  baseUrl: "https://zurtle-rms-python.onrender.com",
  CareerBaseUrl: "https://engine.expolarity.ai/api/careers",
  // baseUrl: "https://java.expolarity.ai/",
  // baseUrl: "http://localhost:8080/",

  apis: {
    assessment: "/assessment",
    googleLogin: "/google-login",
    checkout: "/checkout",
    saveAssessment: "/evaluate",
    saveBasics: "/students",
    saveIds: "/results",
    getResult: "/report/user",
    careerPath: "/generate",
    paymentStatus: "/payments",
    register: "/students",

    // login: "zurtle/api/auth/login",
    // getQuestions: "zurtle/api/getAllQuestions",
    // storeQuestion: "zurtle/api/store",
    // storeInterest: "zurtle/api/interest/store",
    // saveTestReport: "zurtle/api/testReport",
    // getTestReport: "zurtle/api/getTestReport",
    // getGoogleLogin: "oauth2/authorization/google",
    // payment: "zurtle/api/payments/createCheckoutSession",
    // getStudent: "zurtle/api/getStudentById",
  },
};

export default configuration;
