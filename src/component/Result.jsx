import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "./Result.css";

const Result = ({ data }) => {
  // const data = {
  //   success: true,
  //   data: "### Career Path for Aspiring Actuaries in Albania\n\n#### 1. Overview of the Career\n- **What is an Actuary?**  \n  An actuary is a professional who analyzes financial risks using mathematics, statistics, and financial theory. Actuaries are essential in evaluating the risks of events such as natural disasters, health contingencies, and longevity, particularly for insurance companies and pension funds. \n\n- **Why Choose This Career?**  \n  The actuarial profession is known for its high earning potential, demand in the job market, and stability. Actuaries play a crucial role in decision-making for companies, making it a rewarding career path for those who enjoy problem-solving and quantitative analysis.\n\n#### 2. Educational Requirements\n- **Current Grade 6: Focus Areas**  \n  - Mathematics: Strengthen your foundation in arithmetic, algebra, and geometry. \n  - Computer Science: Familiarize yourself with basic programming and data management.\n  - English: Improve your communication skills, both written and oral.\n  \n- **High School Recommendations**  \n  - Advanced Mathematics: Take courses in calculus, statistics, and probability.\n  - Economics: Understand basic principles of economics and finance.\n  - Information Technology: Develop skills in data analysis and software applications.\n  \n- **College/University Degrees**  \n  - Pursue a Bachelor's degree in Actuarial Science, Mathematics, Statistics, Economics, or Finance. Some recommended universities include:\n    - University of Tirana\n    - Polytechnic University of Tirana\n    - University of New York in Tirana\n    \n- **Alternative Education Paths**  \n  - Consider joining professional organizations that offer certification, such as:\n    - The Albanian Financial Supervisory Authority (AFSA) for relevant certifications.\n    - Online courses in actuarial subjects (e.g., Coursera, edX).\n    \n#### 3. Skills & Competencies Needed\n- **Essential Skills**  \n  - **Hard Skills:**\n    - Proficiency in mathematics and statistics.\n    - Knowledge of financial theories and risk management.\n    - Competence in software tools (Excel, R, Python) for analysis.\n  \n  - **Soft Skills:**\n    - Analytical thinking and problem-solving abilities.\n    - Strong communication skills to convey complex data.\n    - Attention to detail and organizational skills.\n  \n- **Extracurricular Activities**  \n  - Join math clubs, debate teams, or science fairs to hone analytical skills.\n  - Participate in online coding or data science contests.\n  \n#### 4. Career Progression Path\n- **Entry-Level Roles in Albania**  \n  - Junior Actuary or Analyst with a starting salary around €12,000 to €20,000 per year.\n  \n- **Mid-Level Opportunities**  \n  - Actuary, Risk Analyst, or Financial Consultant. Annual salaries can range from €20,000 to €40,000.\n  \n- **Senior Positions**  \n  - Senior Actuary, Chief Risk Officer, or Consultant with salaries typically over €40,000, potentially reaching €70,000 or more with experience and specialization.\n\n#### 5. Top Institutions & Courses (Specific to Albania)\n- **Best Colleges/Universities**  \n  - University of Tirana: Offers a Bachelor in Finance and Insurance.\n  - Polytechnic University: Major in Mathematics and Statistics.\n  \n- **Online Certification Programs**  \n  - International actuarial science courses available on Coursera and edX.\n  - Specific online courses from recognized institutions in statistics or risk management.\n\n#### 6. Job Market Insights\n- **Demand in Albania**  \n  There is a steady demand for actuaries in Albania, particularly within the insurance and finance sectors due to a growing economy and increasing regulatory requirements. \n\n- **Future Trends**  \n  - Technological advancements may lead to an increase in data analytics roles.\n  - Continuous education and staying updated with industry changes will be crucial for job retention and advancement.\n\n#### 7. Alternative Career Paths\n- **Similar Career Options**  \n  - Data Analyst: Career leveraging quantitative skills to interpret data.\n  - Financial Analyst: Involves evaluating financial data to guide business decisions.\n  \n- **Other Industries**  \n  - Risk Management: Roles in corporate risk assessment.\n  - Consulting: Advising businesses on financial risks and strategies.\n\nThis structured pathway offers a comprehensive guide for students in Albania interested in pursuing a career as an actuary, providing clear steps from education to career development.",
  // };

  return (
    <div className="result_bg">
      {/* <div className="career-content "> */}
      {/* <img
        src="/images/career-kids-banner.png"
        alt="Career Banner"
        style={{ width: "100%", borderRadius: "12px", marginBottom: "1rem" }}
      /> */}
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{data}</ReactMarkdown>
      {/* </div> */}
    </div>
  );
};

export default Result;
