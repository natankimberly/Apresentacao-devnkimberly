import { useEffect } from "react";
import { buildContractProductsJsonLd } from "../data/contractProjectsSeo";

const SCRIPT_ID = "seo-jsonld-contract-products";

const SeoContractProjectsJsonLd = () => {
  useEffect(() => {
    const payload = JSON.stringify(buildContractProductsJsonLd());
    let el = document.getElementById(SCRIPT_ID);
    if (!el) {
      el = document.createElement("script");
      el.id = SCRIPT_ID;
      el.type = "application/ld+json";
      el.setAttribute("data-source", "appevolua-contract-products");
      document.head.appendChild(el);
    }
    el.textContent = payload;
    return () => {
      document.getElementById(SCRIPT_ID)?.remove();
    };
  }, []);

  return null;
};

export default SeoContractProjectsJsonLd;
