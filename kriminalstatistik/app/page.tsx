"use client";
import dynamic from 'next/dynamic';
import Map from "@/components/MapComponent"

export default function Home() {
  return (
    <div>
      <h1 className="text-xl">Kriminalstatistik Bern</h1>

      <div className="flex justify-center items-center h-screen">
        <div className="w-full h-full">
          <Map />
        </div>
      </div>

      <p>Zeitreihen- und Trenddiagramme</p> 

      <p>Filter und Vergleichsfunktionen</p>

    </div>
  );
}
