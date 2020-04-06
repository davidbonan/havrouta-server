const books = {
  list: {
    talmud: [
      {
        text: 'Brakhot',
        key: 'brakhot',
        firstPage: [2, 'a'],
        lastPage: [64, 'a']
      },
      {
        text: 'Chabbath',
        key: 'chabbath',
        firstPage: [2, 'a'],
        lastPage: [105, 'a']
      },
      {
        text: 'Erouvin',
        key: 'erouvin',
        firstPage: [2, 'a'],
        lastPage: [157, 'b']
      },
      {
        text: "Pessa'him",
        key: 'pessa-him',
        firstPage: [2, 'a'],
        lastPage: [121, 'b']
      },
      {
        text: 'Chekalim',
        key: 'chekalim',
        firstPage: [2, 'a'],
        lastPage: [22, 'b']
      },
      {
        text: 'Yoma',
        key: 'yoma',
        firstPage: [2, 'a'],
        lastPage: [88, 'a']
      },
      {
        text: 'Soucca',
        key: 'soucca',
        firstPage: [2, 'a'],
        lastPage: [56, 'b']
      },
      {
        text: 'Betsa',
        key: 'betsa',
        firstPage: [2, 'a'],
        lastPage: [40, 'b']
      },
      {
        text: 'Roch Hachana',
        key: 'roch-hachana',
        firstPage: [2, 'a'],
        lastPage: [35, 'a']
      },
      {
        text: "Ta'anit",
        key: 'taanit',
        firstPage: [2, 'a'],
        lastPage: [31, 'a']
      },
      {
        text: 'Meguila',
        key: 'meguila',
        firstPage: [2, 'a'],
        lastPage: [32, 'a']
      },
      {
        text: 'Moèd Katan',
        key: 'moed-katan',
        firstPage: [2, 'a'],
        lastPage: [29, 'a']
      },
      {
        text: "'Haguiga",
        key: 'haguiga',
        firstPage: [2, 'a'],
        lastPage: [27, 'a']
      },
      {
        text: 'Yebamot',
        key: 'yebamot',
        firstPage: [2, 'a'],
        lastPage: [122, 'a']
      },
      {
        text: 'Ketouvot',
        key: 'ketouvot',
        firstPage: [2, 'a'],
        lastPage: [112, 'b']
      },
      {
        text: 'Nedarim',
        key: 'nedarim',
        firstPage: [2, 'a'],
        lastPage: [91, 'b']
      },
      {
        text: 'Nazir',
        key: 'nazir',
        firstPage: [2, 'a'],
        lastPage: [66, 'b']
      },
      {
        text: 'Sota',
        key: 'sota',
        firstPage: [2, 'a'],
        lastPage: [49, 'b']
      },
      {
        text: 'Guitin',
        key: 'guitin',
        firstPage: [2, 'a'],
        lastPage: [90, 'a']
      },
      {
        text: 'Kidouchine',
        key: 'kidouchine',
        firstPage: [2, 'a'],
        lastPage: [82, 'b']
      },
      {
        text: 'Baba Kama',
        key: 'baba-kama',
        firstPage: [2, 'a'],
        lastPage: [119, 'b']
      },
      {
        text: 'Baba Metsia',
        key: 'baba-metsia',
        firstPage: [2, 'a'],
        lastPage: [119, 'a']
      },
      {
        text: 'Baba Batra',
        key: 'baba-batra',
        firstPage: [2, 'a'],
        lastPage: [176, 'b']
      },
      {
        text: 'Sanhedrine',
        key: 'sanhedrine',
        firstPage: [2, 'a'],
        lastPage: [113, 'b']
      },
      {
        text: 'Makot',
        key: 'makot',
        firstPage: [2, 'a'],
        lastPage: [24, 'b']
      },
      {
        text: 'Chvouot',
        key: 'chvouot',
        firstPage: [2, 'a'],
        lastPage: [49, 'b']
      },
      {
        text: 'Avoda Zara',
        key: 'avoda-zara',
        firstPage: [2, 'a'],
        lastPage: [76, 'b']
      },
      {
        text: 'Horayot',
        key: 'horayot',
        firstPage: [2, 'a'],
        lastPage: [14, 'a']
      },
      {
        text: 'Zevakhim',
        key: 'zevakhim',
        firstPage: [2, 'a'],
        lastPage: [120, 'b']
      },
      {
        text: "Mena'hot",
        key: 'mena-hot',
        firstPage: [2, 'a'],
        lastPage: [110, 'a']
      },
      {
        text: "'Houlin",
        key: 'houlin',
        firstPage: [2, 'a'],
        lastPage: [142, 'a']
      },
      {
        text: 'Bekhorot',
        key: 'bekhorot',
        firstPage: [2, 'a'],
        lastPage: [61, 'a']
      },
      {
        text: 'Erkhin',
        key: 'erkhin',
        firstPage: [2, 'a'],
        lastPage: [34, 'a']
      },
      {
        text: 'Temoura',
        key: 'temoura',
        firstPage: [2, 'a'],
        lastPage: [34, 'a']
      },
      {
        text: 'Kritout',
        key: 'kritout',
        firstPage: [2, 'a'],
        lastPage: [28, 'b']
      },
      {
        text: "Mé'ila",
        key: 'me-ila',
        firstPage: [2, 'a'],
        lastPage: [37, 'b']
      },
      {
        text: 'Nidda',
        key: 'nidda',
        firstPage: [2, 'a'],
        lastPage: [73, 'a']
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
