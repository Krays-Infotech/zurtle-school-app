import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { Pagination } from "antd";
import { useNavigate } from "react-router-dom";
import { Search, Plus, Edit, Trash } from "lucide-react";
import { FaUserFriends } from "react-icons/fa";
import DeleteConfirmation from "../../utils/common/DeleteConfirmation/DeleteConfirmation";
import { getAllParent } from "../../Redux/Reducers/Parent/GetAllParentSlice";
import { deleteParent } from "../../Redux/Reducers/Parent/DeleteParentSlice";
import { deleteAllParent } from "../../Redux/Reducers/Parent/DeleteAllParentSlice";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Success, Error } from "../../config/helper";

const Parent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [parents, setParents] = useState([]);
  const [isDeleteConfirmation, setIsDeleteConformation] = useState(false);
  const [selectedParentId, setSelectedParentId] = useState(null);
  const [search, setSearch] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // Prevent fetching data twice in Strict Mode
  const isFetched = useRef(false);

  useEffect(() => {
    if (!isFetched.current) {
      fetchParents();
      isFetched.current = true;
    }
  }, []);

  const fetchParents = async () => {
    const resultResponse = await dispatch(getAllParent());
    console.log("response : ", resultResponse?.payload?.status)

    if (resultResponse?.payload?.status === true) {
      setParents(resultResponse.payload.data);
      Success("Successfully Fetched Parents.");
    } else {
      Error("Failed to fetch parents");
    }
  };

  // Filter data based on search
  const filteredData = parents.filter((parent) =>
    parent.id.toLowerCase().includes(search.toLowerCase())
  );

  // Paginate filtered data
  const paginatedData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Select/Deselect a row
  const onSelectRow = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  // Select/Deselect all rows on the current page
  const onSelectAll = (checked) => {
    const currentPageIds = paginatedData.map((parent) => parent.id);
    setSelectedRows((prev) =>
      checked
        ? [...new Set([...prev, ...currentPageIds])]
        : prev.filter((id) => !currentPageIds.includes(id))
    );
  };

  const isAllSelected = paginatedData.every((parent) =>
    selectedRows.includes(parent.id)
  );

  const handleEdit = (parent) =>{
    navigate("/dashboard/parent/addParent", { state: { parent } });
  }

  const handleDeleteClick = (parentId) => {
    setSelectedParentId(parentId);
    setIsDeleteConformation(true);
  };

  const handleDelete = async (parentId) => {
      try {
        const response = await dispatch(deleteParent({ id: parentId }));
        
        if (response?.payload?.status) {
          Success(response?.payload);
          setParents(parents.filter((parent) => parent.id !== parentId));
        } else {
          Error(response?.payload);
        }
      } catch (error) {
        console.error(error);
        Error("An error occurred while deleting the parent.");
      }
    };

    const handleBulkDelete = async () => {
      if (selectedRows.length === 0) {
        Error("Please select at least one parent to delete.");
        return;
      }

      try {
        const response = await dispatch(deleteAllParent({ ids: selectedRows }));
        if (response?.payload?.status) {
          Success(response?.payload.message);
          setParents((prev) => prev.filter((parent) => !selectedRows.includes(parent.id)));
          setSelectedRows([]);
        } else {
          Error(response?.payload.message || "Failed to delete selected parents.");
        }
      } catch (error) {
        console.error(error);
        Error("An error occurred while deleting selected parents.");
      }
    };
  
    const handleYes = async () => {
      if (selectedParentId) {
        await handleDelete(selectedParentId);
        setIsDeleteConformation(false);
        setSelectedParentId(null);
      }
    };

  return (
    <div className="flex font-quicksand">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full sm:w-[95%] md:w-[80%] ml-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-extrabold text-gray-700 flex items-center">
            <FaUserFriends className="h-6 w-6 mr-2" />
            Parent List
          </h2>
        </div>

        {/* Search Bar and Button */}
        <div className="flex justify-between items-center mb-6">
          <div className="relative w-72 h-10">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 z-10" />
            <input
              type="text"
              placeholder="Search by Student ID..."
              className="pl-12 pr-4 py-2 border-[#F3F4F6] border rounded-lg w-full focus:ring focus:ring-blue-300"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        {/* Add & Delete Button */}
        <div className="flex gap-2">
          <button
            className="bg-blue-500 text-white p-2.5 rounded-lg flex items-center justify-center"
            onClick={() => navigate("/dashboard/parent/addParent")}
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
  <tr className="whitespace-nowrap">
    <th className="p-3 text-left w-10">
      <input type="checkbox" checked={isAllSelected} onChange={(e) => onSelectAll(e.target.checked)} />
    </th>
    <th className="p-3 text-left w-40">Father's Name</th>
    <th className="p-3 text-left w-40">Mother's Name</th>
    <th className="p-3 text-left w-64">Address</th>
    <th className="p-3 text-left w-32">Contact No</th>
    <th className="p-3 text-left w-40">Email</th>
    <th className="p-3 text-left w-32">Actions</th>
  </tr>
</thead>

    <tbody>
      {paginatedData.map((parent) => (
        <tr key={parent.id} className="hover:bg-gray-50 border-b border-[#F3F4F6]">
          <td className="p-3 text-left">
            <input 
              type="checkbox" 
              checked={selectedRows.includes(parent.id)} 
              onChange={() => onSelectRow(parent.id)} 
            />
          </td>
          <td className="p-3 text-left text-gray-600 text-sm whitespace-nowrap">{parent.fatherName}</td>
          <td className="p-3 text-left text-gray-600 text-sm whitespace-nowrap">{parent.motherName}</td>
          <td className="p-3 text-left text-gray-600 text-sm whitespace-nowrap">{parent.address}</td>
          <td className="p-3 text-left text-gray-600 text-sm whitespace-nowrap">{parent.mobileNo1}</td>
          <td className="p-3 text-left text-gray-600 text-sm whitespace-nowrap">{parent.emailId}</td>
          <td className="py-4 px-4 text-sm text-gray-600 flex gap-2">
            <button onClick ={()=>handleEdit(parent)}className="bg-green-100 text-green-500 p-2 rounded-lg hover:bg-green-200 transition">
              <Edit size={16} />
            </button>
            <button 
              onClick={() => handleDeleteClick(parent.id)}
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
            text="Are you sure you want to delete this parent?"
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

export default Parent;
