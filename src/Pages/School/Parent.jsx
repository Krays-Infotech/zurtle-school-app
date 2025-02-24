import { useState } from "react";
import { Pagination } from "antd";
import { useNavigate } from "react-router-dom";
import { Search, Plus, Edit, Trash } from "lucide-react";
import { parentList } from "../../utils/data";
import { FaUserFriends } from "react-icons/fa";

const Parent = ({setSelectedParent}) => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // Filter data based on search
  const filteredData = parentList.filter((parent) =>
    parent.studentId.toLowerCase().includes(search.toLowerCase())
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
    setSelectedParent(parent);
    navigate("/dashboard/parent/addParent")

  }

  return (
    <div className="flex font-quicksand">
  <div className="bg-white rounded-xl shadow-lg p-6 w-[80%] max-w-6xl ml-auto">
        
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

          <button
            className="bg-blue-500 text-white p-2.5 rounded-lg flex items-center justify-center"
            onClick={() => navigate("/dashboard/parent/addParent")}
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

       {/* Table */}
<div className="overflow-x-auto">
  <table className="w-full rounded-lg">
  <thead className="bg-gray-100">
  <tr className="whitespace-nowrap">
    <th className="p-3 text-left w-10">
      <input type="checkbox" checked={isAllSelected} onChange={(e) => onSelectAll(e.target.checked)} />
    </th>
    <th className="p-3 text-left w-16">ID</th>
    <th className="p-3 text-left w-32">Student ID</th>
    <th className="p-3 text-left w-40">Father's Name</th>
    <th className="p-3 text-left w-40">Mother's Name</th>
    <th className="p-3 text-left w-64">Address</th>
    <th className="p-3 text-left w-32">Phone</th>
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
          <td className="p-3 text-left text-gray-600 text-sm whitespace-nowrap">{parent.id}</td>
          <td className="p-3 text-left text-gray-600 text-sm whitespace-nowrap">{parent.studentId}</td>
          <td className="p-3 text-left text-gray-600 text-sm whitespace-nowrap">{parent.motherName}</td>
          <td className="p-3 text-left text-gray-600 text-sm whitespace-nowrap">{parent.fatherName}</td>
          <td className="p-3 text-left text-gray-600 text-sm whitespace-nowrap">{parent.address}</td>
          <td className="p-3 text-left text-gray-600 text-sm whitespace-nowrap">{parent.phone}</td>
          <td className="p-3 text-left text-gray-600 text-sm whitespace-nowrap">{parent.email}</td>
          <td className="py-4 px-4 text-sm text-gray-600 flex gap-2">
            <button onClick ={()=>handleEdit(parent)}className="bg-green-100 text-green-500 p-2 rounded-lg hover:bg-green-200 transition">
              <Edit size={16} />
            </button>
            <button className="bg-red-100 text-red-500 p-2 rounded-lg hover:bg-red-200 transition">
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

export default Parent;
