import Link from "next/link";
import {
  ArrowLeft,
  Users,
  ClipboardList,
  FolderKanban,
  Trophy,
  Check,
  ChevronDown,
} from "lucide-react";
import StudentGradesTable from "../components/StudentGradesTable";

const gradingItems = [
  {
    component: "Kehadiran & Partisipasi",
    weight: "10%",
    icon: Users,
    iconClass: "bg-blue-50 text-blue-600",
    badgeClass: "bg-blue-50 text-blue-700",
  },
  {
    component: "Tugas Mingguan",
    weight: "20%",
    icon: ClipboardList,
    iconClass: "bg-emerald-50 text-emerald-600",
    badgeClass: "bg-emerald-50 text-emerald-700",
  },
  {
    component: "Midterm Project/UTS",
    weight: "30%",
    icon: FolderKanban,
    iconClass: "bg-amber-50 text-amber-600",
    badgeClass: "bg-amber-50 text-amber-700",
  },
  {
    component: "Final Project/UAS",
    weight: "40%",
    icon: Trophy,
    iconClass: "bg-violet-50 text-violet-600",
    badgeClass: "bg-violet-50 text-violet-700",
  },
];

export default function GradingPage() {
  const kelasPagiStudents = [
    {
      nim: "240212004",
      name: "Nitajul Khaira",
      attendance: [
        true,
        true,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
      ],
      exercises: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    {
      nim: "240212012",
      name: "Zahratul Jannah",
      attendance: [
        true,
        true,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
      ],
      exercises: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    {
      nim: "240212016",
      name: "Hanifah Mawaddah",
      attendance: [
        true,
        true,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
      ],
      exercises: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    {
      nim: "240212022",
      name: "Nabila Zahwa",
      attendance: [
        false,
        true,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
      ],
      exercises: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    {
      nim: "240212024",
      name: "Rahmayani Isma",
      attendance: [
        true,
        true,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
      ],
      exercises: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    
    {
      nim: "240212046",
      name: "Salsabila Nasywa",
      attendance: [
        true,
        true,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
      ],
      exercises: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    {
      nim: "240212051",
      name: "Faizul Haq",
      attendance: [
        false,
        true,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
      ],
      exercises: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    {
      nim: "240212064",
      name: "Salwa Salsabila",
      attendance: [
        false,
        true,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
      ],
      exercises: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    {
      nim: "240212070",
      name: "Rifal Ismanda",
      attendance: [
        false,
        true,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
      ],
      exercises: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    
    {
      nim: "240212072",
      name: "Ika Desi",
      attendance: [
        true,
        true,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
      ],
      exercises: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    {
      nim: "240212076",
      name: "Fatimah Azzuhra",
      attendance: [
        true,
        true,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
      ],
      exercises: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    {
      nim: "240212084",
      name: "Raja Mulia",
      attendance: [
        false,
        true,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
      ],
      exercises: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    {
      nim: "240212085",
      name: "Ilham Ramadhan",
      attendance: [
        true,
        true,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
      ],
      exercises: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    {
      nim: "240212086",
      name: "Diva Darmila",
      attendance: [
        true,
        true,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
      ],
      exercises: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    {
      nim: "240212091",
      name: "Muhammad Fadil",
      attendance: [
        false,
        true,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
      ],
      exercises: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    {
      nim: "240212092",
      name: "Suci Widia Rizki",
      attendance: [
        false,
        true,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
      ],
      exercises: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    {
      nim: "240212096",
      name: "Muhammad Afdhalul Zikri",
      attendance: [
        false,
        true,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
      ],
      exercises: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    {
      nim: "240212099",
      name: "Wulan Eri Munirah",
      attendance: [
        false,
        true,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
      ],
      exercises: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    {
      nim: "240212104",
      name: "Al Hadi",
      attendance: [
        true,
        true,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
      ],
      exercises: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    {
      nim: "240212106",
      name: "Riza M Ferisa",
      attendance: [
        false,
        true,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
      ],
      exercises: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    {
      nim: "240212131",
      name: "Muhammad Aldi",
      attendance: [
        false,
        true,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
      ],
      exercises: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
  ];

  const kelasSiangStudents = [
    {
      nim: "220212021",
      name: "Fadhlun",
      attendance: [
        true,
        true,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
      ],
      exercises: [10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    {
      nim: "230212107",
      name: "Alwin Rizki",
      attendance: [
        false,
        true,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
      ],
      exercises: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    {
      nim: "240212003",
      name: "Rizqia Safira Putri",
      attendance: [
        true,
        true,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
      ],
      exercises: [10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    {
      nim: "240212005",
      name: "Humaira Izza",
      attendance: [
        false,
        true,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
      ],
      exercises: [10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    {
      nim: "240212009",
      name: "Alifi Luthfir Rahman",
      attendance: [
        false,
        true,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
      ],
      exercises: [10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    {
      nim: "240212011",
      name: "Annisa",
      attendance: [
        true,
        true,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
      ],
      exercises: [10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    {
      nim: "240212014",
      name: "Nur Wasida",
      attendance: [
        true,
        true,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
      ],
      exercises: [10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    {
      nim: "240212023",
      name: "Nepisa Eviana",
      attendance: [
        true,
        true,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
      ],
      exercises: [10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    {
      nim: "240212035",
      name: "Aqlima",
      attendance: [
        false,
        true,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
      ],
      exercises: [10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    {
      nim: "240212039",
      name: "Masjuanda",
      attendance: [
        true,
        true,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
      ],
      exercises: [10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    {
      nim: "240212047",
      name: "Maulidar",
      attendance: [
        true,
        true,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
      ],
      exercises: [10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    {
      nim: "240212048",
      name: "Isra Safriani",
      attendance: [
        true,
        true,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
      ],
      exercises: [10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    {
      nim: "240212054",
      name: "Dzaki Aulia Pasya",
      attendance: [
        true,
        true,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
      ],
      exercises: [10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    {
      nim: "240212083",
      name: "Muyassir Farisi",
      attendance: [
        true,
        true,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
      ],
      exercises: [10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    {
      nim: "240212088",
      name: "Humaira Balqis",
      attendance: [
        true,
        true,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
      ],
      exercises: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    {
      nim: "240212102",
      name: "Jazil Mubarak",
      attendance: [
        false,
        true,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
      ],
      exercises: [10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    {
      nim: "240212108",
      name: "Ahqiyar",
      attendance: [
        true,
        true,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
      ],
      exercises: [10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    {
      nim: "240212111",
      name: "Sultan Syahbanta",
      attendance: [
        false,
        true,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
      ],
      exercises: [10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    {
      nim: "240212119",
      name: "Harianto",
      attendance: [
        true,
        true,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
      ],
      exercises: [10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    {
      nim: "250212802",
      name: "Vernanda Setiawan",
      attendance: [
        false,
        true,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
      ],
      exercises: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    {
      nim: "250212803",
      name: "M Taufiqurrahman",
      attendance: [
        false,
        true,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
      ],
      exercises: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
  ];

  return (
    <div className="mx-auto max-w-3xl px-6 py-12 md:py-20">
      <Link
        href="/course"
        className="mb-10 inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition-colors hover:text-black"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Course Sessions
      </Link>

      <header className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-black md:text-5xl">
          Uraian Grading
        </h1>
        <p className="mt-3 max-w-2xl text-gray-600">
          Detail nilai mahasiswa dan bobot komponen grading.
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-gray-500">
          <span className="inline-flex items-center gap-1.5">
            <Check strokeWidth={3.5} className="h-4 w-4 text-green-600" />
            Hadir / Tugas dikumpul
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="text-gray-300">—</span>
            Belum hadir / belum dikumpul
          </span>
          <span className="inline-flex items-center gap-1.5">
            <ChevronDown className="h-3.5 w-3.5 text-gray-400" />
            Klik baris untuk detail
          </span>
        </div>
      </header>

      <section className="mb-14">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-lg font-semibold text-black md:text-xl">
            Grade - Kelas Pagi
          </h2>
          <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
            {kelasPagiStudents.length} mahasiswa
          </span>
        </div>
        <StudentGradesTable students={kelasPagiStudents} />
      </section>

      <section className="mb-14">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-lg font-semibold text-black md:text-xl">
            Grade - Kelas Siang
          </h2>
          <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
            {kelasSiangStudents.length} mahasiswa
          </span>
        </div>
        <StudentGradesTable students={kelasSiangStudents} />
      </section>

      <section>
        <h2 className="mb-6 text-2xl font-bold tracking-tight text-black md:text-3xl">
          Komponen Grading
        </h2>
        <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm">
          <table className="w-full table-fixed text-left">
            <thead>
              <tr className="bg-gray-100/80">
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
                  className="group border-t border-gray-100 transition-colors hover:bg-gray-50"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <span
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${item.iconClass}`}
                      >
                        <item.icon className="h-4 w-4" />
                      </span>
                      <div>
                        <p className="text-sm font-medium text-gray-800">
                          {item.component}
                        </p>
                        <p className="text-xs text-gray-400">
                          Bobot {item.weight} dari total nilai
                        </p>
                      </div>
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
              <tr className="border-t border-gray-100 bg-gray-50">
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
      </section>
    </div>
  );
}
