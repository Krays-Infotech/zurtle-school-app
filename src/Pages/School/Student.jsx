import { useState } from "react";
import { Pagination } from "antd";
import { useNavigate } from "react-router-dom";
import { Search, Plus, Edit, Trash } from "lucide-react";
import { studentList } from "../../utils/data";
import { FaUserGraduate } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { setSelectedStudent } from "../../Redux/Reducers/School/schoolSlice";

const Student = ({}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [students, setStudents] = useState(studentList);
  const pageSize = 10;

  // Filter data based on search value
  const filteredData = students.filter((student) =>
    student.studentName.toLowerCase().includes(search.toLowerCase())
  );

  // Paginate filtered data
  const paginatedData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Select/Deselect a single row
  const onSelectRow = (studentId) => {
    setSelectedRows((prev) =>
      prev.includes(studentId)
        ? prev.filter((rowId) => rowId !== studentId)
        : [...prev, studentId]
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
    dispatch(setSelectedStudent(student));
    navigate("/dashboard/student/addStudent");
  };

  // Handle delete functionality
  const handleDelete = (studentId) => {
    setStudents((prevStudents) =>
      prevStudents.filter((student) => student.studentId !== studentId)
    );
  };

  return (
    <div className="flex font-quicksand p-16">
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
          <div className="w-72 h-10 flex items-center border border-[#F3F4F6] rounded-lg px-3">
            <Search className="text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search students..."
              className="flex-1 pl-3 py-2 outline-none"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button
            className="bg-blue-500 text-white p-2.5 rounded-lg flex items-center justify-center"
            onClick={() => navigate("/dashboard/student/addStudent")}
          >
            <Plus className="w-5 h-5" />
          </button>
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
                <th className="p-3 text-left">Id</th>
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
                  key={student.studentId}
                  className="hover:bg-gray-50 border-b border-[#F3F4F6]"
                  onClick={() => navigate("/studentdashboard")}
                >
                  <td className="p-3 text-left">
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(student.studentId)}
                      onChange={() => onSelectRow(student.studentId)}
                    />
                  </td>
                  <td className="p-3 text-left text-gray-600 text-sm">
                    {student.studentId}
                  </td>
                  <td className="p-3 text-left text-gray-600 text-sm">
                    {student.studentName}
                  </td>
                  <td className="p-3 text-left text-gray-600 text-sm">
                    {student.class}
                  </td>
                  <td className="p-3 text-left text-gray-600 text-sm">
                    {student.section}
                  </td>
                  <td className="p-3 text-left text-gray-600 text-sm">
                    {student.rollNo}
                  </td>
                  <td className="p-3 text-left text-gray-600 text-sm">
                    {student.phone}
                  </td>
                  <td className="p-3 text-left text-gray-600 text-sm">
                    {student.email}
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-600 flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(student);
                      }}
                      className="bg-green-100 text-green-500 p-2 rounded-lg hover:bg-green-200 transition"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(student.studentId);
                      }}
                      className="bg-red-100 text-red-500 p-2 rounded-lg hover:bg-red-200 transition"
                    >
                      <Trash size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

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
    </div>
  );
};

export default Student;
