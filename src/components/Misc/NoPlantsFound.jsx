import { useTranslation } from "react-i18next";

export default function NoPlantsFound({ query }) {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col justify-center items-center gap-3 mt-[25px]">
      <h1 className="font-bold text-base lg:text-3xl">{`${t("plantNotFound.partOne")} "${query}"`}</h1>
      <h2 className="text-base lg:text-xl">{t("plantNotFound.partTwo")}</h2>
    </div>
  );
}
