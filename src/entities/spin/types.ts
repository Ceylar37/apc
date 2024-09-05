export interface Spin {
  id: string;
  result: string;
  date: string;
  selections: {
    id: string;
    user: {
      name: string;
    };
    books: string[];
  }[];
}
