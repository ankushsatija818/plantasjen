export function findPlantImage(plantData) {
  return plantData?.components?.map((imagesArr) => {
    return imagesArr?.content?.images?.map((imageUrl) => {
      return imageUrl?.url;
    });
  });
}

export function findPlantImageVariants(plantData) {
  return plantData?.components?.map((imagesArr) => {
    return imagesArr?.content?.images?.map((images) => {
      return images?.variants?.map((image) => {
        return image;
      });
    });
  });
}
