import { useTranslation } from "react-i18next";

export default function CategoryFilter({ folder, setCategory, setQuery }) {
  const { t } = useTranslation();
  const listOfCategories = folder?.map((plant, index) => {
    return (
      <option value={plant?.node?.path} key={index}>
        {plant?.node?.name}
      </option>
    );
  });

  return (
    <div className="w-full h-10">
      <select
        onChange={(e) => {
          e.preventDefault();
          setCategory(e.target.value);
          setQuery("");
        }}
        className="ps-2 w-full h-full rounded shadow border outline-secondary-eucalyptus cursor-pointer"
      >
        <option value={t("plantGuidePath")}>{t("categoryLang")}</option>
        {listOfCategories}
      </select>
    </div>
  );
}
