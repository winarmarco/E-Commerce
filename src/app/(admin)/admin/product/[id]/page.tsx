import React from "react";

const ProductDetails: React.FC<{
  props: { id: string };
}> = ({ props }) => {
  const { id } = props;
  return <div>{id}</div>;
};

export default ProductDetails;
