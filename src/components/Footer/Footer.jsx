import React, { useContext } from "react";
import { useEffect, useState } from "react";
import parse from "html-react-parser";
import fetchFooter from "../../data/fetchFooter";
import { CrystallizeClient } from "../../data/CrystallizeClient/CrystallizeClient";
import { useTranslation } from "react-i18next";
import { CurrentLogoContext } from "../../context/context";
import { NavLink } from "react-router-dom";
import { Image } from "@crystallize/reactjs-components";
import { useSelector } from "react-redux";

export default function Footer() {
  const { currLogo } = useContext(CurrentLogoContext);
  const [isLoading, setIsLoading] = useState(false);
  const [footerData, setFooterData] = useState([]);
  const { t } = useTranslation();
  const selector = useSelector(state => state.cart);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const data = await fetchFooter(
          CrystallizeClient,
          "/sites/template/footer",
          t("lang"),
          "published"
        );
        return setFooterData(data?.components);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [t]);

  const footerLogo = footerData[0]?.content?.chunks[0]?.map((arr) => {
    return arr?.content?.images?.map((image) => {
      return image?.url;
    });
  });

  const logoVariants = footerData[0]?.content?.chunks[0]?.map((arr) => {
    return arr?.content?.images?.map((images) => {
      return images?.variants?.map((image) => {
        return image;
      });
    });
  });

  const imageFromCrystallize = {
    url: footerLogo?.[currLogo],
    variants: logoVariants?.[currLogo]?.[0],
  };

  return (
    <footer className="bg-plantagen-beige mt-[25px] py-[50px]">
      {footerData && (
        <div className="container mx-auto">
          <div className="flex flex-col gap-10 px-4 lg:px-0">
            <NavLink to="/" className="cursor-pointer logo">
              {footerData && (
                <Image
                  {...imageFromCrystallize}
                  sizes="(max-width: 500px) 100w, 700px"
                />
              )}
            </NavLink>

            <ul className="flex flex-col gap-14 lg:gap-0 lg:flex-row justify-between">

              {isLoading ? (
                <p>Loading Footer...</p>
              ) : (

                footerData[1]?.content?.chunks?.map((element, index) => {
                  return <NordicOfficeInformation data={element} key={index} />;
                })

              )}
            </ul>
            <p className="flex gap-11">
              <button type="button" onClick={() => {
                window.location.replace(`https://development.plantagen.fi`)
              }} >Plantagenista</button>
              <button type="button" onClick={() => {
                window.location.replace(`https://development.plantagen.fi`)
              }}>Tietoa tuotteistamme</button>
            </p>
          </div>
        </div>
      )}
    </footer>
  );
}

function NordicOfficeInformation({ data }) {
  const countryContactTitle = data?.map((item, index) => {
    return (
      <h1 className="font-bold font-plantagen" key={index}>
        {item?.content?.text}
      </h1>
    );
  });

  const countryContactInfo = data?.flatMap((item, itemIndex) => {
    return item?.content?.html?.flatMap((text, textIndex) => {
      const elements = parse(text);
      return Array.isArray(elements)
        ? elements.map((child, index) => {
          return React.cloneElement(child, {
            key: `parsed-${itemIndex}-${textIndex}-${index}`,
          });
        })
        : React.cloneElement(elements, {
          key: `parsed-${itemIndex}-${textIndex}`,
        });
    });
  });

  return (
    <li className="flex flex-col gap-1">
      {countryContactTitle}
      <div className="flex flex-col">{countryContactInfo}</div>
    </li>
  );
}
