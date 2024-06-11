export default function findPlantName(plantData) {
  const plantArr = plantData?.edges?.map((itemA) => {
    return itemA?.node?.subtree?.edges?.map((itemB) => {
      return itemB?.node?.name?.toLowerCase().split(" ").join("");
    });
  });

  const removePlantNull = plantArr?.filter((item) => item != null);
  return removePlantNull?.filter((item) => item != null);
}
