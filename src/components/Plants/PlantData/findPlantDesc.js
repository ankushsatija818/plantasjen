export default function findPlantDesc(plantData) {
  return plantData?.node?.components?.map((desc) => {
    return desc;
  });
}
