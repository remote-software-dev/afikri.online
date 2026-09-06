'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface Student {
  id: number;
  nim: string;
  name: string;
  exercises: number[];
}

const students: Student[] = [
  {
    id: 1,
    nim: '2301001',
    name: 'Ahmad Fauzi',
    exercises: [85, 90, 78, 92, 88, 75, 95, 82, 79, 91, 86, 84, 88, 90, 85, 93],
  },
  {
    id: 2,
    nim: '2301002',
    name: 'Budi Santoso',
    exercises: [76, 82, 88, 85, 90, 74, 81, 86, 92, 78, 84, 89, 80, 87, 83, 91],
  },
  {
    id: 3,
    nim: '2301003',
    name: 'Citra Lestari',
    exercises: [92, 88, 95, 84, 90, 93, 87, 96, 85, 91, 94, 90, 88, 92, 95, 89],
  },
  {
    id: 4,
    nim: '2301004',
    name: 'Dewi Anggraini',
    exercises: [68, 72, 75, 80, 78, 70, 74, 77, 81, 79, 76, 82, 78, 75, 80, 84],
  },
  {
    id: 5,
    nim: '2301005',
    name: 'Eko Prasetyo',
    exercises: [88, 91, 84, 79, 86, 92, 89, 90, 93, 87, 85, 91, 88, 86, 90, 94],
  },
];

function formatScore(score: number) {
  return score.toFixed(1);
}

export default function StudentGradesTable() {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const toggleRow = (id: number) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm">
      <table className="w-full border-collapse text-left leading-tight">
        <thead>
          <tr className="bg-gray-100/80">
            <th className="w-10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-gray-500">
              No
            </th>
            <th className="px-3 py-1 text-xs font-semibold uppercase tracking-wide text-gray-500">
              NIM
            </th>
            <th className="px-3 py-1 text-xs font-semibold uppercase tracking-wide text-gray-500">
              Nama
            </th>
            <th className="px-3 py-1 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
              Rata-rata
            </th>
            <th className="w-10 px-3 py-1">
              <span className="sr-only">Expand</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => {
            const total = student.exercises.reduce((a, b) => a + b, 0);
            const average = total / student.exercises.length;
            const isExpanded = expandedId === student.id;

            return (
              <FragmentRow
                key={student.id}
                student={student}
                average={average}
                isExpanded={isExpanded}
                onToggle={() => toggleRow(student.id)}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function FragmentRow({
  student,
  average,
  isExpanded,
  onToggle,
}: {
  student: Student;
  average: number;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const rowClasses = `group cursor-pointer transition-colors ${
    isExpanded
      ? 'bg-blue-50/60'
      : 'border-b border-gray-100 hover:bg-gray-50'
  }`;

  return (
    <>
      <tr className={rowClasses} onClick={onToggle}>
        <td className="px-3 py-1 text-xs text-gray-600 leading-none">
          {student.id}
        </td>
        <td className="px-3 py-1 text-xs font-medium text-gray-800 leading-none">
          {student.nim}
        </td>
        <td className="px-3 py-1 text-xs text-gray-700 leading-none">
          {student.name}
        </td>
        <td className="px-3 py-1 text-right leading-none">
          <span
            className={`inline-block rounded px-1.5 py-0.5 text-[11px] font-semibold leading-none ${
              average >= 85
                ? 'bg-green-100 text-green-700'
                : average >= 75
                ? 'bg-amber-100 text-amber-700'
                : 'bg-red-100 text-red-700'
            }`}
          >
            {formatScore(average)}
          </span>
        </td>
        <td className="px-3 py-1 leading-none">
          <button
            type="button"
            aria-label={isExpanded ? 'Collapse' : 'Expand'}
            className={`flex h-4 w-4 items-center justify-center rounded-full transition-colors ${
              isExpanded
                ? 'text-blue-600'
                : 'text-gray-400 group-hover:text-gray-600'
            }`}
          >
            <ChevronDown
              className={`h-3 w-3 transition-transform duration-300 ${
                isExpanded ? 'rotate-180' : ''
              }`}
            />
          </button>
        </td>
      </tr>
      <tr className="border-b border-gray-100 last:border-b-0">
        <td colSpan={5} className="bg-gray-50 p-0">
          <div
            className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
              isExpanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
            }`}
          >
            <div className="overflow-hidden">
              <div className="px-4 py-1.5">
                <p className="mb-0.5 text-xs font-semibold leading-tight text-gray-700">
                  {student.name} - Exercise Grades
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-center leading-tight">
                    <thead>
                      <tr className="border-b border-gray-200 bg-gray-100/70">
                        {student.exercises.map((_, index) => (
                          <th
                            key={index}
                            className="whitespace-nowrap px-1.5 py-0.5 text-[10px] font-semibold text-gray-500"
                          >
                            X{index + 1}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        {student.exercises.map((score, index) => (
                          <td
                            key={index}
                            className="whitespace-nowrap border-r border-gray-100 px-1.5 py-0.5 text-[11px] font-semibold leading-none text-gray-700 last:border-r-0"
                          >
                            {score}
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </td>
      </tr>
    </>
  );
}
