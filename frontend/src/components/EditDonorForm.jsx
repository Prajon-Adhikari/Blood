import React, { useState } from "react";
import axiosInstance from "../axiosInstance";

const EditDonorForm = ({ donor, setShowEditForm, onUpdate }) => {
  const [formData, setFormData] = useState({
    streetNo: donor.streetNo || "",
    name: donor.name || "",
    age: donor.age || "",
    gender: donor.gender || "",
    bloodGroup: donor.bloodGroup || "",
    contact: donor.contact || "",
    disease: donor.disease || "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axiosInstance.put(`/donor/${donor._id}`, formData);
      onUpdate(response.data.donor); // update parent state
      setShowEditForm(false);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || "Error updating donor");
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Edit Donor</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          name="streetNo"
          value={formData.streetNo}
          onChange={handleChange}
          placeholder="Street No"
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          className="w-full border p-2 rounded"
        />
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          placeholder="Age"
          className="w-full border p-2 rounded"
        />
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <select
          name="bloodGroup"
          value={formData.bloodGroup}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="">Select Blood Group</option>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
        </select>
        <input
          type="text"
          name="contact"
          value={formData.contact}
          onChange={handleChange}
          placeholder="Contact"
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="disease"
          value={formData.disease}
          onChange={handleChange}
          placeholder="Disease"
          className="w-full border p-2 rounded"
        />

        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Donor"}
        </button>
      </form>
    </div>
  );
};

export default EditDonorForm;
