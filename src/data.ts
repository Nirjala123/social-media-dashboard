export interface Data {
  id: string;
  content: string;
  title: string;
  dateOfCreation: string;
}

export const data: Data[] = [
  {
    id: '1',
    content: "John's Pic",
    title: 'Ghandruk',
    dateOfCreation: '02/19/1895',
  },

  {
    id: '2',
    content: "Jane's Pic",
    title: 'New York',
    dateOfCreation: '02/19/1996',
  },

  {
    id: '3',
    content: "Nirjala's Pic",
    title: 'Hawaii',
    dateOfCreation: '02/19/1996',
  },

  {
    id: '4',
    content: "Nihal's Pic",
    title: 'California',
    dateOfCreation: '02/19/2006',
  },
];
