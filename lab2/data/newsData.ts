export interface NewsItem {
  id: string;
  title: string;
  imageUri: string;
  source: string;
  date: string;
  time: string;
  content: string;
  likes: number;
  comments: number;
}

export const newsData: NewsItem[] = [
  {
    id: "1",
    title:
      "Florida tourist attraction sues Fortnite, seeks removal of in-game castle",
    imageUri: "https://cdn.akamai.steamstatic.com/steam/apps/379430/header.jpg",
    source: "Eurogamer",
    date: "yesterday",
    time: "2:20 pm",
    content:
      "Coral Castle Museum, a tourist attraction near Miami, is suing Fortnite maker Epic Games for trademark infringement and unfair competition.",
    likes: 324,
    comments: 12,
  },
  {
    id: "2",
    title: "Valve announces next Steam festival dates",
    imageUri:
      "https://cdn.cloudflare.steamstatic.com/steam/apps/593110/header.jpg",
    source: "PC Gamer",
    date: "yesterday",
    time: "10:45 am",
    content:
      "The next Steam Game Festival will run from February 3 to February 9. The event will feature hundreds of demos from upcoming games.",
    likes: 542,
    comments: 31,
  },
  {
    id: "3",
    title: "Cyberpunk 2077 patch 1.2 delayed due to cyber attack",
    imageUri:
      "https://cdn.akamai.steamstatic.com/steam/apps/1091500/header.jpg",
    source: "IGN",
    date: "2 days ago",
    time: "9:15 am",
    content:
      "CD Projekt Red has announced that the 1.2 patch for Cyberpunk 2077 will be delayed due to the recent cyber attack on the company.",
    likes: 876,
    comments: 124,
  },
  {
    id: "4",
    title: "Team Fortress 2 community creates new anti-cheat solution",
    imageUri: "https://cdn.akamai.steamstatic.com/steam/apps/440/header.jpg",
    source: "Rock Paper Shotgun",
    date: "3 days ago",
    time: "4:30 pm",
    content:
      "The Team Fortress 2 community has created a new anti-cheat solution to combat the game's ongoing bot problem.",
    likes: 1204,
    comments: 86,
  },
  {
    id: "5",
    title: "Half-Life: Alyx modders create full-length campaign",
    imageUri: "https://cdn.akamai.steamstatic.com/steam/apps/546560/header.jpg",
    source: "Kotaku",
    date: "4 days ago",
    time: "11:20 am",
    content:
      "A group of modders has created a full-length campaign for Half-Life: Alyx that adds several hours of new content to the VR game.",
    likes: 932,
    comments: 47,
  },
];

export const categories = [
  { id: "1", title: "All" },
  { id: "2", title: "Screenshots" },
  { id: "3", title: "Artwork" },
  { id: "4", title: "Workshop" },
];
