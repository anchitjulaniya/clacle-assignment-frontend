import { useState } from "react";
import "../styles/sidebar.css";
const maxLimit = 150000;

type Props = {
  modules: string[];
  customers: string[];
  activityTypes: string[];
  onApplyFilters: (filters: any) => void;
  isOpen: boolean;
};

export default function Sidebar({
  modules,
  customers,
  activityTypes,
  onApplyFilters,
  isOpen,
}: Props) {
  const [selectedModules, setSelectedModules] = useState<string[]>([]);
  const [selectedCustomers, setSelectedCustomers] = useState<string[]>([]);
  const [activityType, setActivityType] = useState("All");
  const [amount, setAmount] = useState(80000);
  const [minAmount, setMinAmount] = useState(4000);
  const [maxAmount, setMaxAmount] = useState(92000);

  const [showAllModules, setShowAllModules] = useState(false);
  const [showAllCustomers, setShowAllCustomers] = useState(false);
  const [showAllActivities, setShowAllActivities] = useState(false);

  const toggleModule = (module: string) => {
    setSelectedModules((prev) =>
      prev.includes(module)
        ? prev.filter((m) => m !== module)
        : [...prev, module],
    );
  };

  const toggleCustomer = (customer: string) => {
    setSelectedCustomers((prev) =>
      prev.includes(customer)
        ? prev.filter((c) => c !== customer)
        : [...prev, customer],
    );
  };

  const applyFilters = () => {
    onApplyFilters({
      selectedModules,
      selectedCustomers,
      activityType,
      minAmount,
    maxAmount,
    });
  };
  const applyClear = () => {
    setSelectedModules([]);
    setSelectedCustomers([]);
    setActivityType("All");
    setMinAmount(0);
    setMaxAmount(150000);

    // Reset filters in Dashboard
    onApplyFilters({});
  };

  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <h3>Filters</h3>

      <h4>Modules</h4>
      {(showAllModules ? modules : modules.slice(0, 4)).map((module) => (
        <label key={module} className="checkboxLabel">
          <input
            type="checkbox"
            checked={selectedModules.includes(module)}
            onChange={() => toggleModule(module)}
          />
          <span className="customCheckbox"></span>
          {module}
        </label>
      ))}
      <span>
        {modules.length > 4 && (
          <button
            className="seeMoreBtn"
            onClick={() => setShowAllModules(!showAllModules)}
          >
            {showAllModules ? "See Less" : "See More"}
          </button>
        )}
      </span>

      <h4>Customers</h4>
      {(showAllCustomers ? customers : customers.slice(0, 4)).map(
        (customer) => (
          <label key={customer} className="checkboxLabel">
            <input
              type="checkbox"
              checked={selectedCustomers.includes(customer)}
              onChange={() => toggleCustomer(customer)}
            />
            <span className="customCheckbox"></span>
            {customer}
          </label>
        ),
      )}
      <span>
        {customers.length > 4 && (
          <button
            className="seeMoreBtn"
            onClick={() => setShowAllCustomers(!showAllCustomers)}
          >
            {showAllCustomers ? "See Less" : "See More"}
          </button>
        )}
      </span>

      <h4>Activity</h4>

      {(showAllActivities
        ? ["All", ...activityTypes]
        : ["All", ...activityTypes].slice(0, 4)
      ).map((type) => (
        <label key={type} className="radioLabel">
          <input
            type="radio"
            name="activity"
            checked={activityType === type}
            onChange={() => setActivityType(type)}
          />
          <span className="customRadio"></span>
          {type}
        </label>
      ))}

      {activityTypes.length > 3 && (
        <button
          className="seeMoreBtn"
          onClick={() => setShowAllActivities(!showAllActivities)}
        >
          {showAllActivities ? "See Less" : "See More"}
        </button>
      )}

      <h4>Balance</h4>

      <div className="rangeWrapper">
   
        <div className="sliderTrack"></div>


        <div
          className="sliderRange"
          style={{
            left: `${(minAmount / maxLimit) * 100}%`,
            width: `${((maxAmount - minAmount) / maxLimit) * 100}%`,
          }}
        ></div>

        <input
          type="range"
          min="0"
          max={maxLimit}
          value={minAmount}
          onChange={(e) =>
            setMinAmount(Math.min(Number(e.target.value), maxAmount - 1))
          }
          className="range rangeMin"
        />

        <input
          type="range"
          min="0"
          max={maxLimit}
          value={maxAmount}
          onChange={(e) =>
            setMaxAmount(Math.max(Number(e.target.value), minAmount + 1))
          }
          className="range rangeMax"
        />
      </div>

      <div className="amountRow">
        <span>₹ {minAmount.toLocaleString()}</span>
        <span>₹ {maxAmount.toLocaleString()}</span>
      </div>

      <div className="filterButtons">
        <button
          className="clearBtn"
          onClick={applyClear}
          disabled={
            !selectedModules.length &&
            !selectedCustomers.length &&
            activityType === "All" &&
            amount === 150000
          }
        >
          Clear
        </button>

        <button className="applyBtn" onClick={applyFilters}>
          Apply Filter
        </button>
      </div>
    </div>
  );
}
