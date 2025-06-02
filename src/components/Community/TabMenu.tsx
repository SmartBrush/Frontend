const TabMenu = () => {
  return (
    <div className="flex border-b text-center text-gray-400">
      {["인기", "토픽", "고민공유"].map((tab, index) => (
        <div key={tab} className={`flex-1 py-2 ${index === 0 ? "text-black font-bold border-b-2 border-blue-500" : ""}`}>
          {tab}
        </div>
      ))}
    </div>
  );
};

export default TabMenu;
