function generateUrlParams(filters) {
  const params = new URLSearchParams();
  filters.forEach(({ id, value }) => {
    params.append(id, value);
  });
  return params.toString();
}

const handleOnFilter = (newFilters, setFiltersList) => {
  if (newFilters.length === 0) {
    setFiltersList([]);
  } else {
    setFiltersList((prevFilters) => {
      const updatedFilters = [...prevFilters];

      newFilters.forEach((newFilter) => {
        const existingFilterIndex = updatedFilters.findIndex(
          (filter) => filter.id === newFilter.id
        );

        if (existingFilterIndex !== -1) {
          updatedFilters[existingFilterIndex] = newFilter;
        } else {
          updatedFilters.push(newFilter);
        }
      });

      return updatedFilters;
    });
  }
};

export { generateUrlParams, handleOnFilter };
