import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";

export default function Search({ query, setQuery }) {
  const { t } = useTranslation();
  return (
    <div className="flex items-center w-full">
      <FontAwesomeIcon
        className="absolute ps-3 text-gray-500"
        icon={faMagnifyingGlass}
      />
      <input
        className="ps-9 w-full h-10 rounded shadow border outline-secondary-eucalyptus"
        type="text"
        placeholder={t("searchPlaceholder")}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
}
