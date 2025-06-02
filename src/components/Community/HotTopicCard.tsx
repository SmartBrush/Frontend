interface HotTopicCardProps {
  title: string;
  desc: string;
  author: string;
  date: string;
  tags: string[];
  imageUrl: string;
}

const HotTopicCard: React.FC<HotTopicCardProps> = ({ title, desc, author, date, tags, imageUrl }) => {
  return (
    <div className="flex border p-3 rounded-lg mb-2 items-start">
      <img src={imageUrl} alt={title} className="w-16 h-16 rounded-md object-cover mr-3" />
      <div className="flex-1">
        <p className="font-semibold">{title}</p>
        <p className="text-sm text-gray-500">{desc}</p>
        <div className="text-xs text-gray-400 mt-1">
          created by {author} &nbsp;·&nbsp; {date}
        </div>
        <div className="mt-1 flex gap-1 flex-wrap">
          {tags.map((tag, idx) => (
            <span key={idx} className="bg-gray-200 rounded-full px-2 py-0.5 text-xs">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HotTopicCard;
