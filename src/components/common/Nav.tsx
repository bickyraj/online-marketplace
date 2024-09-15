import {useKeycloak} from "@react-keycloak/web";
import {Link} from "react-router-dom";

const Nav = () => {
    const { keycloak } = useKeycloak();
    return (
        <div>
            <div className="top-0 w-full flex flex-wrap">
                <section className="x-auto">
                    <nav className="flex justify-between bg-gray-200 text-blue-800 w-screen">
                        <div className="px-5 xl:px-12 py-6 flex w-full items-center">
                            <h1 className="text-3xl font-bold font-heading">
                                Fast Payment
                            </h1>
                            <ul className="flex space-x-6 mb-10 text-lg">
                                <li>
                                    <Link to="/register" className="text-blue-500 hover:underline">Register</Link>
                                </li>
                                {keycloak.authenticated && (
                                    <>
                                        <li>
                                            <Link to="/admin/dashboard"
                                                  className="text-blue-500 hover:underline">Dashboard</Link>
                                        </li>
                                        <li>
                                            <Link to="/admin/products"
                                                  className="text-blue-500 hover:underline">Products</Link>
                                        </li>
                                    </>
                                )}
                            </ul>
                            <div className="hidden xl:flex items-center space-x-5">
                            <div className="hover:text-gray-200">
                                    {!keycloak.authenticated && (
                                        <button
                                            type="button"
                                            className="text-blue-800"
                                            onClick={() => keycloak.login()}
                                        >
                                            Login
                                        </button>
                                    )}
                                    {!!keycloak.authenticated && (
                                        <button
                                            type="button"
                                            className="text-blue-800"
                                            onClick={() => keycloak.logout()}
                                        >
                                            Logout
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </nav>
                </section>
            </div>
        </div>
    );
};

export default Nav;