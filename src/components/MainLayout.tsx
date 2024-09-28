import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems
} from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import React, {Fragment, useState} from "react";
import {useKeycloak} from "@react-keycloak/web";
import {Outlet} from "react-router-dom";
import PageUtil from "../utils/PageUtil.ts";
import {ShoppingCartIcon} from "@heroicons/react/16/solid";
import CartDrawer from "./mycart/CartDrawer.tsx";
import cartStore from "../store/CartStore.ts";
import {observer} from "mobx-react-lite";
import Notification from "./common/Notification.tsx";
import userStore from "../store/UserStore.ts";
const user = {
    name: userStore.getFirstName(),
    email: userStore.getEmail(),
    username: userStore.getUserName(),
    imageUrl:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}
const navigation = [
    { name: 'Dashboard', href: '/admin/dashboard', current: true },
    { name: 'All Products', href: '/admin/products', current: false },
    { name: 'Registration', href: '/admin/register', current: false },
    { name: 'My Order History', href: '/admin/my-order-history', current: false },
    { name: 'My Payment Methods', href: '/admin/my-payment-methods', current: false },
    { name: 'Reports', href: '/admin/reports', current: false },
    { name: 'Services', href: '/admin/services', current: false },
]
const userNavigation = [
    { name: 'Your Profile', href: '#' },
    { name: 'Settings', href: '#' },
]

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}

const MainLayout: React.FC = () => {
    const {keycloak} = useKeycloak();
    const [openCart, setOpenCart] = useState<boolean>(false);
    return (
        <>
            {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-100">
        <body class="h-full">
        ```
      */}
            <Notification/>
            <div className="min-h-full">
                <Disclosure as="nav" className="w-full bg-gray-800">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 items-center justify-between">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <img
                                        alt="Your Company"
                                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                                        className="h-8 w-8"
                                    />
                                </div>
                                <div className="hidden md:block">
                                    <div className="ml-10 flex items-baseline space-x-4">
                                        {navigation.map((item) => (
                                            <a
                                                key={item.name}
                                                href={item.href}
                                                aria-current={item.current ? 'page' : undefined}
                                                className={classNames(
                                                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                    'rounded-md px-3 py-2 text-sm font-medium',
                                                )}
                                            >
                                                {item.name}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="hidden md:block">
                                <div className="ml-4 flex items-center md:ml-6">
                                    <button
                                        onClick={() => {
                                            setOpenCart(!openCart);
                                        }}
                                        type="button"
                                        className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white"
                                    >
                                        <span className="absolute -inset-1.5"/>
                                        <span className="sr-only">View notifications</span>
                                        <div className="relative py-2">
                                            <div className="-top-1 absolute left-3">
                                                <p className="flex h-2 w-2 items-center justify-center rounded-full bg-red-500 p-2.5 text-xs text-white">{cartStore.itemCount}</p>
                                            </div>
                                            <ShoppingCartIcon aria-hidden="true" className="h-6 w-6"/>
                                        </div>
                                    </button>
                                    <CartDrawer open={openCart} onClose={() => setOpenCart(false)}/>

                                    {/* Profile dropdown */}
                                    <Menu as="div" className="relative ml-3">
                                        <div>
                                            <MenuButton
                                                className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none">
                                                <span className="absolute -inset-1.5"/>
                                                <span className="sr-only">Open user menu</span>
                                                <img alt="" src={user.imageUrl} className="h-8 w-8 rounded-full" />
                                                <span className="ml-3 flex dark:text-blue-100 font-semibold capitalize">Hi! {user.name}</span>
                                            </MenuButton>
                                        </div>
                                        <MenuItems
                                            transition
                                            className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                                        >
                                            {userNavigation.map((item) => (
                                                <MenuItem key={item.name}>
                                                    <a
                                                        href={item.href}
                                                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                                                    >
                                                        {item.name}
                                                    </a>
                                                </MenuItem>
                                            ))}
                                            <button className="flex hover:bg-gray-50 px-4 py-2 w-full text-sm text-gray-700 data-[focus]:bg-gray-100"
                                                onClick={() => {
                                                    cartStore.clearCart();
                                                    userStore.clearUser();
                                                    keycloak.logout({
                                                        redirectUri: window.location.origin, // Should match one of the Post Logout Redirect URIs
                                                    });
                                                }}
                                            >Sign out</button>
                                        </MenuItems>
                                    </Menu>
                                </div>
                            </div>
                            <div className="-mr-2 flex md:hidden">
                                {/* Mobile menu button */}
                                <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                    <span className="absolute -inset-0.5" />
                                    <span className="sr-only">Open main menu</span>
                                    <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" />
                                    <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
                                </DisclosureButton>
                            </div>
                        </div>
                    </div>

                    <DisclosurePanel className="md:hidden">
                        <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                            {navigation.map((item) => (
                                    <DisclosureButton
                                        key={item.name}
                                        as="a"
                                        href={item.href}
                                        aria-current={item.current ? 'page' : undefined}
                                        className={classNames(
                                            item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                            'block rounded-md px-3 py-2 text-base font-medium',
                                        )}
                                    >
                                        {item.name}
                                    </DisclosureButton>
                            ))}
                        </div>
                        <div className="border-t border-gray-700 pb-3 pt-4">
                            <div className="flex items-center px-5">
                                <div className="flex-shrink-0">
                                    <img alt="" src={user.imageUrl} className="h-10 w-10 rounded-full" />
                                </div>
                                <div className="ml-3">
                                    <div className="text-base font-medium leading-none text-white">Admin</div>
                                    <div className="text-sm font-medium leading-none text-gray-400">{user.email}</div>
                                </div>
                                <button
                                    type="button"
                                    className="relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                >
                                    <span className="absolute -inset-1.5" />
                                    <span className="sr-only">View notifications</span>
                                    <BellIcon aria-hidden="true" className="h-6 w-6" />
                                </button>
                            </div>
                            <div className="mt-3 space-y-1 px-2">
                                {userNavigation.map((item) => (
                                    <Fragment key={item.name}>
                                        <DisclosureButton
                                            as="a"
                                            href={item.href}
                                            className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                                        >
                                            {item.name}
                                        </DisclosureButton>
                                    </Fragment>
                                ))}
                            </div>
                        </div>
                    </DisclosurePanel>
                    <header className="w-full bg-white shadow">
                        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                            <h1 className="text-3xl font-bold tracking-tight text-gray-900">{PageUtil.pathToTitle(new URL(window.location.href))}</h1>
                        </div>
                    </header>
                </Disclosure>

                <main>
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8"><Outlet /></div>
                </main>
            </div>
        </>
    )
}

export default observer(MainLayout);
