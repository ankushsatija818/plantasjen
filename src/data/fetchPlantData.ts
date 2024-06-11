import { ClientInterface } from "@crystallize/js-api-client";
import { useTranslation } from "react-i18next";

export default async (
  apiClient: ClientInterface,
  path: string,
  version: string,
  language: string,
  category: string,
  localPath: string
) => {
  return category === localPath ? (
        await apiClient.catalogueApi(
          `#graphql
        query ($language: String!, $path: String!, $version: VersionLabel) {
          catalogue(path: $path, version: $version, language: $language) {
            subtree {
              edges {
                node {
                  name
                  type
                  subtree {
                    edges {
                      node {
                        path
                        name
                        id
                        type
                        components {
                          name
                          type
                          content {
                            ... on RichTextContent {
                              plainText
                            }
                            ... on ImageContent {
                              images {
                                url
                                altText
                              }
                            }
                            ... on SingleLineContent {
                              text
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }`,
          {
            path,
            version,
            language,
          }
        )
      ).catalogue : (
        await apiClient.catalogueApi(
          `#graphql
        query ($language: String!, $path: String!, $version: VersionLabel) {
          catalogue(path: $path, version: $version, language: $language) {
                subtree {
                  edges {
                    node {
                      path
                      name
                      id
                      type
                      components {
                        name
                        type
                        content {
                        ... on RichTextContent {
                          plainText
                        }
                        ... on ImageContent {
                          images {
                            url
                            altText
                          }
                        }
                        ... on SingleLineContent {
                          text
                        }
                      }
                      }
                    }
                  }
                }
              }
    }`,
          {
            path,
            version,
            language
          }
        )
      ).catalogue;
    };





// import { ClientInterface } from "@crystallize/js-api-client";

// export default async (
//   apiClient: ClientInterface,
//   path: string,
//   version: string,
//   language: string
  
 
// ) => {
//   return (
//         await apiClient.catalogueApi(
//           `#graphql
//         query ($language: String!, $path: String!, $version: VersionLabel) {
//           catalogue(path: $path, version: $version, language: $language) {
//                 subtree {
//                   edges {
//                     node {
//                       path
//                       name
//                       id
//                       type
//                       components {
//                         name
//                         type
//                         content {
//                         ... on RichTextContent {
//                           plainText
//                         }
//                         ... on ImageContent {
//                           images {
//                             url
//                             altText
//                           }
//                         }
//                         ... on SingleLineContent {
//                           text
//                         }
//                       }
//                       }
//                     }
//                   }
//                 }
//               }
//     }`,
//           {
//             path,
//             version,
//             language
//           }
//         )
//       ).catalogue;
//     };



