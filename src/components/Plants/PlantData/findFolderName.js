export default function findFolderName(folderData) {
  const folderArr = folderData?.components?.map((itemA) => {
    return itemA?.content?.components?.map((itemB) => {
      return itemB?.content?.text;
    });
  });
  const removeFolderNull = folderArr?.filter((item) => item != null);
  return removeFolderNull[0]?.filter((item) => item != null);
}
