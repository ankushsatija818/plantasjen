import { IoMdAdd } from "react-icons/io";
import { RiSubtractFill } from "react-icons/ri";
import { FaRegHeart } from "react-icons/fa6";
import { updateCartItem } from "../../redux/action";
import { useDispatch, useSelector } from "react-redux";
import { instance2 } from "../../axios";
import { useCallback, useState } from "react";
import { getCookie } from "typescript-cookie";
import axios from "axios";


export const AddProductCount = ({ setCount, count, productId }) => {
    const dispatch = useDispatch();
    const selector = useSelector(state => state.cart);
    // const [productCount,setProductCount] = useState(1);
    const [loadUrl, setLoadUrl] = useState(false);


    const createBusket = useCallback(async (productCoun) => {
        const bucketId = getCookie('bucs');
        setLoadUrl(true);
        try {
            const response = await instance2.post(`checkout/shopper-baskets/v2/organizations/f_ecom_bcmr_dev/baskets/${bucketId}/items?siteId=PlantagenFI`, [{
                "productId": productId,
                "quantity": count
            }]);
            const { productItems } = response.data;


            const sumWithInitial = productItems.reduce(
                (accumulator, currentValue) => accumulator + currentValue.quantity,
                0,
            );
            const totalPrice = productItems.reduce(
                (accumulator, currentValue) => accumulator + currentValue.price,
                0,
            )
            dispatch(
                updateCartItem({
                    items: productItems,
                    quantity: sumWithInitial,
                    total: totalPrice
                }));

                setLoadUrl(false);
        } catch (err) {

            console.error(err, "ssss");
            // ErrorHandle(err)
        }
    }, [loadUrl]);

    return (
        <>
            <iframe style={{ 'display': 'none' }}  src={loadUrl ? `https://development.plantagen.fi/basket/?pid=${productId}` : null}></iframe>
            <div className="flex items-center gap-4 py-6">
                <div className="flex  items-center gap-4">
                    <button type="button" disabled={count === 1 ? true : false} className={`rounded-full  ${count > 1 ? 'bg-[#484543]  hover:bg-[#d82316]' : 'bg-[#d1d0d0]'} transition-all duration-700 w-9 h-9 flex justify-center items-center`} onClick={() => setCount(prv => prv - 1)}><RiSubtractFill color="#fff" />
                    </button>
                    <input type="number" value={count} onChange={() => { }} className={`border rounded w-20 h-16 outline-none border-[#828282] font-['PlantagenBold'] text-2xl text-center appearance-none`} aria-describedby="quantity" aria-label="quantity" />
                    <button type="button" className="rounded-full bg-[#494543] w-9 h-9 flex justify-center items-center transition-all duration-700 hover:bg-[#d82316]" onClick={() =>
                        setCount(prv => prv + 1)
                    }><IoMdAdd color="#fff" /></button>

                </div>
                <button type="button" className="rounded-full bg-[#484543] w-2/4 h-16 flex hover:bg-[#d82316] font-['PlantagenBold'] transition-all duration-700 justify-center items-center text-white text-2xl font-bold" onClick={() => createBusket(count)}>
                    Legg i handlekurv</button>
                <FaRegHeart size={30} className="hover:text-[#d82316] transition-all duration-700 text-[#cf9973] cursor-pointer" />

            </div>
        </>
    )
}