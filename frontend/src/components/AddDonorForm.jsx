import React, { useState } from "react";
import axiosInstance from "../axiosInstance";

const AddDonorForm = ({ setShowAddDonorForm }) => {
  const [formData, setFormData] = useState({
    streetNo: "",
    name: "",
    age: "",
    gender: "",
    bloodGroup: "",
    contact: "",
    disease: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/donor/add-donor", formData);
      console.log(response.data);
      setShowAddDonorForm(false);
      setFormData({
        streetNo: "",
        name: "",
        age: "",
        gender: "",
        bloodGroup: "",
        contact: "",
        disease: "",
      });
    } catch (error) {
      console.log("Error while adding donor", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-red-600 mb-6">Add Donor</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-semibold">Street No</label>
            <input
              type="text"
              name="streetNo"
              value={formData.streetNo}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-semibold">Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-semibold">Blood Group</label>
            <select
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="">Select</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
            </select>
          </div>
          <div>
            <label className="block mb-1 font-semibold">Contact</label>
            <input
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
        </div>

        <div>
          <label className="block mb-1 font-semibold">Any Disease</label>
          <textarea
            name="disease"
            value={formData.disease}
            onChange={handleChange}
            rows="3"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
          ></textarea>
        </div>

        <div className="flex space-x-4 mt-4">
          <button
            type="submit"
            className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Save Donor
          </button>
          <button
            type="button"
            className="px-6 py-2 border border-gray-300 rounded hover:bg-gray-100"
          >
            Back
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddDonorForm;
