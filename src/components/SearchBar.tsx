import "../styles/searchbar.css";
type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function SearchBar({ value, onChange }: Props) {
  return (
    <div className="search-bar" >
      <input
        type="text"
        placeholder="Search by name, description..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="SearchBar-input"
      />
    </div>
  );
}
