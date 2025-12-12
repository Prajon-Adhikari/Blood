import React, { useState, useEffect } from "react";
import AddDonorForm from "./components/AddDonorForm";
import axiosInstance from "./axiosInstance";
import EditDonorForm from "./components/EditDonorForm";

export default function Home() {
  const [showAddDonorForm, setShowAddDonorForm] = useState(false);
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editDonor, setEditDonor] = useState(null);

  useEffect(() => {
    const fetchDonors = async () => {
      try {
        const response = await axiosInstance.get("/donor/mydonor"); // protected route
        setDonors(response.data);
        console.log(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || "Error fetching donors");
        setLoading(false);
      }
    };

    fetchDonors();
  }, []);

  if (loading) return <p>Loading donors...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Donor List</h2>
      <button
        onClick={() => setShowAddDonorForm(true)}
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
      >
        Add Donor
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {donors.map((donor) => (
          <div
            key={donor._id}
            className="border p-4 rounded-lg shadow hover:shadow-lg transition"
          >
            <button
              onClick={() => setEditDonor(donor)}
              className="mt-2 px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Edit
            </button>
            <button
              onClick={() => {
                const confirmDelete = window.confirm(
                  `Are you sure you want to delete donor ${donor.name}?`
                );
                if (confirmDelete) {
                  axiosInstance
                    .delete(`/donor/${donor._id}`)
                    .then(() => {
                      setDonors((prev) =>
                        prev.filter((d) => d._id !== donor._id)
                      );
                    })
                    .catch((err) => {
                      alert(
                        err.response?.data?.message || "Error deleting donor"
                      );
                    });
                }
              }}
              className="mt-2 px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Delete
            </button>
            <p>
              <strong>Street No:</strong> {donor.streetNo}
            </p>
            <p>
              <strong>Name:</strong> {donor.name}
            </p>
            <p>
              <strong>Age:</strong> {donor.age}
            </p>
            <p>
              <strong>Gender:</strong> {donor.gender}
            </p>
            <p>
              <strong>Blood Group:</strong> {donor.bloodGroup}
            </p>
            <p>
              <strong>Contact:</strong> {donor.contact}
            </p>
            <p>
              <strong>Disease:</strong> {donor.disease}
            </p>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showAddDonorForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl relative">
            <button
              onClick={() => setShowAddDonorForm(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 font-bold text-xl"
            >
              &times;
            </button>
            <AddDonorForm setShowAddDonorForm={setShowAddDonorForm} />
          </div>
        </div>
      )}
      {editDonor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl relative">
            <button
              onClick={() => setEditDonor(null)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 font-bold text-xl"
            >
              &times;
            </button>
            <EditDonorForm
              donor={editDonor}
              setShowEditForm={setEditDonor}
              onUpdate={(updatedDonor) => {
                setDonors((prev) =>
                  prev.map((d) =>
                    d._id === updatedDonor._id ? updatedDonor : d
                  )
                );
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
