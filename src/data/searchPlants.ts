// import { ClientInterface } from "@crystallize/js-api-client";

// export default async (
//     apiClient: ClientInterface,
//     path: string,
//     language: string,
//     searchTerm: string = "",
//   ) => {
//     return await apiClient.searchApi(
//       `#graphql
//       query ($searchTerm: String!, $language: String!, $path: String!) {
//   search(
    
//     language: $language
//     filter: {searchTerm: $searchTerm, include: { paths: [$path] }}) {
//     edges {
//       node {
//         name
//         path
//         type
//       }
//     }
//   }
// }`,
//   {
//     path,
//     language,
//     searchTerm
//   }
// )}