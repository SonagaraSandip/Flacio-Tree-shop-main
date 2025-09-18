import React, { useState } from "react";
import { useCompare } from "../contexts/CompareContext";
import CompareModel from "./CompareModel";

const CompareToggle = ({product}) => {
  const [compareView, setCompareView] = useState(false);
  const { compare } = useCompare();
  return (
    <>
      <div
        className={`${
          compare.length !== 0 ? "" : "hidden"
        } fixed top-1/2 right-0 z-40 -translate-y-1/2 items-center`}
      >
        <div
          onClick={() => setCompareView(true)}
          className="bg-zinc-900 h-auto text-white text-sm font-librebaskerville px-2 py-6 rounded-l-lg animate-zoom-in"
          style={{ writingMode: "vertical-lr", cursor: "pointer" }}
        >
          Compare
          <span className="bg-white rounded-full text-xs font-poppins text-black mt-2 py-2">
            {compare.length}
          </span>
        </div>
      </div>
      {/* if compare view is open */}
      {compareView && compare.length > 0 && (
        <CompareModel product={product} onClose={() => setCompareView(false)} />
      )}
    </>
  );
};

export default CompareToggle;
