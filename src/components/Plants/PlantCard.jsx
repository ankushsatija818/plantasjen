import { Link } from "react-router-dom";

export default function PlantCard({ plantData }) {
  const imageUrl = plantData?.node?.components?.flatMap((image) =>
    image?.content?.images?.map((url) => url)
  );
  const plantDescription = plantData?.node?.components?.map((desc) => {
    if (desc?.type === "richText" && desc?.name === "Description") {
      return desc?.content?.plainText;
    }
  });

  return (
    <li className="border shadow rounded lg:hover:shadow-md">
      <Link
        to={`${plantData?.node?.path}?productId=${plantData?.node.productId}`}
        className="w-full flex flex-col"
        type="button"
      >
        <div>
          <img
            className="aspect-square object-cover rounded-t w-full"
            src={imageUrl?.[1]?.url}
            alt=""
          />
        </div>
        <div className="flex flex-col px-2 py-3 lg:p-7 gap-2 md:gap-2 lg:gap-3">
          <h1 className="text-sm font-bold md:text-lg lg:text-2xl line-clamp-1">
            {plantData?.node?.name
              ? plantData.node.name.charAt(0).toUpperCase() +
                plantData.node.name.slice(1)
              : ""}
          </h1>
          <p className="line-clamp-4 lg:line-clamp-5 text-sm lg:leading-6">
            {plantDescription[2]?.[0]
              ? plantDescription?.[2]?.[0]
              : "Description Goes Here. 👍"}
          </p>
        </div>
      </Link>
    </li>
  );
}
