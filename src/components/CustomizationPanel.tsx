// src/components/CustomizationPanel.tsx
"use client";
import React, { useState } from "react";

interface CustomizationOption {
  label: string;
  price: number;
}

interface Category {
  title: string;
  options: CustomizationOption[];
  // you could also add a "type" (e.g., "radio" vs "checkbox") or "name" to group them
}

const mockCategories: Category[] = [
  {
    title: "Mercury Outboards",
    options: [
      { label: "V8 Verado 300", price: 25000 },
      { label: "V10 Verado 400", price: 32000 },
    ],
  },
  {
    title: "Paint Selection",
    options: [
      { label: "White Hull Color", price: 0 },
      { label: "Black Hull Color", price: 2000 },
    ],
  },
  {
    title: "Steering Selection",
    options: [
      { label: "Standard Power Steering", price: 0 },
      { label: "Advanced Power Steering", price: 1500 },
    ],
  },
];

export default function CustomizationPanel() {
  const [selectedOptions, setSelectedOptions] = useState<{ [categoryTitle: string]: string }>({});
  const [totalPrice, setTotalPrice] = useState(0);

  const handleOptionSelect = (categoryTitle: string, option: CustomizationOption) => {
    // Update which option is selected for this category
    setSelectedOptions((prev) => ({
      ...prev,
      [categoryTitle]: option.label,
    }));
    // Recalculate the total price
    // In a real app, you might store base boat price + any selected options
    let newTotal = 0;
    // 1. Add up all previously selected options
    for (const cat of mockCategories) {
      const selectedOptionLabel = (prev[cat.title] || "") as string;
      const found = cat.options.find((opt) => opt.label === selectedOptionLabel);
      if (found) {
        newTotal += found.price;
      }
    }
    // 2. Add the newly selected option for the current category
    newTotal += option.price;
    setTotalPrice(newTotal);
  };

  return (
    <div className="customization-panel p-3">
      <h4>Choose Your Power & Options</h4>
      {mockCategories.map((category) => (
        <div key={category.title} className="mb-4">
          <h5>{category.title}</h5>
          {category.options.map((option) => (
            <div key={option.label} className="form-check">
              <input
                type="radio"
                className="form-check-input"
                name={category.title}
                id={option.label}
                checked={selectedOptions[category.title] === option.label}
                onChange={() => handleOptionSelect(category.title, option)}
              />
              <label htmlFor={option.label} className="form-check-label">
                {option.label} — ${option.price}
              </label>
            </div>
          ))}
        </div>
      ))}

      <div className="mt-4">
        <h5>Summary</h5>
        <p>Total Price: ${totalPrice}</p>
        <button className="btn btn-primary">Next / Print / Checkout</button>
      </div>
    </div>
  );
}
