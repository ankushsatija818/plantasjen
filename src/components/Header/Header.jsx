import { NavLink, useSearchParams } from "react-router-dom";
import { useCallback, useContext, useEffect, useState } from "react";
import NO from "../../assets/flagIcons/no.svg";
import SE from "../../assets/flagIcons/se.svg";
import FI from "../../assets/flagIcons/fi.svg";
import EN from "../../assets/flagIcons/gb.svg";
import fetchFooter from "../../data/fetchFooter";
import { CrystallizeClient } from "../../data/CrystallizeClient/CrystallizeClient";
import { Image } from "@crystallize/reactjs-components";
import { RxCross2 } from "react-icons/rx";
import { LiaTruckSolid } from "react-icons/lia";
import {
  CurrentLogoContext,
  DropDownMenuContext,
  LanguageContext,
} from "../../context/context";
import { useTranslation } from "react-i18next";
import { AddToCart } from "./AddToCart";
import { useDispatch, useSelector } from "react-redux";
import { RiDeleteBin6Line } from "react-icons/ri";
import instance, { instance2 } from "../../axios";
import { getCookie, removeCookie, setCookie } from "typescript-cookie";
import { updateCartItem } from "../../redux/action";
import { IoAdd } from "react-icons/io5";
import { RiSubtractLine } from "react-icons/ri";
import { Dialog } from 'primereact/dialog';

export default function Header() {
  const [top, setTop] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const productId = searchParams.get("productId")
  const [loadUrl, setLoadUrl] = useState(false);
  const [isSubtract, setIsSubtract] = useState(false);

// console.log(productId)
  const [addtocartProps, setAddtoCartSection] = useState({
    toggle: false
  });
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState('center');
  const [itemId, setItemId] = useState("");
  const selector = useSelector(state => state.cart);

  const bucketId = getCookie('bucs');
  const getTokenCookie = getCookie('tk');
  const dispatch = useDispatch();
  const load = useCallback(async () => {
    const response = await instance.post(`shopper/auth/v1/organizations/f_ecom_bcmr_dev/oauth2/token`, {
      'grant_type': 'client_credentials'
    });
    const { data } = response;
    if (!getCookie('bucs')) {
      createBusket(data.access_token);
    }
    setCookie("tk", data.access_token);
  }, []);

  const loadBucket = useCallback(async () => {
    try {
      const response = await instance2.get(`checkout/shopper-baskets/v2/organizations/f_ecom_bcmr_dev/baskets/${getCookie('bucs')}?siteId=PlantagenFI`);
      const { productItems } = response.data;
      const sumWithInitial = !!productItems ? productItems.reduce(
        (accumulator, currentValue) => accumulator + currentValue.quantity,
        0,
      ) : 0;
      const totalPrice = !!productItems ? productItems.reduce(
        (accumulator, currentValue) => accumulator + currentValue.price,
        0,
      ) : 0;
      // Update value on redux store //
      dispatch(
        updateCartItem({
          items: !productItems ? [] : productItems,
          quantity: sumWithInitial,
          total: totalPrice

        }));
    } catch (err) {
      if (typeof err !== 'string') {
        if (err.response.status === 401) {
          removeCookie('tk');
          removeCookie('bucs');
          load();
        }
      }
    }
  }, []);

  const createBusket = async (auth) => {
    const response = await fetch(`${process.env.VITE_API_BASE_URL}/checkout/shopper-baskets/v2/organizations/f_ecom_bcmr_dev/baskets?siteId=PlantagenFI`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${auth}`
      },
      body: JSON.stringify({
        "customerInfo": {
          "email": ""
        }
      }),
    });

    const data = await response.json();
    setCookie("bucs", data.basketId);
  }

  // Delete Item from Cart item bucket //

  const deleteItemFromCart = async (item) => {
    setPosition('top');
    setVisible(true);
    setItemId(item.itemId);
  }

  const yesConfirmDelete = async () => {
    try {
      const response = await instance2.delete(`checkout/shopper-baskets/v2/organizations/f_ecom_bcmr_dev/baskets/${getCookie('bucs')}/items/${itemId}?siteId=PlantagenFI`);
      if (response.status === 200) {
        setVisible(false)
        loadBucket();
      }
    }
    catch (err) {
      console.error(err);
    }
  }

  // Update item cart button //
  const updateCartItemCartPanel = async (item, quantity) => {
    setLoadUrl(true);
    try {
      const response = await instance2.patch(`checkout/shopper-baskets/v2/organizations/f_ecom_bcmr_dev/baskets/${bucketId}/items/${item.itemId}?siteId=PlantagenFI`, {
        "quantity": quantity
      });
      const { productItems } = response.data;
      const sumWithInitial = productItems.reduce(
        (accumulator, currentValue) => accumulator + currentValue.quantity,
        0,
      );
      const totalPrice = productItems.reduce(
        (accumulator, currentValue) => accumulator + currentValue.price,
        0,
      );
      // Update value on redux store//
      dispatch(
        updateCartItem({
          items: productItems,
          quantity: sumWithInitial,
          total: totalPrice

        }));
        setLoadUrl(false);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {

    const scrollHandler = () => {
      window.scrollY > 10 ? setTop(true) : setTop(false);
    };
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, [top]);

  useEffect(() => {
    if (!getTokenCookie) {
      removeCookie('tk');
      removeCookie('bucs');
      load();
    }else{
      loadBucket();
    }
    //condition for bucket API call once if bucket id not defined //
    // if (!!bucketId) {
    //   loadBucket();
    // }
  }, [])

  return (
    <>
      <header
        className={`sticky top-0 z-50 bg-white ${top && `bg-white shadow`}`}
      >
        <nav className="container mx-auto my-[15px] px-2">
          <div className="flex justify-between items-center">
            <Logo />

            <DropDown />
            <AddToCart setAddtoCartSection={setAddtoCartSection} />
          </div>
        </nav>
      </header>
      {addtocartProps.toggle && <div className="fixed w-[609px] bg-white h-full right-0 z-50">
        <span className="absolute -right-3 top-0 m-7 cursor-pointer" onClick={() =>
          setAddtoCartSection(prv => ({ ...prv, toggle: false }))
        }
        >
          <RxCross2 size={27} />

        </span>
        <div className="py-5 px-5">
          <h2 className="font-['PlantagenBold'] text-4xl ">Handlekurv</h2>
          {selector.items.length === 0 ? <p className="py-10 text-lg">Du har ingen varer i handlekurven din.</p> : <>
            <div className="mt-5 bg-[#f5efea] p-3">
              <div className="text-sm font-['PlantagenBold']"><a href="https://www.plantasjen.no/tilbud/"><span style={{ "color": "#d82316" }}>Tilbud og kampanjer</span></a></div>
              <p><span style={{ "fontSize": "12px" }}><a href="https://www.plantasjen.no/tilbud/">Ukens beste deals finner du her</a></span></p>
            </div>
            <div className="border-t border-zinc-400 mt-5 p-1">
              <div className="flex items-center gap-3 font-['PlantagenBold'] text-[#5b5b5b] text-sm pt-1">
                <span className="p-1 bg-green-900 rounded-full "><LiaTruckSolid color="#fff" size={26} /></span>
                Hjemlevering
              </div>

            </div>
          </>}

        </div>
        
        {selector.items.length !== 0 &&
          <div>
            <table className="w-full table-fixed" cellPadding="0" cellSpacing="0">
              <thead>
                <tr>
                  <th width="30">&nbsp;</th>
                  <th width="50">&nbsp;</th>
                  <th>&nbsp;</th>
                  <th className="text-left text-[#828282]">Antall</th>
                  <th className="text-left text-[#828282]">Pris/stk</th>
                  <th className="text-left text-[#828282]">Totalt</th>
                </tr>
              </thead>
              <tbody>
                {selector.items.map((item, index) => <tr key={index}>
                  <td className="p-3 border-b">
                    <span className="cursor-pointer" onClick={() => {
                      deleteItemFromCart(item);
                      // show('top')
                    }}><RiDeleteBin6Line />
                    </span>
                  </td>
                  <td className="p-3 border-b">
                    <img width={50} src={item.image} />
                  </td>
                  <td className="p-3 border-b text-sm">{item.productName}</td>
                  <td className="p-3 border-b text-sm">
                    <div className="flex gap-1 items-center">
                      <button type="button" className="bg-[#80a59c] hover:bg-[#d82316] transition-all rounded-full w-5 h-5 flex items-center justify-center"
                        onClick={(event) => {
                          event.stopPropagation();
                          updateCartItemCartPanel(item, item.quantity - 1);
                          dispatch(updateCartItem({
                            items: selector.items,
                            quantity: item.quantity - 1
                          }));
                          
                          setIsSubtract(true);
                        }}>
                        <RiSubtractLine color="white" />
                      </button>
                      <input type="text" value={item.quantity} onChange={(event) => {
                        updateCartItemCartPanel(item, parseInt(event.target.value));
                        dispatch(updateCartItem({
                          items: selector.items,
                          quantity: parseInt(event.target.value)
                        }))
                        
                      }} className="w-12 border border-neutral-300 rounded h-7 text-center outline-0" />
                      <button type="button" className="bg-[#80a59c] rounded-full w-5 h-5 flex items-center hover:bg-[#d82316] transition-all justify-center"
                        onClick={(event) => {
                          event.stopPropagation();

                          updateCartItemCartPanel(item, item.quantity + 1);
                          dispatch(updateCartItem({
                            items: selector.items,
                            quantity: item.quantity + 1
                          }))
                          setIsSubtract(false);
                        }}>

                        <IoAdd color="white" />
                      </button>
                    </div>
                  </td>
                  <td className="p-3 border-b text-sm ">{item.price}</td>
                  <td className="p-3 border-b text-sm">{item.priceAfterOrderDiscount}</td>

                </tr>)}

              </tbody>
            </table>
            <iframe style={{ 'display': 'none' }}  src={loadUrl ? `https://development.plantagen.fi/basket/?pid=${productId}${isSubtract?'&quantity=1':''}` : null}></iframe>
            <Dialog header="Fjern fra handlekurv?"
              pt={{
                root: {
                  className: 'border  bg-white mt-5 '
                },
                headerIcons: {
                  className: 'absolute m-5 right-0'
                },
                content: {
                  className: 'p-5'
                },
                headerTitle: {
                  className: 'text-2xl py-3 border-b px-4'
                }
              }}

              visible={visible} position={position} style={{ width: '25vw' }} footer={<>
                <div className="flex gap-3 py-3 justify-end px-3 border-t">
                  <button type="button" className="border-2 border-[#485851] rounded-full py-1 px-3" onClick={() => { if (!visible) return; setVisible(false) }}>Avbryt</button>
                  <button type="button" className="border-2 border-[#485851] bg-[#485851] text-white rounded-3xl py-1 px-3" onClick={yesConfirmDelete}>
                    Ja
                  </button>
                </div>
              </>} onHide={() => { if (!visible) return; setVisible(false); }} draggable={false} resizable={false}>
              <p className="m-0">
                Er du sikker på at du vil fjerne varen fra handlekurven?
                Agnbøk 20-pk.
              </p>
            </Dialog>
          </div>
        }
        <div className="absolute left-0 w-full bottom-0 bg-[#f4efe9] py-5 px-5 flex gap-5 flex-col">

          <table className="w-full" cellPadding="0" cellSpacing="0">
            <tbody><tr>
              <td className="text-left total-estimated">
                <span className="text-[#5b5b5b]">Å betale</span>
              </td>
              <td className="text-right total-estimated">
                <span className="text-2xl font-['PlantagenBold']">{selector.total ? `${String(selector.total.toFixed(2)).replace('.', ',')} €` : ""} </span>
              </td>
            </tr>
            </tbody></table>
          <button disabled={selector.items.length > 0 ? false : true} className={`rounded-full ${selector.items.length > 0 ? 'bg-[#484543]' : 'bg-[#ddd9d3]'} h-16 flex w-full font-['PlantagenBold'] transition-all duration-700 justify-center items-center text-white text-[1.375rem] font-bold`} role="button" onClick={() => {
            // const ids = selector.items.item.map((item) => item.id).join('-');

            window.location.replace(`https://development.plantagen.fi`)
          }}>
            Til kassen
          </button>
          <div className="text-center flex justify-center">
            <img width={84} src="https://www.plantasjen.no/on/demandware.static/Sites-PlantagenNO-Site/-/default/dw4b2f06cf/images/icons/klarna.png" alt="Klarna" />
          </div>
        </div>
      </div>}
    </>
  );
}

function Logo() {
  const { currLogo } = useContext(CurrentLogoContext);
  const [footerData, setFooterData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchFooter(
          CrystallizeClient,
          "/sites/template/footer",
          "en",
          "published"
        );
        return setFooterData(data?.components);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);
  const logo = footerData[0]?.content?.chunks[0]?.map((arr) => {
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
    url: logo?.[currLogo],
    variants: logoVariants?.[currLogo]?.[0],
  };

  return (
    <NavLink to="/" className="cursor-pointer logo">
      {footerData && (
        <Image
          {...imageFromCrystallize}
          sizes="(max-width: 500px) 100w, 700px"
        />
      )}
    </NavLink>
  );
}

function DropDown() {
  const { setCurrLogo } = useContext(CurrentLogoContext);
  const [open, setIsOpen] = useState(false);
  const { currLang, setCurrLang } = useContext(LanguageContext);
  const { isDisabled } = useContext(DropDownMenuContext);
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setCurrLang(lng);
  };

  const languages = {
    en: EN,
    no: NO,
    sv: SE,
    fi: FI,
  };

  return (
    <div className="flex flex-1 items-end justify-end flex-col w-[100px] gap-5 border border-white relative">
      <button
        className={`flex gap-3 items-center justify-center rounded py-2 px-3 hover:border-gray-50 hover:shadow ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
        disabled={isDisabled}
        onClick={() => setIsOpen(!open)}
      >
        <img
          className="h-[35px] rounded-full shadow"
          src={languages[currLang] ? languages[currLang] : languages?.en}
          alt="Current Language"
        />
        <span>{currLang.toUpperCase()}</span>
      </button>
      {open && (
        <div className="flex flex-col gap-5 p-1 rounded bg-white absolute top-14 lg:w-[100px] shadow-md border">
          {Object.entries(languages).map(([key, icon]) => (
            <button
              className="flex gap-3 items-center justify-center rounded py-2 px-3 hover:border-gray-50 hover:shadow"
              key={key}
              onClick={() => {
                changeLanguage(key);
                setCurrLogo(key === "no" ? 0 : 1);
                setIsOpen(false);
              }}
            >
              <img
                className="h-[35px] rounded-full shadow"
                src={icon}
                alt={`${key} flag`}
              />
              {key.toUpperCase()}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}




