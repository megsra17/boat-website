// src/components/ClassSelection.tsx
"use client";
import ClassBox from "./ClassBox";

export default function ClassSelection() {
  const handleSelectClass = (selectedClass: string) => {
    console.log("Selected class:", selectedClass);
    // Additional logic here
  };

  return (
    <section id="step1" className="mt-5">
      <h1
        className="fw-light my-3 text-center"
        style={{ letterSpacing: ".5rem" }}
      >
        Design Your Pontoon
      </h1>
      <h3 className="fw-light my-3 text-center">
        <strong>Step 1 of 3: </strong>Choose a Class
      </h3>
      <div className="row row-cols-1 row-cols-md-2 g-4">
        <ClassBox
          id="vclass"
          imageSrc="/images/Vanderbilt - BAB color changer_r05.png"
          altText="V Class Boat"
          classNameLabel="V CLASS"
          description="The Vanderbilt flagship, the V Class elevates every journey to first class with refined luxury with elegance."
          priceLabel="Premium Luxury - $$$$"
          modelLengths="Model Lengths - 25ft, 31ft"
          features={[
            "Single and twin outboard models",
            "Serenity Drive™ tritoon package",
            "Exclusive aft bar lounge with extended deck (V700T, twin power)",
          ]}
          onClick={handleSelectClass}
        />
        <ClassBox
          id="lclass"
          imageSrc="/images/Vanderbilt - BAB color changer_r05 L-class.png"
          altText="L Class Boat"
          classNameLabel="L CLASS"
          description="New for 2025. The L Class delivers a dynamic blend of performance and luxury at a more accessible price."
          priceLabel="Sport Luxury - $$$"
          modelLengths="Model Lengths - 23ft, 25ft"
          features={[
            "New for 2025 – well-equipped with plush standard features",
            "Serenity Drive™ tritoon package",
          ]}
          onClick={handleSelectClass}
        />
      </div>
    </section>
  );
}
