"use client";

import React from 'react';

interface Point {
  id: string;
  name: string;
  description: string;
  waterLevel: string; // ความดัน (หน่วย: บาร์)
  flowRate: string;   // อัตราการไหล (หน่วย: ลิตร/วินาที)
  x: number;
  y: number;
}

interface WaterwayDiagramProps {
  onPointClick: (point: Point) => void;
}

export const WaterwayDiagram: React.FC<WaterwayDiagramProps> = ({ onPointClick }) => {
  const points: Point[] = [
    {
      id: 'P17',
      name: 'P.17',
      description: 'จุดเริ่มต้นด้านซ้ายบน',
      waterLevel: '5.2 บาร์',
      flowRate: '8.5 ลิตร/วินาที',
      x: 286,
      y: 95,
    },
    {
      id: 'N80',
      name: 'N.80',
      description: 'จุดเริ่มต้นด้านขวาบน',
      waterLevel: '5.0 บาร์',
      flowRate: '7.8 ลิตร/วินาที',
      x: 340,
      y: 95,
    },
    {
      id: 'N85',
      name: 'N.85',
      description: 'จุดใกล้ N.80',
      waterLevel: '4.9 บาร์',
      flowRate: '7.5 ลิตร/วินาที',
      x: 313,
      y: 110,
    },
  ];

  return (
    <div className="w-full h-full flex justify-center items-center">
      <svg
        viewBox="0 0 1000 1000"
        className="w-full h-auto max-w-4xl border rounded-lg bg-blue-50"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Background Image */}
        <image
          href="/ChaoPhrayaWaterDiagram.png" // Ensure this path is correct
          width="1000"
          height="1000"
          preserveAspectRatio="xMidYMid meet"
          opacity="0.9" // Slightly reduced opacity to make points more visible
        />

        {/* Points (จุด) */}
        {points.map((point) => (
          <g key={point.id} onClick={() => onPointClick(point)} className="cursor-pointer">
            {/* วงกลมสำหรับจุด */}
            <circle
              cx={point.x}
              cy={point.y}
              r="10"
              className="fill-blue-600 hover:fill-blue-700 transition-colors"
            />
          </g>
        ))}
      </svg>
    </div>
  );
};
