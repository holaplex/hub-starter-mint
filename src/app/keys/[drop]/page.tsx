import Drop from "./Drop";

export default async function DropPage({
  params: { drop },
}: {
  params: { drop: string };
}) {
  return <Drop drop={drop} />;
}
