import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import StudentGradesTable from '../components/StudentGradesTable';

const gradingItems = [
  { component: 'Kehadiran & Partisipasi', weight: '10%' },
  { component: 'Tugas Mingguan', weight: '20%' },
  { component: 'Midterm Project/UTS', weight: '30%' },
  { component: 'Final Project/UAS', weight: '40%' },
];

export default function GradingPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12 md:py-20">
      <Link
        href="/course"
        className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition-colors hover:text-black"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Course Sessions
      </Link>

      <h1 className="mb-2 text-4xl font-bold tracking-tight text-black md:text-5xl">
        Uraian Grading 
      </h1>
      <p className="mb-10 text-gray-600">
        Course grade ditentukan oleh.
      </p>

      <div className="overflow-hidden rounded-xl border border-gray-200">
        <table className="w-full table-fixed text-left">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="w-4/5 px-6 py-4 text-sm font-semibold text-black">
                Component
              </th>
              <th className="w-1/5 px-6 py-4 text-right text-sm font-semibold text-black">
                Bobot
              </th>
            </tr>
          </thead>
          <tbody>
            {gradingItems.map((item) => (
              <tr
                key={item.component}
                className="border-b border-gray-100 last:border-b-0"
              >
                <td className="px-6 py-4 text-sm text-gray-700">
                  {item.component}
                </td>
                <td className="px-6 py-4 text-right text-sm font-medium text-black">
                  {item.weight}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-gray-50">
              <td className="px-6 py-4 text-sm font-semibold text-black">
                Total
              </td>
              <td className="px-6 py-4 text-right text-sm font-semibold text-black">
                100%
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div className="mt-14">
        <h2 className="mb-6 text-2xl font-bold tracking-tight text-black md:text-3xl">
          Grade 
        </h2>
        <StudentGradesTable />
      </div>
    </div>
  );
}
