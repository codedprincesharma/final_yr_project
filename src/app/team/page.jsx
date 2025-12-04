"use client";
import { Linkedin } from "lucide-react";

const team = [
  {
    name: "Deepak Kumar",
    placedin: "Cognizant",
    img: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e",
    linkedin: "#",
  },
  {
    name: "Aman Kumar",
    placedin: "Capigimini",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
    linkedin: "#",
  },
  {
    name: "Bibhuti Vishal",
    placedin: "Coming soon",
    img: "bibhuti_img.jpg",
    linkedin: "#",
  },
  {
    name: "Satyam Kumar",
    placedin: "Infosys",
    img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
    linkedin: "#",
  },
  // {
  //   name: "Neha Gupta",
  //   role: "Design Lead",
  //   img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
  //   linkedin: "#",
  // },
  // {
  //   name: "Kunal Verma",
  //   role: "Management Lead",
  //   img: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91",
  //   linkedin: "#",
  // },
];

export default function TeamPage() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-24">
      {/* Title */}
      <h1 className="text-center text-5xl md:text-6xl font-extrabold mb-14">
        Meet Our{" "}
        <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
          Core Team
        </span>
      </h1>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
        {team.map((member, i) => (
          <div
            key={i}
            className="group rounded-3xl p-6 bg-white/10 backdrop-blur-xl border border-white/10 shadow-xl hover:shadow-blue-500/20 transition-all hover:-translate-y-3"
          >
            {/* Image */}
            <div className="relative overflow-hidden rounded-2xl mb-6">
              <img
                src={member.img}
                alt={member.name}
                className="w-full h-64 object-cover rounded-2xl group-hover:scale-105 transition-all duration-300"
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>

            {/* Info */}
            <h3 className="text-2xl font-bold">{member.name}</h3>
            <p className="text-blue-300 mb-4">{member.role}</p>

            {/* Social Icons */}
            <div className="flex gap-4 mt-2">
              <a
                href={member.linkedin}
                className="p-3 bg-white/10 rounded-xl hover:bg-white/20 transition"
              >
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
