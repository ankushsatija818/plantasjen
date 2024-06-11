import { Route, Routes, useLocation } from "react-router-dom";
import Layout from "./components/Layout/layout";
import Home from "./pages/Home/Home";
import PlantPage from "./components/Plants/PlantPage";
import { useEffect, useState } from "react";
import {
  LanguageContext,
  DataContext,
  DropDownMenuContext,
  CurrentLogoContext,
} from "./context/context";
import { useLocalStorageState } from "./components/Misc/useLocalStorageState";
import { I18nextProvider, useTranslation } from "react-i18next";
import i18n from "./components/Misc/localization/translator";
import { Provider } from "react-redux";
import store from "./redux/store";
export default function App() {
  const [currLang, setCurrLang] = useLocalStorageState("EN", "currLang");
  const [isDisabled, setIsDisabled] = useState(false);
  const [currLogo, setCurrLogo] = useState(1);
  const [data, setData] = useState([]);
  const { t } = useTranslation();
  const location = useLocation();
  useEffect(() => {
    if (location) {
      document.title = t("tabTitle");
    }
  }, [location, t]);
  return (
    <Provider store={store}>
    <I18nextProvider i18n={i18n}>
      <DropDownMenuContext.Provider value={{ isDisabled, setIsDisabled }}>
        <LanguageContext.Provider value={{ currLang, setCurrLang }}>
          <DataContext.Provider value={{ data, setData }}>
            <CurrentLogoContext.Provider value={{ currLogo, setCurrLogo }}>
              <Routes>
                <Route element={<Layout />}>
                  <Route index path="/" element={<Home />} />
                  <Route path=":folder/:folder/:id" element={<PlantPage />} />
                </Route>
              </Routes>
            </CurrentLogoContext.Provider>
          </DataContext.Provider>
        </LanguageContext.Provider>
      </DropDownMenuContext.Provider>
    </I18nextProvider>
    </Provider>
  );
}
