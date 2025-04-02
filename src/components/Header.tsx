// src/components/Header.tsx
"use client";
import Image from "next/image";
import Link from "next/link";
import { Company } from "@/types/company";

interface HeaderProps {
  company: Company;
}

export default function Header({ company }: HeaderProps) {
  return (
    <header className="container-fluid sticky-top shadow-sm">
      <div className="d-flex justify-content-between align-items-center p-3 ms-5">
        <Link
          href={company.homepage}
          className="text-dark text-decoration-none fw-bold ms-5 py-2"
        >
          <Image
            src={company.logoUrl}
            alt={company.logoAlt}
            width={300}
            height={100}
            style={{ width: "75%" }}
          />
        </Link>
        <div className="header-user"></div>
      </div>
    </header>
  );
}
