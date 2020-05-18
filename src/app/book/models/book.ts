export interface Book {
  id: string;
  volumeInfo: {
    title: string;
    subtitle: string;
    authors: string[];
    publisher: string;
    publishDate: string;
    description: string;
    averageRating: number;
    ratingsCount: number;
    imageLinks: {
      thumbnail: string;
      smallThumbnail: string;
    };
  };
}

export const mockBook: Book = {
  id: '1',
  volumeInfo: {
    title: 'title',
    subtitle: 'subtitle',
    authors: ['author'],
    publisher: 'publisher',
    publishDate: '',
    description: 'description',
    averageRating: 3,
    ratingsCount: 5,
    imageLinks: {
      thumbnail: 'string',
      smallThumbnail:
        'http://books.google.com/books/content?id=-fZkzQEACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api',
    },
  },
};
