export interface Game {
  id: string;
  title: string;
  imageUri: string;
  originalPrice: number;
  discountedPrice?: number;
  discountPercentage?: number;
  platforms: string[];
  featured?: boolean;
}

export const gamesData: Game[] = [
  {
    id: "1",
    title: "Dead by Daylight",
    imageUri: "https://cdn.akamai.steamstatic.com/steam/apps/381210/header.jpg",
    originalPrice: 18,
    discountedPrice: 5,
    discountPercentage: 70,
    platforms: ["Windows"],
    featured: true,
  },
  {
    id: "2",
    title: "Grand Theft Auto V",
    imageUri: "https://cdn.akamai.steamstatic.com/steam/apps/271590/header.jpg",
    originalPrice: 20,
    discountedPrice: 10,
    discountPercentage: 50,
    platforms: ["Windows"],
  },
  {
    id: "3",
    title: "Battlefield 4",
    imageUri:
      "https://cdn.akamai.steamstatic.com/steam/apps/1238860/header.jpg",
    originalPrice: 35,
    platforms: ["Windows"],
  },
  {
    id: "4",
    title: "Factorio",
    imageUri: "https://cdn.akamai.steamstatic.com/steam/apps/427520/header.jpg",
    originalPrice: 7,
    platforms: ["Windows", "Mac"],
  },
  {
    id: "5",
    title: "Horizon Zero Dawn",
    imageUri:
      "https://cdn.akamai.steamstatic.com/steam/apps/1151640/header.jpg",
    originalPrice: 38,
    platforms: ["Windows"],
  },
  {
    id: "6",
    title: "Cyberpunk 2077",
    imageUri:
      "https://cdn.akamai.steamstatic.com/steam/apps/1091500/header.jpg",
    originalPrice: 60,
    discountedPrice: 30,
    discountPercentage: 50,
    platforms: ["Windows"],
  },
  {
    id: "7",
    title: "The Witcher 3",
    imageUri: "https://cdn.akamai.steamstatic.com/steam/apps/292030/header.jpg",
    originalPrice: 40,
    discountedPrice: 10,
    discountPercentage: 75,
    platforms: ["Windows", "Mac"],
  },
  {
    id: "8",
    title: "Portal 2",
    imageUri: "https://cdn.akamai.steamstatic.com/steam/apps/620/header.jpg",
    originalPrice: 10,
    platforms: ["Windows", "Mac", "Linux"],
  },
  {
    id: "9",
    title: "Stardew Valley",
    imageUri: "https://cdn.akamai.steamstatic.com/steam/apps/413150/header.jpg",
    originalPrice: 15,
    platforms: ["Windows", "Mac", "Linux"],
  },
  {
    id: "10",
    title: "Hollow Knight",
    imageUri: "https://cdn.akamai.steamstatic.com/steam/apps/367520/header.jpg",
    originalPrice: 15,
    discountedPrice: 7.5,
    discountPercentage: 50,
    platforms: ["Windows", "Mac", "Linux"],
  },
];

export const categories = [
  { id: "1", title: "Top Sellers" },
  { id: "2", title: "Free to play" },
  { id: "3", title: "Early Access" },
];
