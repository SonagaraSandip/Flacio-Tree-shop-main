import LoadingBar from "react-top-loading-bar";
import { useLocation } from "react-router-dom";
import React, { useRef, useEffect } from "react";

const TopBarLoader = () => {
  const ref = useRef(null);
  const location = useLocation();

  useEffect(() => {
    ref.current?.continuousStart();

    const timer = setTimeout(() => {
      ref.current?.complete();
    }, 600);

    return () => {
      clearTimeout(timer);
    };
  }, [location.pathname, location.search]);

  return (
    <LoadingBar
      ref={ref}
      color="#3B874E"
      height={3}
      onLoaderFinished={() => {}}
    />
  );
};

export default TopBarLoader;
