import { useState } from "react";
import { Pagination } from "antd";
import { useNavigate } from "react-router-dom";
import { Search, Plus, Edit, Trash } from "lucide-react";
import { teacherList } from "../../utils/data";
import { FaChalkboardTeacher } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { setSelectedTeacher } from "../../Redux/Reducers/School/schoolSlice";


const Teacher = ({ }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [teachers, setTeachers] = useState(teacherList); 
  const pageSize = 10;

  // Filter data based on search value
  const filteredData = teachers.filter((teacher) =>
    teacher.teacherName.toLowerCase().includes(search.toLowerCase())
  );

  // Paginate filtered data
  const paginatedData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Select/Deselect a single row
  const onSelectRow = (teacherId) => {
    setSelectedRows((prev) =>
      prev.includes(teacherId) ? prev.filter((rowId) => rowId !== teacherId) : [...prev, teacherId]
    );
  };

  // Select/Deselect all rows on the current page
  const onSelectAll = (checked) => {
    const currentPageIds = paginatedData.map((teacher) => teacher.teacherId);
    setSelectedRows((prev) =>
      checked
        ? [...new Set([...prev, ...currentPageIds])]
        : prev.filter((teacherId) => !currentPageIds.includes(teacherId))
    );
  };

  // Select the current page
  const isAllSelected = paginatedData.every((teacher) =>
    selectedRows.includes(teacher.teacherId)
  );

  const handleEdit = (teacher) => {
    dispatch(setSelectedTeacher(teacher));
    navigate("/dashboard/teacher/addTeacher");
  };

    // Handle delete functionality
    const handleDelete = (teacherId) => {
      setTeachers((prevTeachers) => prevTeachers.filter((teacher) => teacher.teacherId !== teacherId));
    };

  return (
    <div className="flex font-quicksand pt-16">
    <div className="bg-white rounded-xl shadow-lg p-6 w-full sm:w-[95%] md:w-[80%] ml-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-extrabold text-gray-700 flex items-center">
            <FaChalkboardTeacher className="h-6 w-6 mr-2" />
            Teacher List
          </h2>
        </div>

        {/* Search Bar and Button */}
        <div className="flex justify-between items-center mb-6">
          {/* Search Input */}
          <div className="w-72 h-10 flex items-center border border-[#F3F4F6] rounded-lg px-3">
          <Search className="text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search teachers..."
               className="flex-1 pl-3 py-2 outline-none"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Add Button */}
          <button
            className="bg-blue-500 text-white p-2.5 rounded-lg flex items-center justify-center"
            onClick={() => navigate("/dashboard/teacher/addTeacher")}
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
                <th className="p-3 text-left">Subject</th>
                <th className="p-3 text-left">Qualification</th>
                <th className="p-3 text-left">Experience</th>
                <th className="p-3 text-left">Phone</th>
                <th className="p-3 text-left">Email</th>
                <th className="py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((teacher) => (
                <tr
                  key={teacher.teacherId}
                  className="hover:bg-gray-50 border-b border-[#F3F4F6]"
                >
                  <td className="p-3 text-left">
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(teacher.teacherId)}
                      onChange={() => onSelectRow(teacher.teacherId)}
                    />
                  </td>
                  <td className="p-3 text-left text-gray-600 text-sm">
                    {teacher.teacherId}
                  </td>
                  <td className="p-3 text-left text-gray-600 text-sm">
                    {teacher.teacherName}
                  </td>
                  <td className="p-3 text-left text-gray-600 text-sm">
                    {teacher.subject}
                  </td>
                  <td className="p-3 text-left text-gray-600 text-sm">
                    {teacher.qualification}
                  </td>
                  <td className="p-3 text-left text-gray-600 text-sm">
                    {teacher.experience}
                  </td>
                  <td className="p-3 text-left text-gray-600 text-sm">
                    {teacher.phone}
                  </td>
                  <td className="p-3 text-left text-gray-600 text-sm">
                    {teacher.email}
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-600 flex gap-2">
                    <button
                      onClick={() => handleEdit(teacher)}
                      className="bg-green-100 text-green-500 p-2 rounded-lg hover:bg-green-200 transition"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(teacher.teacherId)}
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

export default Teacher;
