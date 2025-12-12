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
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-semibold text-slate-900">Edit donor</h2>
        <p className="text-sm text-slate-600">
          Update donor details below. Fields left unchanged will keep their current values.
        </p>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700" htmlFor="edit-street">
              Street No
            </label>
            <input
              id="edit-street"
              type="text"
              name="streetNo"
              value={formData.streetNo}
              onChange={handleChange}
              placeholder="Street No"
              className="w-full rounded-lg border border-slate-200 px-3 py-2 outline-none ring-indigo-500 focus:ring-2"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700" htmlFor="edit-name">
              Name
            </label>
            <input
              id="edit-name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full name"
              className="w-full rounded-lg border border-slate-200 px-3 py-2 outline-none ring-indigo-500 focus:ring-2"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700" htmlFor="edit-age">
              Age
            </label>
            <input
              id="edit-age"
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="Age"
              className="w-full rounded-lg border border-slate-200 px-3 py-2 outline-none ring-indigo-500 focus:ring-2"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700" htmlFor="edit-gender">
              Gender
            </label>
            <select
              id="edit-gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 outline-none ring-indigo-500 focus:ring-2"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700" htmlFor="edit-blood">
              Blood Group
            </label>
            <select
              id="edit-blood"
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 outline-none ring-indigo-500 focus:ring-2"
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
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700" htmlFor="edit-contact">
              Contact
            </label>
            <input
              id="edit-contact"
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              placeholder="Phone or email"
              className="w-full rounded-lg border border-slate-200 px-3 py-2 outline-none ring-indigo-500 focus:ring-2"
            />
          </div>

          <div className="space-y-1 md:col-span-2">
            <label className="text-sm font-medium text-slate-700" htmlFor="edit-disease">
              Disease / conditions
            </label>
            <textarea
              id="edit-disease"
              name="disease"
              value={formData.disease}
              onChange={handleChange}
              placeholder="Optional notes"
              rows={3}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 outline-none ring-indigo-500 focus:ring-2"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-indigo-300"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update donor"}
          </button>
          <button
            type="button"
            onClick={() => setShowEditForm(false)}
            className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditDonorForm;
