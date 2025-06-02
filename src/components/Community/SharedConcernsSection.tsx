import ConcernCard from "./ConcernCard";

const SharedConcernsSection = () => {
  const concerns = [
    { name: "익명", content: "좋은 탈모 샴푸 있나요 ..." },
    { name: "시윤", content: "좋은 탈모 샴푸 있나요 ..." },
  ];

  return (
    <section className="px-4">
      <h2 className="text-lg font-semibold mb-2">고민을 나눠보아요! 💕</h2>
      {concerns.map((item, idx) => (
        <ConcernCard key={idx} {...item} />
      ))}
    </section>
  );
};

export default SharedConcernsSection;
