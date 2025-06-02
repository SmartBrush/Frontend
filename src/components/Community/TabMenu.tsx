import { useState } from "react";

const TabMenu = () => {
  const tabs = ["인기", "토픽", "고민공유"];
  const [activeTab, setActiveTab] = useState("인기");

  return (
    <div className="flex justify-center border-b border-gray-200 text-sm font-medium">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`flex-1 py-2 text-center
            ${activeTab === tab
              ? "text-blue-600 border-b-2 border-blue-600 font-semibold"
              : "text-gray-300"
            }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default TabMenu;
