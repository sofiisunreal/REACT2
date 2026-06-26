import React, { useEffect, useState } from "react";
import axios from "axios";

const GetDepartment = () => {
  // State hooks
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");

  // Fetch departments
  const fetchDepartments = async () => {
    setLoading("Loading departments...");
    setError("");

    try {
      const response = await axios.get(
        "https://sophieemp.alwaysdata.net/api/departments/"
      );

      setDepartments(response.data);
      setLoading("");
      
    } catch (err) {
      console.log(err);
      setLoading("");
      setError("Failed to fetch departments.");
    }
  };

  // Fetch data when component loads
  useEffect(() => {
    fetchDepartments();
  }, []);

  return (
    <div className="min-h-screen bg-gray-200 flex justify-center items-center p-6">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg p-6">

        {/* Header */}
        <div className="border-b pb-3 mb-4">
          <h2 className="text-2xl font-bold text-gray-800">
            Departments
          </h2>
          <p className="text-gray-500 text-sm">
            List of all departments
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <p className="text-indigo-600 text-sm mb-4">
            {loading}
          </p>
        )}

        {/* Error */}
        {error && (
          <p className="text-red-600 text-sm mb-4">
            {error}
          </p>
        )}

        {/* Table */}
        {!loading && !error && (
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-indigo-600 text-white">
                  <th className="px-4 py-3 text-left">ID</th>
                  <th className="px-4 py-3 text-left">
                    Department Name
                  </th>
                </tr>
              </thead>

              <tbody>
                {departments.length > 0 ? (
                  departments.map((department) => (
                    <tr
                      key={department.id}
                      className="border-b hover:bg-gray-100"
                    >
                      <td className="px-4 py-3">
                        {department.id}
                      </td>
                      <td className="px-4 py-3">
                        {department.name}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="2"
                      className="text-center py-4 text-gray-500"
                    >
                      No departments found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Refresh Button */}
        <div className="mt-5">
          <button
            onClick={fetchDepartments}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg transition"
          >
            Refresh
          </button>
        </div>

      </div>
    </div>
  );
};

export default GetDepartment;