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
query ($language: String!, $path: String!, $version: VersionLabel) {
  catalogue(path: $path, language: $language, version: $version) {
    ... on Document {
      components {
        id
        content {
          ... on ContentChunkContent {
            chunks {
              content {
                ... on ImageContent {
                  __typename
                  images {
                    url
                    altText
                    variants {
                      url
                      width
                    }
                  }
                }
                ... on RichTextContent {
                  html
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
`,
      {
        path,
        language,
        version,
      }
    )
  ).catalogue;
};
