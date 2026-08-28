import galleryImage1 from "@/assets/gallery/file_000000003b80820ba82be1a2b861313d.png";
import galleryImage2 from "@/assets/gallery/file_00000000b69c820b93ba9296a1097786.png";
import galleryImage3 from "@/assets/gallery/IMG-20240120-WA0010.jpg.jpeg";
import galleryImage4 from "@/assets/gallery/IMG-20240122-WA0035.jpg.jpeg";
import galleryImage5 from "@/assets/gallery/IMG-20250405-WA0008.jpg.jpeg";
import galleryImage6 from "@/assets/gallery/IMG-20250408-WA0008.jpg.jpeg";
import galleryImage7 from "@/assets/gallery/IMG-20250415-WA0022.jpg.jpeg";
import galleryImage8 from "@/assets/gallery/IMG-20250805-WA0004.jpg.jpeg";
import galleryImage9 from "@/assets/gallery/IMG_20240826_223150_399.webp";
import galleryImage10 from "@/assets/gallery/IMG_20240908_134256_631.webp";
import galleryImage11 from "@/assets/gallery/IMG_20240909_212807_985.webp";
import galleryImage12 from "@/assets/gallery/IMG_20251206_131641_741.jpg";
import galleryImage13 from "@/assets/gallery/IMG_7359.JPG.jpeg";
import news1 from "@/assets/IMG-20240120-WA0010.jpg.jpeg";
import news2 from "@/assets/IMG_20251206_131641_741.jpg";
import news3 from "@/assets/news-3.jpg";
import trainer1 from "@/assets/ourteam/sinan pp.jpeg";
import trainer2 from "@/assets/ourteam/akshay kv.jpeg";
import trainer3 from "@/assets/ourteam/ajayshankar.jpeg";
import trainer4 from "@/assets/ourteam/farzin.jpeg";

export const certifications = [
  "All India Football Federation",
  "AFC Grassroots Charter",
  "UEFA Coaching Pathway",
  "State Sports Authority",
];

export type NewsItem = {
  slug: string;
  category: string;
  date: string;
  title: string;
  excerpt: string;
  body: string[];
  image: string;
};

export const news: NewsItem[] = [
  {
    slug: "u19-regional-title",
    category: "Academy Updates",
    date: "12 Aug 2026",
    title: "U19 Squad Secures Regional Title in Clean Sweep",
    excerpt:
      "Our senior youth team delivered a tactical masterclass in the 3-0 final victory, finishing the campaign without a single defeat.",
    body: [
      "Tai Football Academy's U19 side lifted the regional shield on Sunday evening after a controlled 3-0 win, closing out a campaign of eleven wins and three draws.",
      "The midfield press that has become the academy's signature forced twenty-two turnovers inside the opposition half. Two of the three goals came directly from those regains.",
      "Head of Academy Marcus Thorne credited the double-session block introduced in pre-season: \"They earned this in January, in the cold, with nobody watching.\"",
    ],
    image: news1,
  },
  {
    slug: "new-head-of-training",
    category: "Coaching",
    date: "04 Aug 2026",
    title: "New Head of Training Arrives from La Liga Youth Setup",
    excerpt:
      "World-class technical drills and a positional-play philosophy join the academy curriculum from this term onward.",
    body: [
      "The academy has appointed a new Head of Training, joining directly from a La Liga club's youth department where she led the U16 technical programme for four seasons.",
      "Her arrival brings a rebuilt positional-play curriculum: smaller pitches, faster decisions, and a rondo progression that runs across every age group.",
      "Students in Levels 2 and 3 will see the new session structure from the first week of the term, with video review sessions added every Thursday.",
    ],
    image: news2,
  },
  {
    slug: "summer-trials-open",
    category: "Trials",
    date: "28 Jul 2026",
    title: "Summer Trials Open for the 2026–27 Intake",
    excerpt:
      "Applications are open for domestic and international students, including four full scholarship places.",
    body: [
      "Trials will run across three weekends, with separate assessment days for goalkeepers and outfield players.",
      "Each player is assessed on technical execution, decision speed, physical profile and coachability. Every attendee receives a written report within ten days.",
      "Four full scholarship places are available for the 2026–27 intake, funded by the academy's alumni programme.",
    ],
    image: news3,
  },
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
    image: trainer1,
  },
  {
    name: "Elena Ruiz",
    role: "Elite S&C Specialist",
    number: "12",
    bio: "Strength and conditioning lead, MSc in Sports Science, former national team physio.",
    image: trainer2,
  },
  {
    name: "Dr. Aris Varma",
    role: "Youth Performance",
    number: "24",
    bio: "Oversees load management, tactical analysis and long-term athlete development.",
    image: trainer3,
  },
  {
    name: "Kaito Taki",
    role: "Ball Mastery Coach",
    number: "31",
    bio: "Futsal specialist focused on close control, first touch and one-v-one execution.",
    image: trainer4,
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

export const galleryImages = [
  { src: galleryImage1, alt: "TAi Football Academy gallery image 01" },
  { src: galleryImage2, alt: "TAi Football Academy gallery image 02" },
  { src: galleryImage3, alt: "TAi Football Academy gallery image 03" },
  { src: galleryImage4, alt: "TAi Football Academy gallery image 04" },
  { src: galleryImage5, alt: "TAi Football Academy gallery image 05" },
  { src: galleryImage6, alt: "TAi Football Academy gallery image 06" },
  { src: galleryImage7, alt: "TAi Football Academy gallery image 07" },
  { src: galleryImage8, alt: "TAi Football Academy gallery image 08" },
  { src: galleryImage9, alt: "TAi Football Academy gallery image 09" },
  { src: galleryImage10, alt: "TAi Football Academy gallery image 10" },
  { src: galleryImage11, alt: "TAi Football Academy gallery image 11" },
  { src: galleryImage12, alt: "TAi Football Academy gallery image 12" },
  { src: galleryImage13, alt: "TAi Football Academy gallery image 13" },
];
