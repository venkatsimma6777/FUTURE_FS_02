import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [leads, setLeads] = useState([]);
  const [search, setSearch] = useState("");
  const [activePage, setActivePage] = useState("dashboard");

  // FETCH LEADS
  const fetchLeads = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/leads");
      setLeads(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  // UPDATE STATUS
  const updateStatus = async (id, status) => {
    try {
      await axios.put(`http://localhost:5000/api/leads/${id}`, {
        status,
      });

      fetchLeads();
    } catch (error) {
      console.log(error);
    }
  };

  // SEARCH FILTER
  const filteredLeads = leads.filter((lead) =>
    lead.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900 text-white flex">

      {/* SIDEBAR */}
      <div className="w-64 bg-gray-900 p-6 shadow-xl">

        <h1 className="text-3xl font-bold mb-10 text-blue-400">
          🚀 Mini CRM
        </h1>

        <nav className="space-y-5 text-gray-300">

          <p
            onClick={() => setActivePage("dashboard")}
            className="hover:text-blue-400 cursor-pointer transition"
          >
            Dashboard
          </p>

          <p
            onClick={() => setActivePage("leads")}
            className="hover:text-blue-400 cursor-pointer transition"
          >
            Leads
          </p>

          <p
            onClick={() => setActivePage("analytics")}
            className="hover:text-blue-400 cursor-pointer transition"
          >
            Analytics
          </p>

        </nav>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 p-8">

        {/* DASHBOARD PAGE */}
        {activePage === "dashboard" && (

          <div>

            {/* HEADER */}
            <div className="mb-8">

              <h1 className="text-4xl font-bold">
                Welcome Back 👋
              </h1>

              <p className="text-gray-400 mt-2">
                Manage your leads and client conversions easily.
              </p>

            </div>

            {/* TOP STATS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">

              {/* TOTAL */}
              <div className="bg-gray-900 p-6 rounded-2xl shadow-lg border border-gray-800 hover:scale-105 transition duration-300">

                <h2 className="text-gray-400 text-lg">
                  Total Leads
                </h2>

                <p className="text-4xl font-bold mt-2">
                  {leads.length}
                </p>

              </div>

              {/* CONTACTED */}
              <div className="bg-gray-900 p-6 rounded-2xl shadow-lg border border-gray-800 hover:scale-105 transition duration-300">

                <h2 className="text-gray-400 text-lg">
                  Contacted
                </h2>

                <p className="text-4xl font-bold mt-2">
                  {
                    leads.filter(
                      (lead) =>
                        lead.status &&
                        lead.status.toLowerCase() === "contacted"
                    ).length
                  }
                </p>

              </div>

              {/* CONVERTED */}
              <div className="bg-gray-900 p-6 rounded-2xl shadow-lg border border-gray-800 hover:scale-105 transition duration-300">

                <h2 className="text-gray-400 text-lg">
                  Converted
                </h2>

                <p className="text-4xl font-bold mt-2">
                  {
                    leads.filter(
                      (lead) =>
                        lead.status &&
                        lead.status.toLowerCase() === "converted"
                    ).length
                  }
                </p>

              </div>

            </div>

            {/* TABLE SECTION */}
            <div className="bg-gray-900 rounded-2xl p-6 shadow-lg border border-gray-800">

              {/* TABLE HEADER */}
              <div className="flex justify-between items-center mb-5">

                <h2 className="text-3xl font-bold">
                  Client Leads
                </h2>

                {/* SEARCH */}
                <input
                  type="text"
                  placeholder="Search leads..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="bg-gray-800 px-4 py-2 rounded-xl outline-none w-64"
                />

              </div>

              {/* TABLE */}
              <div className="overflow-x-auto">

                <table className="w-full text-left">

                  <thead>
                    <tr className="border-b border-gray-700 text-gray-400">

                      <th className="py-4">Name</th>
                      <th>Email</th>
                      <th>Source</th>
                      <th>Status</th>
                      <th>Notes</th>

                    </tr>
                  </thead>

                  <tbody>

                    {filteredLeads.length === 0 ? (
                      <tr>
                        <td
                          colSpan="5"
                          className="text-center py-10 text-gray-500"
                        >
                          No leads found 👀
                        </td>
                      </tr>
                    ) : (
                      filteredLeads.map((lead) => (
                        <tr
                          key={lead._id}
                          className="border-b border-gray-800 hover:bg-gray-800 transition"
                        >

                          {/* NAME */}
                          <td className="py-5 font-semibold">
                            {lead.name}
                          </td>

                          {/* EMAIL */}
                          <td>{lead.email}</td>

                          {/* SOURCE */}
                          <td>{lead.source}</td>

                          {/* STATUS */}
                          <td>
                            <select
                              value={lead.status || "New"}
                              onChange={(e) =>
                                updateStatus(lead._id, e.target.value)
                              }
                              className={`px-3 py-2 rounded-xl font-semibold outline-none
                              ${
                                lead.status?.toLowerCase() === "converted"
                                  ? "bg-green-600"
                                  : lead.status?.toLowerCase() === "contacted"
                                  ? "bg-yellow-500 text-black"
                                  : "bg-blue-600"
                              }`}
                            >
                              <option value="New">New</option>

                              <option value="Contacted">
                                Contacted
                              </option>

                              <option value="Converted">
                                Converted
                              </option>

                            </select>
                          </td>

                          {/* NOTES */}
                          <td>{lead.notes}</td>

                        </tr>
                      ))
                    )}

                  </tbody>

                </table>

              </div>

            </div>

          </div>
        )}

        {/* LEADS PAGE */}
        {activePage === "leads" && (

          <div>

            <h1 className="text-4xl font-bold mb-8">
              📋 Leads Management
            </h1>

            <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800">

              <p className="text-gray-400 mb-4">
                Total Leads Available
              </p>

              <h2 className="text-5xl font-bold">
                {leads.length}
              </h2>

            </div>

          </div>
        )}

        {/* ANALYTICS PAGE */}
        {activePage === "analytics" && (

          <div>

            <h1 className="text-4xl font-bold mb-8">
              📊 Analytics
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

              {/* TOTAL */}
              <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800">

                <h2 className="text-gray-400">
                  Total Leads
                </h2>

                <p className="text-4xl font-bold mt-2">
                  {leads.length}
                </p>

              </div>

              {/* CONVERTED */}
              <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800">

                <h2 className="text-gray-400">
                  Converted Clients
                </h2>

                <p className="text-4xl font-bold mt-2">
                  {
                    leads.filter(
                      (lead) =>
                        lead.status &&
                        lead.status.toLowerCase() === "converted"
                    ).length
                  }
                </p>

              </div>

              {/* RATE */}
              <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800">

                <h2 className="text-gray-400">
                  Conversion Rate
                </h2>

                <p className="text-4xl font-bold mt-2">
                  {leads.length > 0
                    ? Math.round(
                        (leads.filter(
                          (lead) =>
                            lead.status &&
                            lead.status.toLowerCase() === "converted"
                        ).length /
                          leads.length) *
                          100
                      )
                    : 0}
                  %
                </p>

              </div>

            </div>

          </div>
        )}

      </div>

    </div>
  );
}

export default App;