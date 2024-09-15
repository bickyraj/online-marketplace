import {useEffect, useState} from "react";
import {useKeycloak} from "@react-keycloak/web";
import UserOrder from "./UserOrder.ts";
import {
    CurrencyDollarIcon,
} from '@heroicons/react/20/solid'

const ProductList:React.FC = () => {
    const { keycloak } = useKeycloak();
    const [userOrders, setUserOrders] = useState<UserOrder[]>([]);
    useEffect(() => {
        fetchProducts();
    }, []);

    const getTotalAmountOfAllOrders = (): number => {
        let sum: number = 0
        if (!userOrders.length) {
            return sum;
        }
        userOrders.forEach((userOrder) => {
            userOrder.orderItems?.forEach((item) => {
                sum += item.product.price;
            })
        })
        return sum;
    }

    const fetchProducts = async () => {
        const url = "http://localhost:8080/api/orders/user-order";
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${keycloak.token}`,  // Bearer token
            }
        }).then(response => response.json());
        setUserOrders(response);
    }
    return (
        <>
            <div className="min-w-0 flex-1">
                <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
                    {/*<div className="mt-2 flex items-center text-sm text-gray-500">*/}
                    {/*    <BriefcaseIcon aria-hidden="true" className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"/>*/}
                    {/*    Full-time*/}
                    {/*</div>*/}
                    {/*<div className="mt-2 flex items-center text-sm text-gray-500">*/}
                    {/*    <MapPinIcon aria-hidden="true" className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"/>*/}
                    {/*    Remote*/}
                    {/*</div>*/}
                    <div className="mt-2 flex items-center text-sm text-gray-500">
                        <CurrencyDollarIcon aria-hidden="true" className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"/>
                        Total: ${getTotalAmountOfAllOrders()}
                    </div>
                    {/*<div className="mt-2 flex items-center text-sm text-gray-500">*/}
                    {/*    <CalendarIcon aria-hidden="true" className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"/>*/}
                    {/*    Closing on January 9, 2020*/}
                    {/*</div>*/}
                </div>
            </div>
            <div className="bg-white">
                <div className="mx-auto max-w-2xl px-4 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                        {userOrders.map((userOrder) => (
                            userOrder.orderItems?.map((orderItem) => (
                                <div key={orderItem.id} className="group relative">
                                    <div
                                        className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                                        {/*<img*/}
                                        {/*    alt={product.imageAlt}*/}
                                        {/*    src={product.imageSrc}*/}
                                        {/*    className="h-full w-full object-cover object-center lg:h-full lg:w-full"*/}
                                        {/*/>*/}
                                    </div>
                                    <div className="mt-4 flex justify-between">
                                        <div>
                                            <h3 className="text-sm text-gray-700">
                                                <a href={orderItem.product.name}>
                                                    <span aria-hidden="true" className="absolute inset-0"/>
                                                    {orderItem.product.name}
                                                </a>
                                            </h3>
                                            {/*<p className="mt-1 text-sm text-gray-500">{product.color}</p>*/}
                                        </div>
                                        <p className="text-sm font-medium text-gray-900">{orderItem.product.price}</p>
                                    </div>
                                </div>
                            ))
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProductList;