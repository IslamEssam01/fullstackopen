const Persons = ({ persons, searchKeyword, handleDelete }) => {
  return (
    <>
      {persons.map(
        (person) =>
          person.name.toLowerCase().includes(searchKeyword.toLowerCase()) && (
            <div key={person.name}>
              <span>
                {person.name} {person.number}
              </span>
              {"    "}
              <button onClick={() => handleDelete(person)}>delete</button>
            </div>
          ),
      )}
    </>
  );
};

export default Persons;
