import React, { Fragment, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

const productList = [
    {
        img: "https://cdn.easyfrontend.com/pictures/portfolio/portfolio14.jpg",
        title: "ABUK Home Appliance Surge Protector Voltage Brownout Plug Outlet Power Strip Surge Protector With Pass Button",
        price: "158",
        qty: 2,
    },
    {
        img: "https://cdn.easyfrontend.com/pictures/portfolio/portfolio20.jpg",
        title: "Forsining 3d Logo Design Hollow Engraving Black Gold Case Leather Skeleton Mechanical Watches Men Luxury Brand Heren Horloge",
        price: "7,390",
        qty: 2,
    },
    {
        img: "https://cdn.easyfrontend.com/pictures/portfolio/portfolio19.jpg",
        title: "Factory Brand Wholesale 5# Zinc Accessories Custom Hook Slider Metal #5 For Clothing garment jacket",
        price: "21,452",
        qty: 2,
    },
    {
        img: "https://cdn.easyfrontend.com/pictures/portfolio/portfolio15.jpg",
        title: "Factory Direct Sales Stainless Steel Heat Resistant Custom Compression Spring Manufacturer Spring Steel",
        price: "17,652",
        qty: 2,
    },
];

const SideBar = () => (
    <div className="bg-blue-50 dark:bg-slate-800 rounded-xl flex flex-col gap-6 p-4 md:p-6">
        <div className="">
            <h6 className="font-medium mb-6 opacity-75">Order Summary</h6>

            <div className="flex justify-between items-center">
                <span>Sub total</span>
                <span className="font-bold">$2099</span>
            </div>
            <hr className="my-4 dark:border-slate-700" />
            <div className="flex justify-between items-center">
                <span>Shipping Fee</span>
                <span className="font-bold">$99</span>
            </div>
            <hr className="my-4 dark:border-slate-700" />
            <div className="flex justify-between items-center">
                <span>Tax</span>
                <span className="font-bold">$168</span>
            </div>
            <hr className="my-4 dark:border-slate-700" />
            <div className="flex justify-between items-center">
                <span className="fs-5 font-bold">Total</span>
                <span className="font-bold">$2238</span>
            </div>
        </div>
        <div className="">
            <button className="w-full bg-blue-600 rounded-md text-white hover:bg-opacity-90 py-2.5">BUY (13)</button>
        </div>
    </div>
);

const QtyField = ({ name, value, onChange }) => {
    const qtyControl = (qty) =>
        onChange({
            target: {
                name,
                type: "radio",
                value: qty < 1 ? 1 : qty,
            },
        });

    return (
        <div className="h-10 border dark:border-slate-700 rounded-full flex w-36 relative mt-4 overflow-hidden">
            <button className="px-4 py-1 inline-flex justify-center border-r dark:border-slate-700 text-blue-600 hover:bg-blue-600 hover:bg-opacity-10" type="button" onClick={() => qtyControl(parseInt(value) - 1)}>
                -
            </button>
            <input type="number" className="px-4 py-1 inline-flex justify-center max-w-[60px] text-center bg-transparent focus:outline-none" value={value} onChange={(e) => qtyControl(e.target.value)} />
            <button className="px-4 py-1 inline-flex justify-center border-l dark:border-slate-700 text-blue-600 hover:bg-blue-600 hover:bg-opacity-10" type="button" onClick={() => qtyControl(parseInt(value) + 1)}>
                +
            </button>
        </div>
    );
};

QtyField.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.any,
};

const ProductItem = ({ item, index, onChange }) => {
    const { img, title, price, qty } = item;
    return (
        <div className="flex flex-col md:flex-row items-start p-2 md:p-6 mb-4">
            <div className="w-full lg:max-w-[150px] rounded-xl mr-4 md:mr-6 mb-4 lg:mb-0">
                <a href="#!">
                    <img src={img} alt={title} className="max-w-full h-auto rounded-xl mx-auto" />
                </a>
            </div>

            <div className="flex">
                {/* product details */}
                <div>
                    <div className="text-base md:text-lg hover:text-blue-600 mb-4">
                        <a href="#!">{title}</a>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-blue-600">Rs. {price}</h3>
                        <QtyField name={`ezy__epcart2-qty-${index}`} value={qty} onChange={(e) => onChange(e, index)} />
                    </div>
                </div>
                {/* delete button  */}
                <div>
                    <button className="w-10 h-10 bg-gray-200 dark:bg-slate-900 text-blue-600 inline-flex justify-center items-center rounded-full">
                        <FontAwesomeIcon icon={faTrashAlt} />
                    </button>
                </div>
            </div>
        </div>
    );
};

ProductItem.propTypes = {
    item: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
};

const Epcart2 = () => {
    const [products, setProducts] = useState([...productList]);

    const onChange = (e, index) => {
        const { value } = e.target;

        setProducts([
            ...products.slice(0, index),
            {
                ...products[index],
                qty: value,
            },
            ...products.slice(index + 1),
        ]);
    };

    return (
        <section className="ezy__epcart2 light py-14 md:py-24 bg-white dark:bg-[#0b1727] text-zinc-900 dark:text-white relative overflow-hidden z-10">
            <div className="container px-4 mx-auto">
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* products  */}
                    <div className="bg-blue-50 dark:bg-slate-800 rounded-xl w-full lg:w-2/3">
                        {products.map((item, i) => (
                            <Fragment key={i}>
                                {!!i && <hr className="my-4 dark:border-slate-700" />}
                                <ProductItem item={item} index={i} onChange={onChange} key={i} />
                            </Fragment>
                        ))}
                    </div>

                    {/* sidebar */}
                    <div className="w-full lg:w-1/3">
                        <SideBar />
                    </div>
                </div>
            </div>
        </section>
    );
};
