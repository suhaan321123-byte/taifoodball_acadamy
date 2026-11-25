import trainer1 from "@/assets/ourteam/sinan pp.jpeg";
import trainer2 from "@/assets/ourteam/akshay kv.jpeg";
import trainer3 from "@/assets/ourteam/ajayshankar.jpeg";
import trainer4 from "@/assets/ourteam/farzin.jpeg";

type ImportedImage = string | { src: string };

function imageSrc(image: ImportedImage): string {
  return typeof image === "string" ? image : image.src;
}

export const certifications = [
  "All India Football Federation",
  "AFC Grassroots Charter",
  "UEFA Coaching Pathway",
  "State Sports Authority",
];

export type Trainer = {
  name: string;
  role: string;
  number: string;
  bio: string;
  image: string;
};

export const trainers: Trainer[] = [
  {
    name: "Marcus Thorne",
    role: "Technical Lead",
    number: "07",
    bio: "UEFA Pro licence holder with fourteen years in professional youth development.",
    image: imageSrc(trainer1),
  },
  {
    name: "Elena Ruiz",
    role: "Elite S&C Specialist",
    number: "12",
    bio: "Strength and conditioning lead, MSc in Sports Science, former national team physio.",
    image: imageSrc(trainer2),
  },
  {
    name: "Dr. Aris Varma",
    role: "Youth Performance",
    number: "24",
    bio: "Oversees load management, tactical analysis and long-term athlete development.",
    image: imageSrc(trainer3),
  },
  {
    name: "Kaito Taki",
    role: "Ball Mastery Coach",
    number: "31",
    bio: "Futsal specialist focused on close control, first touch and one-v-one execution.",
    image: imageSrc(trainer4),
  },
];

export type Course = {
  level: string;
  title: string;
  price: string;
  duration: string;
  description: string;
  includes: string[];
};

export const courses: Course[] = [
  {
    level: "Level 01",
    title: "Foundation Technical",
    price: "₹4,500 / month",
    duration: "Ages 8–12 · 3 sessions per week",
    description:
      "Fundamental ball mastery, coordination and spatial awareness for young players entering structured football.",
    includes: [
      "Ball mastery and first-touch blocks",
      "Small-sided game intelligence",
      "Termly written progress report",
    ],
  },
  {
    level: "Level 02",
    title: "Advanced Tactical",
    price: "₹7,200 / month",
    duration: "Ages 13–16 · 4 sessions per week",
    description:
      "Positional discipline, transition speed and decision making under pressure with weekly video review.",
    includes: [
      "Positional play and pressing structures",
      "Thursday video analysis session",
      "Strength and conditioning programme",
    ],
  },
  {
    level: "Level 03",
    title: "Elite Pro Pathway",
    price: "₹11,000 / month",
    duration: "Ages 17–21 · 6 sessions per week",
    description:
      "Full professional environment simulation with scout visibility, match load management and individual plans.",
    includes: [
      "Individual development plan per player",
      "Scout and trial exposure",
      "Nutrition and recovery support",
    ],
  },
];
