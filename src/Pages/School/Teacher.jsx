import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { Pagination } from "antd";
import { useNavigate } from "react-router-dom";
import { Search, Plus, Edit, Trash } from "lucide-react";
import { FaChalkboardTeacher } from "react-icons/fa";
import { getAllTeacher } from "../../Redux/Reducers/Teacher/GetAllTeacherSlice";
import { deleteTeacher } from "../../Redux/Reducers/Teacher/DeleteTeacherSlice";
import { deleteAllTeacher } from "../../Redux/Reducers/Teacher/DeleteAllTeacherSlice";
import DeleteConfirmation from "../../utils/common/DeleteConfirmation/DeleteConfirmation";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Success, Error } from "../../config/helper";

const Teacher = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [teachers, setTeachers] = useState([]);
  const [isDeleteConfirmation, setIsDeleteConformation] = useState(false);
  const [selectedTeacherId, setSelectedTeacherId] = useState(null);
  const [isBulkDelete, setIsBulkDelete] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // Prevent fetching data twice in Strict Mode
  const isFetched = useRef(false);

  useEffect(() => {
    if (!isFetched.current) {
      fetchTeachers();
      isFetched.current = true;
    }
  }, []);

  const fetchTeachers = async () => {
    const resultResponse = await dispatch(getAllTeacher());

    if (resultResponse?.payload?.status === true) {
      setTeachers(resultResponse.payload.data);
      Success("Successfully Fetched Teachers.");
    } else {
      Error("Failed to fetch teachers");
    }
  };

  // Filter data based on search value
  const filteredData = teachers.filter((teacher) =>
    teacher.name.toLowerCase().includes(search.toLowerCase())
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
    const currentPageIds = paginatedData.map((teacher) => teacher.id);
    setSelectedRows((prev) =>
      checked ? [...new Set([...prev, ...currentPageIds])] : prev.filter((teacherId) => !currentPageIds.includes(teacherId))
    );
  };

  // Select the current page
  const isAllSelected = paginatedData.every((teacher) =>
    selectedRows.includes(teacher.id)
  );

  const handleDeleteClick = (teacherId) => {
    setSelectedTeacherId(teacherId);
    setIsBulkDelete(false);
    setIsDeleteConformation(true);
  };

  const handleBulkDeleteClick = () => {
    if (selectedRows.length > 0) {
      setIsBulkDelete(true);
      setIsDeleteConformation(true);
    }
  };

  const handleEdit = (teacher) => {
    navigate("/dashboard/teacher/addTeacher", { state: { teacher } });
  };

  const handleDelete = async (teacherId) => {
    try {
      const response = await dispatch(deleteTeacher({ id: teacherId }));
      
      if (response?.payload?.status) {
        Success(response.payload.message);
        setTeachers(teachers.filter((teacher) => teacher.id !== teacherId));
      } else {
        Error(response?.payload);
      }
    } catch (error) {
      console.error(error);
      Error("An error occurred while deleting the teacher.");
    }
  };

  const handleBulkDelete = async () => {
    if (selectedRows.length === 0) {
      Error("No teachers selected for deletion.");
      return;
    }
    try {
      const response = await dispatch(deleteAllTeacher({ ids: selectedRows }));

      Success("Successfully deleted selected teachers.");
      setTeachers((prev) => prev.filter((teacher) => !selectedRows.includes(teacher.id)));
      setSelectedRows([]);
    } catch (error) {
      console.error(error);
      Error("An error occurred while deleting the teachers.");
    }
  };

  const handleYes = async () => {
    if (isBulkDelete) {
      await handleBulkDelete();
    } else if (selectedTeacherId) {
      await handleDelete([selectedTeacherId]);
    }
    setIsDeleteConformation(false);
    setSelectedTeacherId(null);
  };

  return (
    <div className="flex font-quicksand">
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
          <div className="relative w-72 h-10">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 z-10" />
            <input
              type="text"
              placeholder="Search teachers..."
              className="pl-12 pr-4 py-2 border-[#F3F4F6] border rounded-lg w-full focus:ring focus:ring-blue-300"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Add & Delete Button */}
          <div className="flex gap-2">
            <button
              className="bg-blue-500 text-white p-2.5 rounded-lg flex items-center justify-center"
              onClick={() => navigate("/dashboard/teacher/addTeacher")}
            >
              <Plus className="w-5 h-5" />
            </button>
            <button
              className={`bg-red-500 text-white p-2.5 rounded-lg flex items-center justify-center ${
                selectedRows.length === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
              onClick={handleBulkDeleteClick}
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
                  key={teacher.id}
                  className="hover:bg-gray-50 border-b border-[#F3F4F6]"
                >
                  <td className="p-3 text-left">
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(teacher.id)}
                      onChange={() => onSelectRow(teacher.id)}
                    />
                  </td>
                  <td className="p-3 text-left text-gray-600 text-sm">
                    {teacher.name}
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
                    {teacher.mobileNo}
                  </td>
                  <td className="p-3 text-left text-gray-600 text-sm">
                    {teacher.emailId}
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-600 flex gap-2">
                    <button
                      onClick={() => handleEdit(teacher)}
                      className="bg-green-100 text-green-500 p-2 rounded-lg hover:bg-green-200 transition"
                    >
                      <Edit size={16} />
                    </button>
                    <button 
                      onClick={() => handleDeleteClick(teacher.id)}
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
            text="Are you sure you want to delete this?"
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

export default Teacher;
