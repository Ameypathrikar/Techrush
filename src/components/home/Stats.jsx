import {
  FaMapMarkedAlt,
  FaUsers,
  FaSuitcaseRolling,
  FaStar,
} from "react-icons/fa";

const stats = [
  {
    id: 1,
    icon: <FaMapMarkedAlt />,
    number: "120+",
    label: "Destinations",
    color: "from-cyan-500 to-blue-500",
  },
  {
    id: 2,
    icon: <FaUsers />,
    number: "50K+",
    label: "Happy Travelers",
    color: "from-pink-500 to-purple-500",
  },
  {
    id: 3,
    icon: <FaSuitcaseRolling />,
    number: "500+",
    label: "Trips Planned",
    color: "from-green-500 to-emerald-500",
  },
  {
    id: 4,
    icon: <FaStar />,
    number: "4.9",
    label: "Average Rating",
    color: "from-orange-400 to-yellow-500",
  },
];

export default function Stats() {
  return (
    <section className="bg-slate-50 py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((item) => (
            <div
              key={item.id}
              className="rounded-3xl bg-white p-8 shadow-lg transition hover:-translate-y-2 hover:shadow-xl"
            >
              <div
                className={`mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r ${item.color} text-3xl text-white`}
              >
                {item.icon}
              </div>

              <h2 className="text-5xl font-bold text-slate-900">
                {item.number}
              </h2>

              <p className="mt-3 text-slate-500">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}