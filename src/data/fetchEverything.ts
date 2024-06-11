import { ClientInterface } from "@crystallize/js-api-client";

export default async (
  apiClient: ClientInterface,
  path: string,
  version: string,
  language: string,
) => {
  return (
        await apiClient.catalogueApi(
          `#graphql
        query ($language: String!, $path: String!, $version: VersionLabel) {
          catalogue(path: $path, language: $language, version: $version) {
            ... on Folder {
          subtree {
            edges {
              cursor
              node {
                path
                type
                name
                components {
                  name
                  content {
                    ... on PieceContent {
                      components {
                        content {
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
      }
    }`,
          {
            path,
            version,
            language
          },
        )
      ).catalogue;
    };



