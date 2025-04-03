"use client";
import { useState } from "react";

interface AmenityItem {
  id: string;
  label: string;
  price: number;
  checked: boolean;
}

interface AmenitySection {
  title: string;
  description?: string;
  items?: AmenityItem[];
}

const initialAmenities: AmenitySection[] = [
  {
    title: "Tritoon Performance Package (Standard On All Models)",
    description:
      "High-performance Serenity Drive™ tritoon with running stakes, extended rear deck, massive in-floor storage locker, and rear pylon.",
  },
  {
    title: "Choose Your Custom Options",
    items: [
      {
        id: "platinum",
        label:
          "Platinum Convenience Package: Yeti 48L Cooler, Stowable Table, Mounted Phone Charger, Portable Cupholder",
        price: 2032,
        checked: false,
      },
    ],
  },
  {
    title: "Popular Options",
    items: [
      {
        id: "lowProfileWrapAroundWindshield",
        label: "Low Profile Wrap-Around Windshield",
        price: 2639,
        checked: false,
      },
      {
        id: "yetiCooler",
        label: "Branded Yeti 48 Liter Cooler",
        price: 840,
        checked: false,
      },
      {
        id: "portableCupholder",
        label: "Portable Cupholder (2 Stainless Steel Cup Receivers)",
        price: 394,
        checked: false,
      },
      {
        id: "doggyViewGate",
        label: "Doggy View Gate(s) and Travel Pack",
        price: 1026,
        checked: false,
      },
      {
        id: "helmMountedPhoneCharger",
        label: "Helm Mounted Phone Charger",
        price: 307,
        checked: false,
      },
      {
        id: "privacyStationDropDownCurtain",
        label: "Privacy Station with Drop Down Curtain",
        price: 474,
        checked: false,
      },
      {
        id: "twoQuickReleaseFenders",
        label: "Two Quick Release Fenders",
        price: 203,
        checked: false,
      },
      {
        id: "stowableTable",
        label: "Stowable Table",
        price: 359,
        checked: false,
      },
      {
        id: "saltwaterPackage",
        label: "Saltwater Package (2 Anodes)",
        price: 329,
        checked: false,
      },
      {
        id: "vantageTube",
        label: "Vantage Tube Wrap and Guard",
        price: 2407,
        checked: false,
      },
    ],
  },
  {
    title: "Accent Lighting",
    items: [
      {
        id: "interiorDeckLighting",
        label: "Interior Deck RGB Accent Lighting",
        price: 3736,
        checked: false,
      },
      {
        id: "exteriorLighting",
        label: "Exterior RGB Accent Lighting",
        price: 789,
        checked: false,
      },
    ],
  },
  {
    title: "Premium Audio Package",
    items: [
      {
        id: "premiumAudio",
        label: "Premium Audio Package: 2 woofers, 6 speakers, RGB LED Accent Lighting",
        price: 3160,
        checked: false,
      },
    ],
  },
];

export default function AmenitiesSection() {
  const [amenities, setAmenities] = useState<AmenitySection[]>(initialAmenities);

  // Handle checkbox toggling
  const handleToggle = (sectionIndex: number, itemIndex: number) => {
    setAmenities((prev) => {
      const updated = [...prev];
      const items = updated[sectionIndex].items || [];
      items[itemIndex].checked = !items[itemIndex].checked;
      return updated;
    });
  };

  // Calculate total price
  const totalPrice = amenities.reduce((acc, section) => {
    if (!section.items) return acc;
    const sectionTotal = section.items.reduce((subAcc, item) => {
      return item.checked ? subAcc + item.price : subAcc;
    }, 0);
    return acc + sectionTotal;
  }, 0);

  return (
    <div className="mb-4">
      <h4 className="mb-3">CHOOSE YOUR AMENITIES</h4>

      {amenities.map((section, sectionIndex) => (
        <div key={sectionIndex} className="mb-4">
          <h5>{section.title}</h5>
          {section.description && <p>{section.description}</p>}

          {/* If this section has items, display them as checkboxes */}
          {section.items && (
            <div className="ms-3">
              {section.items.map((item, itemIndex) => (
                <div key={item.id} className="form-check mb-2">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={item.id}
                    checked={item.checked}
                    onChange={() => handleToggle(sectionIndex, itemIndex)}
                  />
                  <label className="form-check-label" htmlFor={item.id}>
                    {item.label}
                  </label>
                  <span className="ms-2">
                    <strong>${item.price.toLocaleString()}</strong>
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

      {/* Summary / Total Price */}
      <div className="mt-4 p-3 border-top">
        <h5>Selected Amenities Total: ${totalPrice.toLocaleString()}</h5>
        <button className="btn btn-primary mt-2">Next Step / Checkout</button>
      </div>
    </div>
  );
}
