import { GoHeart } from "react-icons/go";
import { TiShoppingCart } from "react-icons/ti";
import { useSelector } from "react-redux";

export const AddToCart = ({setAddtoCartSection}) => {
    const selector = useSelector(state => state.cart);
    return (
        <div className="flex pl-5 gap-2">
            <div className="relative"><GoHeart size={26} />
                {/* <span className="absolute w-[20px] h-[20px] bg-[#465850] text-white flex items-center justify-center text-xs  rounded-full -right-2 -top-1">1</span> */}
            </div>
            <div className="relative">
                <span onClick={()=>setAddtoCartSection(prv=>({...prv,toggle:true}))} className="cursor-pointer"><TiShoppingCart size={26}  /></span>
                {selector.quantity > 0 && <span className="absolute w-[20px] h-[20px] bg-[#d82316] text-white flex items-center justify-center text-xs  rounded-full -right-3 -top-1">{selector.quantity}</span>}
            </div>

        </div>
    )
}