const Categories = ({
  categories,
  selectedCategories,
  setSelectedCategories,
}) => {
   const handleCheckboxChange = (id) => {
     if (selectedCategories.includes(id)) {
       setSelectedCategories(
         selectedCategories.filter((catId) => catId !== id)
       );
     } else {
       setSelectedCategories([...selectedCategories, id]);
     }
   };

  return (
    <div>
      <RecursiveCategories
        categories={categories}
        selectedCategories={selectedCategories}
        handleCheckboxChange={handleCheckboxChange}
      />
    </div>
  );
};
export default Categories;

const RecursiveCategories = ({
  categories,
  parentId = 0,
  depth = 0,
  selectedCategories,
  handleCheckboxChange,
}) => {
  const parentFilter = categories.filter((item) => item.parent === parentId);

  if (parentFilter.lenght === 0) {
    return null;
  }

  return (
    <div>
      <ul>
        {parentFilter.map((item) => {
          return (
            <li key={item.id} className="mr-12 mt-2">
              <label>
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(item.id)}
                  onChange={() => handleCheckboxChange(item.id)}
                />
                {item.name}
              </label>
              <RecursiveCategories
                categories={categories}
                parentId={item.id}
                depth={depth + 1}
                selectedCategories={selectedCategories}
                handleCheckboxChange={handleCheckboxChange}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};
