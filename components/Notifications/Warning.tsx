const formatText = (text: string) => {
  const dotIndex = text.indexOf(".");
  const end = dotIndex !== -1 ? dotIndex : text.length;
  const firstPart = text.slice(0, end).trim().toLowerCase();
  const formatted = firstPart.charAt(0).toUpperCase() + firstPart.slice(1);
  const rest = text.slice(end);
  return formatted + rest;
};

const Warning = ({ text }: { text: string }) => {
  return (
    <p className="bg-emerald-50 text-emerald-800 px-4 py-2 rounded-xl border border-emerald-200 mt-4">
      {formatText(text)}
    </p>
  );
};

export default Warning;
