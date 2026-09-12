'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface Student {
  nim: string;
  name: string;
  exercises?: number[];
}

const defaultExercises = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

function formatScore(score: number) {
  return score.toFixed(1);
}

export default function StudentGradesTable({
  students = [],
  graded = false,
}: {
  students?: Student[];
  graded?: boolean;
}) {
  const [expandedNim, setExpandedNim] = useState<string | null>(null);

  const toggleRow = (nim: string) => {
    setExpandedNim((prev) => (prev === nim ? null : nim));
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
          {students.map((student, index) => {
            const exercises = student.exercises ?? defaultExercises;
            const total = exercises.reduce((a, b) => a + b, 0);
            const average = total / exercises.length;
            const isExpanded = expandedNim === student.nim;

            return (
              <FragmentRow
                key={student.nim}
                student={student}
                rowNumber={index + 1}
                exercises={exercises}
                graded={graded}
                average={average}
                isExpanded={isExpanded}
                onToggle={() => toggleRow(student.nim)}
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
  rowNumber,
  exercises,
  graded,
  average,
  isExpanded,
  onToggle,
}: {
  student: Student;
  rowNumber: number;
  exercises: number[];
  graded: boolean;
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
          {rowNumber}
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
                  {student.name} - Kehadiran &amp; Nilai
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-center leading-tight">
                    <thead>
                      <tr>
                        <th className="w-8 whitespace-nowrap border-r border-gray-100 px-1 py-0.5 text-[10px] font-semibold text-gray-400">
                          Sesi
                        </th>
                        {exercises.map((_, index) => (
                          <th
                            key={index}
                            className="whitespace-nowrap px-1.5 py-0.5 text-[10px] font-semibold text-gray-500"
                          >
                            S{index + 1}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-gray-100/50">
                        <th className="w-8 whitespace-nowrap border-r border-gray-100 px-1 py-0.5 text-[10px] font-semibold text-gray-500">
                          Kehadiran
                        </th>
                        {exercises.map((_, index) => (
                          <td
                            key={index}
                            className="whitespace-nowrap border-r border-gray-100 px-1.5 py-0.5 text-[11px] font-semibold leading-none text-gray-700 last:border-r-0"
                          >
                            {index === 0 ? '✅' : '—'}
                          </td>
                        ))}
                      </tr>
                    </tbody>
                    <thead>
                      <tr>
                        <th className="w-8 whitespace-nowrap border-r border-gray-100 px-1 py-0.5 text-[10px] font-semibold text-gray-400">
                          Latihan
                        </th>
                        {exercises.map((_, index) => (
                          <th
                            key={index}
                            className="whitespace-nowrap px-1.5 py-0.5 text-[10px] font-semibold text-gray-400"
                          >
                            X{index + 1}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th className="w-8 whitespace-nowrap border-r border-gray-100 px-1 py-0.5 text-[10px] font-semibold text-gray-500">
                          Nilai
                        </th>
                        {exercises.map((score, index) => (
                          <td
                            key={index}
                            className="whitespace-nowrap border-r border-gray-100 px-1.5 py-0.5 text-[11px] font-semibold leading-none text-gray-700 last:border-r-0"
                          >
                            {graded && index === 0 ? '✅' : score}
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
