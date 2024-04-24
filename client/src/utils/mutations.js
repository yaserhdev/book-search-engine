import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const SAVE_BOOK = gql`
mutation saveBook($bookData: BookInput!) {
  saveBook(bookData: $bookData) {
    _id
    username
    bookCount
    savedBooks {
      authors 
      description 
      bookId
      image
      link
      title 
    }
  }
}
`;

// export const SAVE_BOOK = gql`
// mutation saveBook(
//     input: {
//         authors: [String], 
//         description: String, 
//         bookId: ID!, 
//         image: String,
//         link: String, 
//         title: String! 
//     }
// ) {
//     saveBook(
//         authors: $authors, 
//         description: $description, 
//         bookId: $bookId, 
//         image: $image, 
//         link: $link, 
//         title: $title 
//     ) {
//         authors 
//         description 
//         bookId 
//         image 
//         link 
//         title 
//     }
// }`;