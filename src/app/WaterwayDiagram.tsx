"use client";

import React from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

interface Point {
  id: string;
  name: string;
  description: string;
  waterLevel: string;
  flowRate: string;
  x: number;
  y: number;
}

interface WaterwayDiagramProps {
  onPointClick: (point: Point) => void;
}

// Zoom Controls Component
const ZoomControls: React.FC<{
  zoomIn: () => void;
  zoomOut: () => void;
  resetTransform: () => void;
}> = ({ zoomIn, zoomOut, resetTransform }) => (
  <div className="absolute top-4 right-4 flex space-x-2 z-10">
    <button
      onClick={zoomIn}
      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
    >
      +
    </button>
    <button
      onClick={zoomOut}
      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
    >
      -
    </button>
    <button
      onClick={resetTransform}
      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
    >
      Reset
    </button>
  </div>
);

// Arrows Component
const Arrows: React.FC<{ arrows: { x: number; y: number; direction: string }[] }> = ({ arrows }) => (
  <g id="Arrows">
    {arrows.map((arrow, index) => {
      const isUp = arrow.direction === 'up';
      const isRight = arrow.direction === 'right';
      return (
        <g
          key={index}
          className={
            isUp
              ? 'animate-flow-up'
              : isRight
              ? 'animate-flow-right'
              : 'animate-flow-down'
          }
        >
          <polygon
            className="fill-white"
            points={
              isUp
                ? `
                  ${arrow.x + 4},${arrow.y + 22} 
                  ${arrow.x + 5.3},${arrow.y + 16.3} 
                  ${arrow.x + 4},${arrow.y + 16.3} 
                  ${arrow.x + 4},${arrow.y} 
                  ${arrow.x},${arrow.y} 
                  ${arrow.x},${arrow.y + 16.3} 
                  ${arrow.x - 1.3},${arrow.y + 16.3}
                `
                : isRight
                ? `
                  ${arrow.x},${arrow.y} 
                  ${arrow.x + 16.3},${arrow.y} 
                  ${arrow.x + 16.3},${arrow.y - 1.3} 
                  ${arrow.x + 22},${arrow.y + 2} 
                  ${arrow.x + 16.3},${arrow.y + 5.3} 
                  ${arrow.x + 16.3},${arrow.y + 4} 
                  ${arrow.x},${arrow.y + 4}
                `
                : `
                  ${arrow.x},${arrow.y} 
                  ${arrow.x},${arrow.y + 16.3} 
                  ${arrow.x - 1.3},${arrow.y + 16.3} 
                  ${arrow.x + 2},${arrow.y + 22} 
                  ${arrow.x + 5.3},${arrow.y + 16.3} 
                  ${arrow.x + 4},${arrow.y + 16.3} 
                  ${arrow.x + 4},${arrow.y}
                `
            }
          />
        </g>
      );
    })}
  </g>
);

// Points Component
const Points: React.FC<{
  points: Point[];
  onPointClick: (point: Point) => void;
}> = ({ points, onPointClick }) => (
  <>
    {points.map((point) => (
      <g key={point.id} onClick={() => onPointClick(point)} className="cursor-pointer group">
        <circle
          cx={point.x}
          cy={point.y}
          r="10"
          className="fill-blue-600 hover:fill-blue-700 transition-colors"
        />
        <text
          x={point.x + 15}
          y={point.y - 10}
          className="hidden group-hover:block text-sm font-medium text-blue-900 fill-current"
        >
          {point.name}
        </text>
      </g>
    ))}
  </>
);

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

  const arrows = [
    { x: 310, y: 150, direction: 'down' },
    { x: 310, y: 198, direction: 'right' },
    { x: 400, y: 198, direction: 'right' },
    { x: 500, y: 200, direction: 'down' },
    { x: 500, y: 290, direction: 'down' },
    { x: 500, y: 400, direction: 'down' },
    { x: 500, y: 500, direction: 'down' },
    { x: 500, y: 600, direction: 'down' },
    { x: 500, y: 700, direction: 'down' },
    { x: 500, y: 800, direction: 'down' },
  ];

  return (
    <div className="w-full h-full flex justify-center items-center p-4">
      <TransformWrapper
        initialScale={1}
        minScale={0.5}
        maxScale={3}
        centerOnInit
        wheel={{ step: 0.1 }}
      >
        {({ zoomIn, zoomOut, resetTransform }) => (
          <>
            <ZoomControls zoomIn={zoomIn} zoomOut={zoomOut} resetTransform={resetTransform} />
            <TransformComponent
              wrapperStyle={{
                width: '100%',
                height: '100%',
                maxWidth: '1024px',
              }}
              contentStyle={{
                width: '100%',
                height: 'auto',
              }}
            >
              <svg
                viewBox="0 0 1000 1000"
                className="w-full h-auto border rounded-lg bg-blue-50 shadow-lg"
                preserveAspectRatio="xMidYMid meet"
              >
                <image
                  href="/ChaoPhrayaWaterDiagram.png"
                  width="1000"
                  height="1000"
                  preserveAspectRatio="xMidYMid meet"
                  opacity="0.9"
                />
                <Arrows arrows={arrows} />
                <Points points={points} onPointClick={onPointClick} />
              </svg>
            </TransformComponent>
          </>
        )}
      </TransformWrapper>
    </div>
  );
};