// import { ClientInterface } from "@crystallize/js-api-client";
// import fetchPlants from "./fetchPlants";

// export type CrystallizeAPIContext = {
//   apiClient: ClientInterface;
//   locale?: string;
//   isPreview?: boolean;
//   language: string;
// };

// export const CrystallizeAPI = ({
//   apiClient,
//   language,
//   locale = language,
//   isPreview = false,
// }: CrystallizeAPIContext) => {
//   const version = isPreview ? "draft" : "published";
//   //   const mapper = DataMapper({ language, locale });

//   return {
//     fetchPlants: (path: string) =>
//       fetchPlants(apiClient, path, version, language).then(console.log()),
//   };
// };
