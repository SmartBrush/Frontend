import HotTopicCard from "./HotTopicCard";

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
      <h2 className="text-lg font-semibold mb-2">지금 가장 핫한 토픽 🔥</h2>
      {data.map((item, idx) => (
        <HotTopicCard key={idx} {...item} />
      ))}
    </section>
  );
};

export default HotTopicsSection;
