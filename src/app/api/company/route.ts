// src/app/api/company/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  // This data could come from a database in a real app
  const companyData = {
    homepage: "https://vanderbiltpontoons.com/",
    logoUrl:
      "https://vanderbiltpontoons.com/wp-content/uploads/2024/07/Vanderbilt-Logo-Tagline_white-1.png",
    logoAlt: "Vanderbilt Pontoons",
  };

  return NextResponse.json(companyData);
}
