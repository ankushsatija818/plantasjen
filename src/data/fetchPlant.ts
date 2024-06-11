import { ClientInterface } from "@crystallize/js-api-client";

export default async (
  apiClient: ClientInterface,
  path: string,
  language: string,
  version: string
) => {
  return (
    await apiClient.catalogueApi(
      `#graphql
  query FetchPlant($path: String, $language: String, $version: VersionLabel) {
    catalogue(path: $path, language: $language, version: $version) {
      name
      type
      components {
        name
        content {
          ... on RichTextContent {
            json
          }
          ... on SingleLineContent {
            text
          }
          ... on ImageContent {
            images {
              url
              altText
              variants {
                url
                width
              }
            }
          }
          ... on ContentChunkContent {
            chunks {
              id
              name
              content {
                ... on RichTextContent {
                  json
                }
              }
            }
          }
        }
      }
    }
  }
`,
      {
        path,
        language,
        version,
      }
    )
  ).catalogue;
};
