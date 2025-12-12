import React, { useState, useEffect } from "react";
import AddDonorForm from "./components/AddDonorForm";
import axiosInstance from "./axiosInstance";
import EditDonorForm from "./components/EditDonorForm";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export default function Home() {
  const [showAddDonorForm, setShowAddDonorForm] = useState(false);
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editDonor, setEditDonor] = useState(null);
  const [deleteDonor, setDeleteDonor] = useState(null);

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

  const exportToExcel = () => {
    // Excluded fields
    const excludeFields = ["_id", "__v", "userId", "updatedAt"];

    // Filter out unwanted fields
    const filteredDonors = donors.map((donor) => {
      const obj = {};
      Object.keys(donor).forEach((key) => {
        if (!excludeFields.includes(key)) {
          obj[key] = donor[key];
        }
      });
      return obj;
    });

    const worksheet = XLSX.utils.json_to_sheet(filteredDonors);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Donors");

    const excelBuffer = XLSX.write(workbook, {
      type: "array",
      bookType: "xlsx",
    });

    const data = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });

    saveAs(data, "donors.xlsx");
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900">
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-indigo-600">
              Donor management
            </p>
            <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
              Your donor list
            </h1>
            <p className="text-slate-600">
              View, edit, or delete donors. Add new donors with the button on
              the right.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setShowAddDonorForm(true)}
              className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-red-700"
            >
              + Add Donor
            </button>
            <button
              onClick={exportToExcel}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 mb-4"
            >
              Export to Excel
            </button>
          </div>
        </header>

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-sm text-slate-500">Total donors</p>
            <p className="text-3xl font-bold text-slate-900">{donors.length}</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-sm text-slate-500">Blood groups</p>
            <p className="text-lg font-semibold text-slate-900">
              {[...new Set(donors.map((d) => d.bloodGroup))].join(", ") || "—"}
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-sm text-slate-500">With conditions</p>
            <p className="text-lg font-semibold text-slate-900">
              {donors.filter((d) => d.disease).length}
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-sm text-slate-500">Contact ready</p>
            <p className="text-lg font-semibold text-slate-900">
              {donors.filter((d) => d.contact).length}
            </p>
          </div>
        </section>

        {donors.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center shadow-sm">
            <p className="text-lg font-semibold text-slate-800">
              No donors yet
            </p>
            <p className="text-slate-600">
              Add your first donor to see them listed here.
            </p>
            <div className="mt-4">
              <button
                onClick={() => setShowAddDonorForm(true)}
                className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
              >
                Add donor
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {donors.map((donor) => (
              <div
                key={donor._id}
                className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-sm font-semibold text-indigo-600">
                      Street {donor.streetNo}
                    </p>
                    <h3 className="text-xl font-bold text-slate-900">
                      {donor.name}
                    </h3>
                    <p className="text-sm text-slate-600">Age {donor.age}</p>
                  </div>
                  <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-700 ring-1 ring-red-100">
                    {donor.bloodGroup}
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-slate-700">
                  <div className="rounded-lg bg-slate-50 p-2">
                    <p className="text-xs text-slate-500">Gender</p>
                    <p className="font-semibold">{donor.gender}</p>
                  </div>
                  <div className="rounded-lg bg-slate-50 p-2">
                    <p className="text-xs text-slate-500">Contact</p>
                    <p className="font-semibold">{donor.contact || "—"}</p>
                  </div>
                  <div className="rounded-lg bg-slate-50 p-2">
                    <p className="text-xs text-slate-500">Disease</p>
                    <p className="font-semibold">{donor.disease || "None"}</p>
                  </div>
                  <div className="rounded-lg bg-slate-50 p-2">
                    <p className="text-xs text-slate-500">ID</p>
                    <p className="truncate font-mono text-xs text-slate-600">
                      {donor._id}
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => setEditDonor(donor)}
                    className="flex-1 rounded-lg border border-indigo-200 bg-indigo-50 px-3 py-2 text-sm font-semibold text-indigo-700 transition hover:bg-indigo-100"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => setDeleteDonor(donor)}
                    className="flex-1 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-100"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal */}
        {showAddDonorForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 bg-opacity-50 px-4">
            <div className="relative w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl">
              <button
                onClick={() => setShowAddDonorForm(false)}
                className="absolute right-3 top-3 text-gray-500 transition hover:text-gray-800"
              >
                &times;
              </button>
              <AddDonorForm setShowAddDonorForm={setShowAddDonorForm} />
            </div>
          </div>
        )}
        {editDonor && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
            <div className="relative w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl">
              <button
                onClick={() => setEditDonor(null)}
                className="absolute right-3 top-3 text-gray-500 transition hover:text-gray-800"
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
        {deleteDonor && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
            <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
              <button
                onClick={() => setDeleteDonor(null)}
                className="absolute right-3 top-3 text-gray-500 transition hover:text-gray-800"
              >
                &times;
              </button>
              <div className="space-y-3 text-slate-900">
                <h3 className="text-xl font-semibold">Delete donor</h3>
                <p className="text-sm text-slate-600">
                  Are you sure you want to remove{" "}
                  <span className="font-semibold text-red-600">
                    {deleteDonor?.name}
                  </span>
                  ? This action cannot be undone.
                </p>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => {
                      axiosInstance
                        .delete(`/donor/${deleteDonor._id}`)
                        .then(() => {
                          setDonors((prev) =>
                            prev.filter((d) => d._id !== deleteDonor._id)
                          );
                          setDeleteDonor(null);
                        })
                        .catch((err) => {
                          alert(
                            err.response?.data?.message ||
                              "Error deleting donor"
                          );
                        });
                    }}
                    className="inline-flex flex-1 items-center justify-center rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-red-700"
                  >
                    Yes, delete
                  </button>
                  <button
                    onClick={() => setDeleteDonor(null)}
                    className="inline-flex flex-1 items-center justify-center rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
