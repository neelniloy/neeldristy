
import { TimelineItem, LoveReason } from './types';

export const WIFE_NAME = "Dristy"; 
export const HUSBAND_NAME = "Niloy";
export const CURRENT_YEAR = new Date().getFullYear();

/**
 * PHOTO GALLERY:
 * Using reliable Unsplash placeholders. 
 * To use your own, upload to ImgBB.com and replace these URLs with the "Direct Link".
 */
export const IMAGE_ASSETS = {
  // Hero & Timeline
  HERO_BG: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&q=80&w=1200",
  FIRST_CHATTING: "https://res.cloudinary.com/dh0p4xl59/image/upload/v1770916640/first_chat_cmru4t.jpg?auto=format&fit=crop&q=80&w=800",
  FIRST_MEETING: "https://res.cloudinary.com/dh0p4xl59/image/upload/v1770916640/first_meeting_wlgaha.jpg?auto=format&fit=crop&q=80&w=800",
  DIGITAL_CONNECTION: "https://res.cloudinary.com/dh0p4xl59/image/upload/v1770916641/photo_2026-02-12_22-14-31_w9poqr.jpg?auto=format&fit=crop&q=80&w=800",
  WEDDING_DAY: "https://res.cloudinary.com/dh0p4xl59/image/upload/v1770916645/photo_2026-02-12_22-14-05_svvvq8.jpg?auto=format&fit=crop&q=80&w=800",
  ENGAGEMENT: "https://res.cloudinary.com/dh0p4xl59/image/upload/v1770923517/photo_2026-02-13_00-57-12_t6x5lp.jpg?auto=format&fit=crop&q=80&w=800", // TODO: Replace with your engagement photo!

  // 13 Reasons
  REASON_1: "https://res.cloudinary.com/dh0p4xl59/image/upload/v1770916643/photo_2026-02-12_22-14-13_esubju.jpg?auto=format&fit=crop&q=80&w=600",
  REASON_2: "https://res.cloudinary.com/dh0p4xl59/image/upload/v1770916643/photo_2026-02-12_22-14-18_vzgvcl.jpg?auto=format&fit=crop&q=80&w=600",
  REASON_3: "https://res.cloudinary.com/dh0p4xl59/image/upload/v1770916643/photo_2026-02-12_22-14-15_kqtq9i.jpg?auto=format&fit=crop&q=80&w=600",
  REASON_4: "https://res.cloudinary.com/dh0p4xl59/image/upload/v1770916642/photo_2026-02-12_22-14-43_xbjqpi.jpg?auto=format&fit=crop&q=80&w=600",
  REASON_5: "https://res.cloudinary.com/dh0p4xl59/image/upload/v1770917848/photo_2026-02-12_23-36-17_zsusn6.jpg?auto=format&fit=crop&q=80&w=600",
  REASON_6: "https://res.cloudinary.com/dh0p4xl59/image/upload/v1770916642/photo_2026-02-12_22-14-37_oxokep.jpg?auto=format&fit=crop&q=80&w=600",
  REASON_7: "https://res.cloudinary.com/dh0p4xl59/image/upload/v1770916643/photo_2026-02-12_22-14-10_wjbxsz.jpg?auto=format&fit=crop&q=80&w=600",
  REASON_8: "https://res.cloudinary.com/dh0p4xl59/image/upload/v1770916641/photo_2026-02-12_22-14-49_ejx2ju.jpg?auto=format&fit=crop&q=80&w=600",
  REASON_9: "https://res.cloudinary.com/dh0p4xl59/image/upload/v1770916643/photo_2026-02-12_22-14-24_t4ta6d.jpg?auto=format&fit=crop&q=80&w=600",
  REASON_10: "https://res.cloudinary.com/dh0p4xl59/image/upload/v1770916641/photo_2026-02-12_22-14-27_enud3p.jpg?auto=format&fit=crop&q=80&w=600",
  REASON_11: "https://res.cloudinary.com/dh0p4xl59/image/upload/v1770917847/photo_2026-02-12_23-36-22_nv8sd4.jpg?auto=format&fit=crop&q=80&w=600",
  REASON_12: "https://res.cloudinary.com/dh0p4xl59/image/upload/v1770916642/photo_2026-02-12_22-14-34_r6ng1y.jpg?auto=format&fit=crop&q=80&w=600",
  REASON_13: "https://res.cloudinary.com/dh0p4xl59/image/upload/v1770917849/photo_2026-02-12_23-36-20_gblaae.jpg?auto=format&fit=crop&q=80&w=600",
};

export const FALLBACK_IMAGES = {
  ROMANTIC: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&q=80&w=800",
  WEDDING: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800",
  TRAVEL: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800",
  CHAT: "https://images.unsplash.com/photo-1516733725897-1aa73b87c8e8?auto=format&fit=crop&q=80&w=800"
};

export const TIMELINE_DATA: TimelineItem[] = [
  {
    year: "September 1, 2020",
    title: "The First Spark",
    description: "In a world of billions, our paths finally crossed. A simple message turned into hours of talking, and I knew from that very first night that you were different.",
    icon: "✨",
    image: IMAGE_ASSETS.FIRST_CHATTING
  },
  {
    year: "July 16, 2021",
    title: "From Screen to Reality",
    description: "The moment I saw you in person, everything changed. No more pixels, just your beautiful smile right in front of me. It was the best day of my life.",
    icon: "💖",
    image: IMAGE_ASSETS.FIRST_MEETING
  },
  {
    year: "2021 - 2025",
    title: "Building Our World",
    description: "Years of growth, endless video calls, and unwavering support. We built a foundation of trust and love that was strong enough to bridge any distance.",
    icon: "🏗️",
    image: IMAGE_ASSETS.DIGITAL_CONNECTION
  },
  {
    year: "July 4, 2025",
    title: "She Said Yes!",
    description: "The moment I asked you to be mine forever, and you said yes. Our engagement was the promise of a lifetime — the beginning of our happily ever after.",
    icon: "💍",
    image: IMAGE_ASSETS.ENGAGEMENT
  },
  {
    year: "December 5, 2025",
    title: "Our Forever Begins",
    description: "The day we promised our lives to one another. Hand in hand, we stepped into our future as husband and wife. My greatest honor is being yours.",
    icon: "💍",
    image: IMAGE_ASSETS.WEDDING_DAY
  }
];

export const LOVE_REASONS: LoveReason[] = [
  { id: 1, text: "The way you smile with your whole face, lighting up even my darkest days.", image: IMAGE_ASSETS.REASON_1 },
  { id: 2, text: "How you always see the best in me, even when I can't see it myself.", image: IMAGE_ASSETS.REASON_2 },
  { id: 3, text: "The kindness you show to everyone you meet—your heart is truly pure.", image: IMAGE_ASSETS.REASON_3 },
  { id: 4, text: "How we can talk for hours about everything and nothing at all.", image: IMAGE_ASSETS.REASON_4 },
  { id: 5, text: "Your incredible strength and the way you handle life's challenges with grace.", image: IMAGE_ASSETS.REASON_5 },
  { id: 6, text: "The way you hold my hand, making me feel like I can conquer the world.", image: IMAGE_ASSETS.REASON_6 },
  { id: 7, text: "How you know exactly what I'm thinking just by looking at me.", image: IMAGE_ASSETS.REASON_7 },
  { id: 8, text: "The sound of your laughter—it's my favorite song in the whole world.", image: IMAGE_ASSETS.REASON_8 },
  { id: 9, text: "Your intelligence and the way you always challenge me to grow.", image: IMAGE_ASSETS.REASON_9 },
  { id: 10, text: "The peace and comfort I feel just being in your presence.", image: IMAGE_ASSETS.REASON_10 },
  { id: 11, text: "How you've supported my dreams since the very first day we met.", image: IMAGE_ASSETS.REASON_11 },
  { id: 12, text: "The way you've made me a better man just by being yourself.", image: IMAGE_ASSETS.REASON_12 },
  { id: 13, text: "Because you are Dristy, and my life only makes sense with you in it.", image: IMAGE_ASSETS.REASON_13 }
];
