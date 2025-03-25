"use client"; // เพิ่ม directive นี้เพื่อให้เป็น Client Component

import React from 'react';
import { WaterwayDiagram } from './WaterwayDiagram';

const App: React.FC = () => {
  const handlePointClick = (point: { id: string; name: string; description: string; waterLevel: string; flowRate: string; x: number; y: number }) => {
    alert(`Clicked on ${point.name}\nDescription: ${point.description}\nWater Level: ${point.waterLevel}\nFlow Rate: ${point.flowRate}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 flex flex-col items-center p-6">
      <h1 className="text-4xl font-semibold mb-6 text-blue-600">ผังน้ำ</h1>
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-4xl">
        <WaterwayDiagram onPointClick={handlePointClick} />
      </div>
      <footer className="mt-6 text-sm text-gray-500">
      </footer>
    </div>
  );
};

export default App;
