const books = {
  list: {
    talmud: [
      {
        text: "Ta'anit",
        key: 'taanit',
        firstPage: [2, 'a'],
        lastPage: [31, 'a']
      }
    ]
  },

  getBooksWithPages() {
    const list = { ...this.list };
    for (let i = 0; i < list.talmud.length; i += 1) {
      const guemara = list.talmud[i];
      guemara.pages = getListPage(guemara.firstPage, guemara.lastPage);
    }
    return list;
  },

  getPagesByBookSlug(type, key) {
    const book = this.list[type].find(obj => obj.key === key);
    return getListPage(book.firstPage, book.lastPage);
  }
};

export default books;

export function getListPage(firstPage, lastPage) {
  const listPage = [];
  for (let i = firstPage[0]; i <= lastPage[0]; i += 1) {
    if (i !== firstPage[0] || firstPage[1] !== 'b') {
      listPage.push(`${i}a`);
    }
    if (i !== lastPage[0] || lastPage[1] !== 'a') {
      listPage.push(`${i}b`);
    }
  }
  return listPage;
}
