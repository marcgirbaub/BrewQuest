const getNewRandomPage = (
  currentPage: number,
  requestedPages: number[],
  maxPages: number,
): number => {
  let newPage;

  do {
    newPage = Math.floor(Math.random() * maxPages) + 1;
  } while (requestedPages.includes(newPage) || newPage === currentPage);

  return newPage;
};

export default getNewRandomPage;
