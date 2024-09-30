import React, {useState} from "react";
import {observer} from "mobx-react-lite";
import {useKeycloak} from "@react-keycloak/web";
import notificationStore from "../../store/NotificationStore.ts";
import {useNavigate} from "react-router-dom";

const AddProduct:React.FC = () => {
    const {keycloak} = useKeycloak();
    const navigate = useNavigate();
    const [image, setImage] = useState<File | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        description: ''
    });

    // Handle form field changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0]; // Get the first selected file
        if (selectedFile) {
            setImage(selectedFile);
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = new FormData();
        form.append('productImage', image ?? "");
        form.append('name', formData.name);
        form.append('price', formData.price);
        form.append('description', formData.description);
        const requestOptions = {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${keycloak.token}`,
            },
            body: form,
        };
        fetch('http://localhost:8080/api/products/create', requestOptions)
            .then((res) => {
                return res.json();
            })
            .then((response) => {
                setTimeout(() => {
                    console.log(response);
                    if (response == true) {
                        navigate("/admin/products");
                        notificationStore.success("product added successfully.");
                    } else {
                        notificationStore.error("Could not add the product. Please try again.");
                    }
                }, 1500);
            });
    };
    return (
        <>
            <div className="grid grid-cols-2 gap-4">
                <div className="">
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-12">
                            <div className="border-b border-gray-900/10 pb-12">
                                <h2 className="text-base font-semibold leading-7 text-gray-900">Product Information</h2>
                                {/*<p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can*/}
                                {/*    receive mail.</p>*/}

                                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    <div className="sm:col-span-3">
                                        <label htmlFor="name"
                                               className="block text-sm font-medium leading-6 text-gray-900">
                                            Name
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                type="text"
                                                autoComplete="given-name"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-3">
                                        <label htmlFor="price"
                                               className="block text-sm font-medium leading-6 text-gray-900">
                                            Price
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="price"
                                                name="price"
                                                value={formData.price}
                                                onChange={handleChange}
                                                type="number"
                                                autoComplete="family-name"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-6">
                                        <label htmlFor="description"
                                               className="block text-sm font-medium leading-6 text-gray-900">
                                            Description
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="description"
                                                name="description"
                                                value={formData.description}
                                                onChange={handleChange}
                                                type="text"
                                                autoComplete="address-level1"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-6">
                                        <label htmlFor="description"
                                               className="block text-sm font-medium leading-6 text-gray-900">
                                            Product Image
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="description"
                                                name="description"
                                                accept="image/*" onChange={handleImageChange}
                                                type="file"
                                                autoComplete="address-level1"
                                                className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>


                                </div>
                            </div>
                        </div>

                        <div className="mt-6 flex items-center justify-end gap-x-6">
                            <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default observer(AddProduct);