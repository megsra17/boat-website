import Link from "next/link";

export default async function LandingPage() {
  const res = await fetch("http://localhost:3000/api/boats");
  const { boats } = await res.json();

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Choose Your Boat</h1>
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        {boats.map((boat: any) => (
          <div
            key={boat._id}
            style={{ border: "1px solid #ccc", padding: "1rem" }}
          >
            <Link href={`/build/${boat._id}`}>
              <img src={boat.image} alt={boat.name} width={300} height={200} />
              <h2>{boat.name}</h2>
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
