import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { Pagination } from "antd";
import { useNavigate } from "react-router-dom";
import { Search, Plus, Edit, Trash } from "lucide-react";
import { FaUserGraduate } from "react-icons/fa";
import DeleteConfirmation from "../../utils/common/DeleteConfirmation/DeleteConfirmation";
import { getAllStudent } from "../../Redux/Reducers/Student/GetAllStudentSlice";
import { deleteStudent } from "../../Redux/Reducers/Student/DeleteStudentSlice";
import { deleteAllStudent } from "../../Redux/Reducers/Student/DeleteAllStudentSlice";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Success, Error } from "../../config/helper";

const Student = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [students, setStudents] = useState([]);
  const [isDeleteConfirmation, setIsDeleteConformation] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [search, setSearch] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // Prevent fetching data twice in Strict Mode
  const isFetched = useRef(false);

  useEffect(() => {
    if (!isFetched.current) {
      fetchStudents();
      isFetched.current = true;
    }
  }, []);

  const fetchStudents = async () => {
    const resultResponse = await dispatch(getAllStudent());
    console.log("response : ", resultResponse?.payload?.status)

    if (resultResponse?.payload?.status === true) {
      setStudents(resultResponse.payload.data);
      Success("Successfully Fetched Students.");
    } else {
      Error("Failed to fetch students");
    }
  };

  // Filter data based on search value
  const filteredData = students.filter((student) =>
    student.name.toLowerCase().includes(search.toLowerCase())
  );

  // Paginate filtered data
  const paginatedData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Select/Deselect a single row
  const onSelectRow = (studentId) => {
    setSelectedRows((prev) =>
      prev.includes(studentId) ? prev.filter((rowId) => rowId !== studentId) : [...prev, studentId]
    );
  };

  // Select/Deselect all rows on the current page
  const onSelectAll = (checked) => {
    const currentPageIds = paginatedData.map((student) => student.studentId);
    setSelectedRows((prev) =>
      checked
        ? [...new Set([...prev, ...currentPageIds])]
        : prev.filter((studentId) => !currentPageIds.includes(studentId))
    );
  };

  // Select the current page
  const isAllSelected = paginatedData.every((student) =>
    selectedRows.includes(student.studentId)
  );

  const handleEdit = (student) => {
    navigate("/dashboard/student/addStudent", { state: { student } });
  };

  const handleDeleteClick = (studentId) => {
    setSelectedStudentId(studentId);
    setIsDeleteConformation(true);
  };

  const handleDelete = async (studentId) => {
    try {
      const response = await dispatch(deleteStudent({ id: studentId }));
      
      if (response?.payload?.status) {
        Success(response?.payload);
        setStudents(students.filter((student) => student.id !== studentId));
      } else {
        Error(response?.payload);
      }
    } catch (error) {
      console.error(error);
      Error("An error occurred while deleting the student.");
    }
  };

  const handleBulkDelete = async () => {
    if (selectedRows.length === 0) {
      Error("Please select at least one student to delete.");
      return;
    }
    try {
      const response = await dispatch(deleteAllStudent({ ids: selectedRows }));
      if (response?.payload?.status) {
        Success(response?.payload.message);
        setStudents((prev) => prev.filter((student) => !selectedRows.includes(student.id)));
        setSelectedRows([]);
      } else {
        Error(response?.payload || "Failed to delete selected students.");
      }
    } catch (error) {
      console.error(error);
      Error("An error occurred while deleting selected students.");
    }
  };

  const handleYes = async () => {
    if (selectedStudentId) {
      await handleDelete(selectedStudentId);
      setIsDeleteConformation(false);
      setSelectedStudentId(null);
    }
  };

  return (
    <div className="flex font-quicksand">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full sm:w-[95%] md:w-[80%] ml-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-extrabold text-gray-700 flex items-center">
            <FaUserGraduate className="h-6 w-6 mr-2" />
            Student List
          </h2>
        </div>

        {/* Search Bar and Button */}
        <div className="flex justify-between items-center mb-6">
          <div className="relative w-72 h-10">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 z-10" />
            <input
              type="text"
              placeholder="Search students..."
              className="pl-12 pr-4 py-2 border-[#F3F4F6] border rounded-lg w-full focus:ring focus:ring-blue-300"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          {/* Add & Delete Button */}
          <div className="flex gap-2">
            <button
              className="bg-blue-500 text-white p-2.5 rounded-lg flex items-center justify-center"
              onClick={() => navigate("/dashboard/student/addStudent")}
            >
              <Plus className="w-5 h-5" />
            </button>
          <button
              className={`bg-red-500 text-white p-2.5 rounded-lg flex items-center justify-center ${
                selectedRows.length === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
              onClick={handleBulkDelete}
              disabled={selectedRows.length === 0}
            >
              <Trash className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">
                  <input
                    type="checkbox"
                    checked={isAllSelected}
                    onChange={(e) => onSelectAll(e.target.checked)}
                  />
                </th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Class</th>
                <th className="p-3 text-left">Section</th>
                <th className="p-3 text-left">Roll No</th>
                <th className="p-3 text-left">Phone</th>
                <th className="p-3 text-left">Email</th>
                <th className="py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((student) => (
                <tr
                  key={student.id}
                  className="hover:bg-gray-50 border-b border-[#F3F4F6] cursor-pointer"
                  onClick={() => navigate("/studentDashboard", { state: { student } })}
                >
                  <td className="p-3 text-left">
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(student.id)}
                      onChange={() => onSelectRow(student.id)}
                    />
                  </td>
                  <td className="p-3 text-left text-gray-600 text-sm">
                    {student.name}
                  </td>
                  <td className="p-3 text-left text-gray-600 text-sm">
                    {student.standard}
                  </td>
                  <td className="p-3 text-left text-gray-600 text-sm">
                    {student.section}
                  </td>
                  <td className="p-3 text-left text-gray-600 text-sm">
                    {student.rollNo}
                  </td>
                  <td className="p-3 text-left text-gray-600 text-sm">
                    {student.mobileNo}
                  </td>
                  <td className="p-3 text-left text-gray-600 text-sm">
                    {student.emailId}
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-600 flex gap-2">
                    <button
                      onClick={() => {
                        handleEdit(student);
                      }}
                      className="bg-green-100 text-green-500 p-2 rounded-lg hover:bg-green-200 transition"
                    >
                      <Edit size={16} />
                    </button>
                    <button 
                    
                      className="bg-red-100 text-red-500 p-2 rounded-lg hover:bg-red-200 transition">
                        <Trash size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {isDeleteConfirmation && (
          <DeleteConfirmation
            handleYes={handleYes}
            handleNo={() => setIsDeleteConformation(false)}
            text="Are you sure you want to delete this student?"
          />
        )}

        {/* Pagination */}
        <div className="flex justify-end mt-4">
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={filteredData.length}
            onChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Student;
