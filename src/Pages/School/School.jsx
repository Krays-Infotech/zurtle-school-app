import { useState } from "react";
import { Pagination } from "antd";
import { useNavigate } from "react-router-dom";
import { Search, Plus, Edit, Trash } from "lucide-react";
import { schoolList } from "../../utils/data";
import { FaSchool } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { setSelectedSchool } from "../../Redux/Reducers/School/schoolSlice";

const School = ({  }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [schools, setSchools] = useState(schoolList); 
  const pageSize = 10;

  // Filter data based on search value
  const filteredData = schools.filter((school) =>
    school.schoolName.toLowerCase().includes(search.toLowerCase())
  );

  // Paginate filtered data
  const paginatedData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Select/Deselect a single row
  const onSelectRow = (schoolId) => {
    setSelectedRows((prev) =>
      prev.includes(schoolId) ? prev.filter((rowId) => rowId !== schoolId) : [...prev, schoolId]
    );
  };

  // Select/Deselect all rows on the current page
  const onSelectAll = (checked) => {
    const currentPageIds = paginatedData.map((school) => school.schoolId);
    setSelectedRows((prev) =>
      checked
        ? [...new Set([...prev, ...currentPageIds])]
        : prev.filter((schoolId) => !currentPageIds.includes(schoolId))
    );
  };

  // Select the current page
  const isAllSelected = paginatedData.every((school) =>
    selectedRows.includes(school.schoolId)
  );

  const handleEdit = (school) => {
    dispatch(setSelectedSchool(school));
    navigate("/dashboard/school/addSchool");
  };

  // Handle delete functionality
  const handleDelete = (schoolId) => {
    setSchools((prevSchools) => prevSchools.filter((school) => school.schoolId !== schoolId));
  };

  return (
    <div className="flex font-quicksand pt-16">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full sm:w-[95%] md:w-[80%] ml-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-extrabold text-gray-700 flex items-center">
            <FaSchool className="h-6 w-6 mr-2" />
            School List
          </h2>
        </div>

        {/* Search Bar and Button */}
        <div className="flex justify-between items-center mb-6">
          {/* Search Input */}<div className="w-72 h-10 flex items-center border border-[#F3F4F6] rounded-lg px-3">
          <Search className="text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search schools..."
              className="flex-1 pl-3 py-2 outline-none"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Add Button */}
          <button
            className="bg-blue-500 text-white p-2.5 rounded-lg flex items-center justify-center"
            onClick={() => navigate("/dashboard/school/addSchool")}
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
                <th className="p-3 text-left">ID</th>
                <th className="p-3 text-left">Register No.</th>
                <th className="p-3 text-left">School Name</th>
                <th className="p-3 text-left">No. of Students</th>
                <th className="p-3 text-left">Principal Name</th>
                <th className="p-3 text-left">Contact</th>
                <th className="p-3 text-left">Address</th>
                <th className="p-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((school) => (
                <tr key={school.schoolId} className="hover:bg-gray-50 border-b border-[#F3F4F6]">
                  <td className="p-3 text-left">
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(school.schoolId)}
                      onChange={() => onSelectRow(school.schoolId)}
                    />
                  </td>
                  <td className="p-3 text-left text-gray-600 text-sm">{school.schoolId}</td>
                  <td
                    className="p-3 text-left text-blue-600 text-sm cursor-pointer underline"
                    onClick={() => navigate("/dashboard")}
                  >
                    {school.registerNo}
                  </td>
                  <td className="p-3 text-left text-gray-600 text-sm">{school.schoolName}</td>
                  <td className="p-3 text-left text-gray-600 text-sm">{school.studentsCount}</td>
                  <td className="p-3 text-left text-gray-600 text-sm">{school.principalName}</td>
                  <td className="p-3 text-left text-gray-600 text-sm">{school.contactNo}</td>
                  <td className="p-3 text-left text-gray-600 text-sm">{school.address}</td>
                  <td className="py-4 px-4 text-sm text-gray-600 flex gap-2">
                    <button
                      onClick={() => handleEdit(school)}
                      className="bg-green-100 text-green-500 p-2 rounded-lg hover:bg-green-200 transition"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(school.schoolId)}
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

export default School;
