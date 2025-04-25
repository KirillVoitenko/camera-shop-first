export const getItemsByPage = <TItemsType>(items: TItemsType[], activePage: number, itemsCountByPage: number): TItemsType[] => {
  const maxItemNumber = itemsCountByPage * activePage;
  const minItemNumber = Math.max(maxItemNumber - itemsCountByPage, 0);
  return minItemNumber >= items.length
    ? []
    : items.slice(minItemNumber, maxItemNumber);
};
