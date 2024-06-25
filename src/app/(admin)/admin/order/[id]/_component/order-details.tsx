import React from "react";

const OrderDetailsGroup: React.FC<{
  title: string;
  data: Record<string, string>;
}> = ({ title, data }) => {
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-4 mb-2">
      <h3 className="col-span-2 mb-2 text-2xl font-semibold">{title}</h3>
      {Object.entries(data).map(([key, value], index) => (
        <div key={index + key} className="flex flex-col">
          <h3 className="text-sm text-slate-400">{key}</h3>
          <p className="text-lg font-medium">{value}</p>
        </div>
      ))}
    </div>
  );
};

export default OrderDetailsGroup;
