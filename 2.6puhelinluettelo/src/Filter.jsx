const filter = ({ filter, setFilter }) => {
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div>
      Filter shown with: <input value={filter} onChange={handleFilterChange} />
    </div>
  );
};

export default filter;
