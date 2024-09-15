import {useEffect, useState} from "react";
import {useKeycloak} from "@react-keycloak/web";
import ProductEntity from "../entity/ProductEntity.tsx";
import {ShoppingCartIcon} from "@heroicons/react/16/solid";
import CartStore from "../../store/CartStore.ts";

const ProductList:React.FC = () => {
    const { keycloak } = useKeycloak();
    const cartStore = CartStore;
    const [products, setProduct] = useState<ProductEntity[]>([]);
    useEffect(() => {
        fetchProducts();
    }, []);
    const fetchProducts = async () => {
        const url = "http://localhost:8080/api/products?size=10";
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${keycloak.token}`,  // Bearer token
            }
        }).then(response => response.json());
        setProduct(response);
    }
    return (
        <>
            <div className="bg-white">
                <div className="mx-auto max-w-2xl px-4 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                        {products.map((product) => (
                            <div key={product.id} className="group relative">
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
                                            {/*<a href={product.name}>*/}
                                            {/*    <span aria-hidden="false" className="absolute inset-0"/>*/}
                                            {/*    {product.name}*/}
                                            {/*</a>*/}
                                        </h3>
                                        <p className="mt-1 text-sm text-gray-500">{product.description}</p>
                                    </div>
                                    <p className="text-sm font-medium text-gray-900">{product.price}</p>
                                </div>
                                <button
                                    onClick={(): void => {
                                        cartStore.addItem(product);
                                    }}
                                    className="flex items-center justify-around rounded-md bg-indigo-700 mt-1 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                                >
                                    <div>
                                        Add to
                                    </div>
                                    <ShoppingCartIcon className="h-4 w-4"/>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProductList;