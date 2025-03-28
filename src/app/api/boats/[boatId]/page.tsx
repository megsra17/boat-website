import { notFound } from "next/navigation";

async function fetchBoatById(boatId: string) {
  const res = await fetch(`http://localhost:3000/api/boats/${boatId}`);
  if (!res.ok) return null;
  const data = await res.json();
  return data.boat;
}

export default async function BuildBoatPage({
  params,
}: {
  params: { boatId: string };
}) {
  const boat = await fetchBoatById(params.boatId);
  if (!boat) notFound();

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Customize Your {boat.name}</h1>
      <img src={boat.image} alt={boat.name} width={500} height={300} />
      <p>Price: ${boat.price}</p>
      <div>
        <h3>Colors</h3>
        {boat.options.colors.map((color: string, index: number) => (
          <button
            key={index}
            onClick={() => console.log(`Selected color: ${color}`)}
          >
            {color}
          </button>
        ))}
      </div>
      {/* Add seats, engines, etc. */}
    </main>
  );
}
