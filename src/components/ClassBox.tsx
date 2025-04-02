"use client";
import Image from "next/image";

interface ClassBoxProps {
  id: string;
  imageSrc: string;
  altText: string;
  classNameLabel: string;
  description: string;
  priceLabel: string;
  modelLengths: string;
  features: string[];
  onClick: (classId: string) => void;
}

export default function ClassBox({
  id,
  imageSrc,
  altText,
  classNameLabel,
  description,
  priceLabel,
  modelLengths,
  features,
  onClick,
}: ClassBoxProps) {
  return (
    <div
      className="col p-5 class-box"
      id={id}
      style={{ cursor: "pointer" }}
      onClick={() => onClick(id)}
    >
      <div className="img-container">
        <Image
          src={imageSrc}
          alt={altText}
          width={300}
          height={200}
          className="img-fluid"
        />
      </div>
      <h4 className="my-3 text-center">{classNameLabel}</h4>
      <p className="mb-2">{description}</p>
      <p className="mb-0 text-center">
        <strong>{priceLabel}</strong>
      </p>
      <p className="mb-2 text-center">
        <strong>{modelLengths}</strong>
      </p>
      <ul>
        {features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>
    </div>
  );
}
