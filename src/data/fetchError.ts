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
  		name
        content {
          ... on SingleLineContent {
            text
          }
          ... on ImageContent {
            images {
              url
            }
          }
          ... on RichTextContent {
            json
          }
          ... on ParagraphCollectionContent {
            paragraphs {
              title {
                text
              }
              body {
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
