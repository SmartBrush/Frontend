import HotTopicCard from "./HotTopicCard";
import { FiChevronRight } from "react-icons/fi"; // 아이콘용

const HotTopicsSection = () => {
  const data = [
    {
      title: "나도 혹시 정수리 탈모?",
      desc: "최근 2030 여성들에게 나타나고 있는...",
      author: "탈모박사",
      date: "2025.03.17",
      tags: ["여성탈모", "탈모고민"],
      imageUrl: "/hot1.png",
    },
    {
      title: "빈 뒤통수! 스트레스 유발",
      desc: "서울시에 거주하는 최모씨(56)는 최근...",
      author: "모발모발",
      date: "2025.03.17",
      tags: ["남성탈모", "가발"],
      imageUrl: "/hot2.png",
    },
  ];

  return (
    <section className="px-4 mb-6">
      <div className="bg-white border border-gray-200 rounded-xl p-4">
        {/* 상단 제목 + 화살표 */}
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-semibold">지금 가장 핫한 토픽 🔥</h2>
          <FiChevronRight className="text-gray-400" />
        </div>

        {/* 핫 토픽 카드들 */}
        <div className="space-y-3">
          {data.map((item, idx) => (
            <HotTopicCard key={idx} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HotTopicsSection;
