import React from "react";

const Featured = () => {
  return (
    <div className="flex flex-col font-librebaskervilleItalic gap-2 self-start items-start ml-12 justify-center text-2xl h-screen">
      <h1 className="text-4xl">home page</h1>
      <p>created only modern homepage other 5 is pending</p>
      <p>few issue in creating show all button</p>
      <hr className="border-2 border-black my-4 w-1/2" />
      
      <h1 className="text-4xl">shop page</h1>
      <p>in price bar min price is not working</p>
      <p>
        few issue in color filter &{" "}
        <span className="line-through">also add all product color</span>
      </p>
      <hr className="border-2 border-black my-4 w-1/2" />
      <h1 className="text-4xl">product.js file</h1>
      <p>add to cart hover effect not working</p>
      <p>pre-order in few product not show</p>
    </div>
  );
};

export default Featured;
