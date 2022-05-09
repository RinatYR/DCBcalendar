export const getFiltersListService = async () => {
  const filtersData = await fetch("/rest/categories");
  const filtersList = await filtersData.json();

  return filtersList;
};
