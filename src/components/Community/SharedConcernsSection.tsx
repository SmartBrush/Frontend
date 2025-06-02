import ConcernCard from "./ConcernCard";

const SharedConcernsSection = () => {
  const concerns = [
    { name: "익명", content: "좋은 탈모 샴푸 있나요 ..." },
    { name: "시윤", content: "좋은 탈모 샴푸 있나요 ..." },
  ];

  return (
    <section className="px-4">
      <div className="bg-white border border-gray-200 rounded-xl p-4">
        <h2 className="text-base font-semibold mb-3">고민을 나눠보아요! 💕</h2>
        <div className="space-y-3">
          {concerns.map((item, idx) => (
            <ConcernCard key={idx} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SharedConcernsSection;
