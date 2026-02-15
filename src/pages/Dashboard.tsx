import { useState, useEffect } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import ActivityTimeline from "../components/ActivityTimeline";
import SearchBar from "../components/SearchBar";
import data from "../data/activities.json";
import "../styles/layout.css";
import Breadcrumb from "../components/Breadcrumb";
import Footer from "../components/Footer";


export default function Dashboard() {
  const modules = [...new Set(data.map((d) => d.module))];
  const customers = [...new Set(data.map((d) => d.customer))];
  const activityTypes = [...new Set(data.map((d) => d.activityType))].sort();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filters, setFilters] = useState<any>({});
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const applyFilters = (newFilters: any) => {
    setFilters(newFilters);
    setSidebarOpen(false);
  };

  const filteredData = data.filter((item) => {
    // Module filter
    if (
      filters.selectedModules?.length &&
      !filters.selectedModules.includes(item.module)
    ) {
      return false;
    }

    // Customer filter
    if (
      filters.selectedCustomers?.length &&
      !filters.selectedCustomers.includes(item.customer)
    ) {
      return false;
    }

    // Activity filter
    if (
      filters.activityType &&
      filters.activityType !== "All" &&
      item.activityType !== filters.activityType
    ) {
      return false;
    }

    // Min Amount filter
    if (filters.minAmount !== undefined && item.amount < filters.minAmount) {
      return false;
    }

    // Max Amount filter
    if (filters.maxAmount !== undefined && item.amount > filters.maxAmount) {
      return false;
    }

    // Search filter
    if (searchText.trim() !== "") {
      const text = searchText.toLowerCase();
      const searchable =
        `${item.user} ${item.customer} ${item.description} ${item.module}`.toLowerCase();

      if (!searchable.includes(text)) return false;
    }

    return true;
  });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );
  useEffect(() => {
    setCurrentPage(1);
  }, [filters, searchText]);

  return (
    <div className="pageWrapper">
      <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <Breadcrumb />

      <div className="layout">
        <Sidebar
          modules={modules}
          customers={customers}
          activityTypes={activityTypes}
          onApplyFilters={applyFilters}
          isOpen={sidebarOpen}
        />

        <div className="contentArea">
          <SearchBar value={searchText} onChange={setSearchText} />

          <ActivityTimeline data={paginatedData} />
          <div className="pagination">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
            >
              Prev
            </button>

            <span>
              Page <span style={{color:"#6c63ff", backgroundColor:"white", padding:"5px", border:"0.3px solid grey", borderRadius:"4px"}}> {currentPage}</span> of {totalPages}
            </span>

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
            >
              Next
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
