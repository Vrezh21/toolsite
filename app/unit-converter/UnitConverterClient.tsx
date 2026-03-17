"use client";

import { useMemo, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SeoContent from "@/components/SeoContent";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedTools from "@/components/RelatedTools";
import ToolStructuredData from "@/components/ToolStructuredData";

type ConverterType = "length" | "weight" | "temperature";

const lengthUnits = [
  { value: "m", label: "Meters" },
  { value: "km", label: "Kilometers" },
  { value: "cm", label: "Centimeters" },
  { value: "mm", label: "Millimeters" },
  { value: "ft", label: "Feet" },
  { value: "in", label: "Inches" },
];

const weightUnits = [
  { value: "kg", label: "Kilograms" },
  { value: "g", label: "Grams" },
  { value: "lb", label: "Pounds" },
  { value: "oz", label: "Ounces" },
];

const temperatureUnits = [
  { value: "c", label: "Celsius" },
  { value: "f", label: "Fahrenheit" },
  { value: "k", label: "Kelvin" },
];

function convertLength(value: number, from: string, to: string) {
  const toMeters: Record<string, number> = {
    m: 1,
    km: 1000,
    cm: 0.01,
    mm: 0.001,
    ft: 0.3048,
    in: 0.0254,
  };

  const meters = value * toMeters[from];
  return meters / toMeters[to];
}

function convertWeight(value: number, from: string, to: string) {
  const toKg: Record<string, number> = {
    kg: 1,
    g: 0.001,
    lb: 0.45359237,
    oz: 0.0283495231,
  };

  const kg = value * toKg[from];
  return kg / toKg[to];
}

function convertTemperature(value: number, from: string, to: string) {
  let celsius = value;

  if (from === "f") celsius = ((value - 32) * 5) / 9;
  if (from === "k") celsius = value - 273.15;

  if (to === "c") return celsius;
  if (to === "f") return (celsius * 9) / 5 + 32;
  if (to === "k") return celsius + 273.15;

  return celsius;
}

export default function UnitConverterPage() {
  const [converterType, setConverterType] = useState<ConverterType>("length");
  const [inputValue, setInputValue] = useState("1");
  const [fromUnit, setFromUnit] = useState("m");
  const [toUnit, setToUnit] = useState("km");

  const currentUnits = useMemo(() => {
    if (converterType === "length") return lengthUnits;
    if (converterType === "weight") return weightUnits;
    return temperatureUnits;
  }, [converterType]);

  const result = useMemo(() => {
    const value = Number(inputValue);

    if (Number.isNaN(value)) {
      return "Enter a valid number";
    }

    let converted = value;

    if (converterType === "length") {
      converted = convertLength(value, fromUnit, toUnit);
    } else if (converterType === "weight") {
      converted = convertWeight(value, fromUnit, toUnit);
    } else {
      converted = convertTemperature(value, fromUnit, toUnit);
    }

    return converted.toFixed(4).replace(/\.?0+$/, "");
  }, [converterType, inputValue, fromUnit, toUnit]);

  const handleTypeChange = (type: ConverterType) => {
    setConverterType(type);

    if (type === "length") {
      setFromUnit("m");
      setToUnit("km");
    } else if (type === "weight") {
      setFromUnit("kg");
      setToUnit("g");
    } else {
      setFromUnit("c");
      setToUnit("f");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <ToolStructuredData
        name="Unit Converter"
        description="Convert length, weight, and temperature units online."
        url="https://toolsite.ink/unit-converter"
      />

      <main className="mx-auto max-w-5xl px-4 py-10">

        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Tools", href: "/tools" },
            { label: "Unit Converter" },
          ]}
        />

        <h1 className="text-4xl font-bold text-slate-900">Unit Converter</h1>
        <p className="mt-3 text-lg text-slate-700">
          Convert length, weight, and temperature units directly in your browser.
        </p>

        <div className="mt-8 rounded-2xl border border-slate-300 bg-white p-6 shadow-sm">
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => handleTypeChange("length")}
              className={`rounded-xl px-4 py-2 transition ${converterType === "length"
                ? "bg-slate-900 text-white"
                : "border border-slate-300 bg-white text-slate-900 hover:bg-slate-50"
                }`}
            >
              Length
            </button>

            <button
              onClick={() => handleTypeChange("weight")}
              className={`rounded-xl px-4 py-2 transition ${converterType === "weight"
                ? "bg-slate-900 text-white"
                : "border border-slate-300 bg-white text-slate-900 hover:bg-slate-50"
                }`}
            >
              Weight
            </button>

            <button
              onClick={() => handleTypeChange("temperature")}
              className={`rounded-xl px-4 py-2 transition ${converterType === "temperature"
                ? "bg-slate-900 text-white"
                : "border border-slate-300 bg-white text-slate-900 hover:bg-slate-50"
                }`}
            >
              Temperature
            </button>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-800">
                Value
              </label>
              <input
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-slate-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-800">
                From
              </label>
              <select
                value={fromUnit}
                onChange={(e) => setFromUnit(e.target.value)}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-slate-500"
              >
                {currentUnits.map((unit) => (
                  <option key={unit.value} value={unit.value}>
                    {unit.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-800">
                To
              </label>
              <select
                value={toUnit}
                onChange={(e) => setToUnit(e.target.value)}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-slate-500"
              >
                {currentUnits.map((unit) => (
                  <option key={unit.value} value={unit.value}>
                    {unit.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-5">
            <div className="text-sm text-slate-500">Result</div>
            <div className="mt-1 text-2xl font-semibold text-slate-900">
              {result}
            </div>
          </div>
        </div>

        <SeoContent
          aboutTitle="About this Unit Converter"
          aboutParagraphs={[
            "This unit converter converts values between common measurement units.",
            "It supports length, weight, and temperature conversions.",
          ]}
          howToUseSteps={[
            "Choose the conversion type.",
            "Enter the value and units.",
            "Review the converted result.",
          ]}
          faqItems={[
            {
              question: "Which units are supported?",
              answer: "Length, weight, and temperature units.",
            },
            {
              question: "Does the result update automatically?",
              answer: "Yes, the conversion updates instantly.",
            },
          ]}
        />

        <RelatedTools
          currentSlug="unit-converter"
          category="tools"
          title="Related tools"
        />

      </main>

      <Footer />
    </div>
  );
}