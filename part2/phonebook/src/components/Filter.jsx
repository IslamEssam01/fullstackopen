const Filter = ({ searchKeyword, setSearchKeyword }) => {
  return (
    <div>
      filter shown with{" "}
      <input
        value={searchKeyword}
        onChange={(e) => {
          setSearchKeyword(e.target.value);
        }}
      />
    </div>
  );
};

export default Filter;
