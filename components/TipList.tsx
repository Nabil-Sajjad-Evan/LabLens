// A plain list of short tips or lines, separated by thin lines.
// <TipList items={["Lay the report flat, in good light."]} />
export default function TipList({ items }: { items: string[] }) {
  return (
    <ul className="mt-2 border-t-2 border-ink">
      {items.map((item) => (
        <li key={item} className="border-b border-rule py-4 text-[1.0625rem] leading-normal">
          {item}
        </li>
      ))}
    </ul>
  );
}
