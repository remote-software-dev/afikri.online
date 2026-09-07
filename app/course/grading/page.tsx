import Link from 'next/link';
import { ArrowLeft, Users, ClipboardList, FolderKanban, Trophy } from 'lucide-react';
import StudentGradesTable from '../components/StudentGradesTable';

const gradingItems = [
  {
    component: 'Kehadiran & Partisipasi',
    weight: '10%',
    icon: Users,
    iconClass: 'bg-blue-50 text-blue-600',
    badgeClass: 'bg-blue-50 text-blue-700',
  },
  {
    component: 'Tugas Mingguan',
    weight: '20%',
    icon: ClipboardList,
    iconClass: 'bg-emerald-50 text-emerald-600',
    badgeClass: 'bg-emerald-50 text-emerald-700',
  },
  {
    component: 'Midterm Project/UTS',
    weight: '30%',
    icon: FolderKanban,
    iconClass: 'bg-amber-50 text-amber-600',
    badgeClass: 'bg-amber-50 text-amber-700',
  },
  {
    component: 'Final Project/UAS',
    weight: '40%',
    icon: Trophy,
    iconClass: 'bg-violet-50 text-violet-600',
    badgeClass: 'bg-violet-50 text-violet-700',
  },
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

      <div className="overflow-hidden rounded-xl">
        <table className="w-full table-fixed text-left">
          <thead>
            <tr className="bg-gray-50">
              <th className="w-4/5 px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                Component
              </th>
              <th className="w-1/5 px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                Bobot
              </th>
            </tr>
          </thead>
          <tbody>
            {gradingItems.map((item) => (
              <tr
                key={item.component}
                className="group transition-colors hover:bg-gray-50"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${item.iconClass}`}
                    >
                      <item.icon className="h-4 w-4" />
                    </span>
                    <span className="text-sm font-medium text-gray-800">
                      {item.component}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <span
                    className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${item.badgeClass}`}
                  >
                    {item.weight}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-gray-50">
              <td className="px-6 py-4 text-sm font-semibold text-black">
                Total
              </td>
              <td className="px-6 py-4 text-right">
                <span className="inline-block rounded-full bg-black px-3 py-1 text-xs font-bold text-white">
                  100%
                </span>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/*
      <div className="mt-14">
        <h2 className="mb-6 text-2xl font-bold tracking-tight text-black md:text-3xl">
          Grade - Kelas Pagi
        </h2>
        <StudentGradesTable />
      </div>
      */}

      <div className="mt-14">
        <h2 className="mb-6 text-2xl font-bold tracking-tight text-black md:text-3xl">
          Grade - Kelas Siang
        </h2>
        <StudentGradesTable />
      </div>
    </div>
  );
}
