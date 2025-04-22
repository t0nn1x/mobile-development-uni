export interface ChatItem {
  id: string;
  userName: string;
  avatarUri?: string;
  lastMessage: string;
  date: string;
  unreadCount?: number;
  isOnline: boolean;
  isUser?: boolean;
}

export const chatsData: ChatItem[] = [
  {
    id: "1",
    userName: "Mark Dyson",
    avatarUri: "https://i.pravatar.cc/100?img=1",
    lastMessage: "I'm already starting to play",
    date: "14 Jun",
    unreadCount: 1,
    isOnline: true,
  },
  {
    id: "2",
    userName: "Mark Dyson",
    avatarUri: "https://i.pravatar.cc/100?img=1",
    lastMessage: "Ok",
    date: "14 Jun",
    isOnline: true,
    isUser: true,
  },
  {
    id: "3",
    userName: "Player123",
    avatarUri: "https://i.pravatar.cc/100?img=2",
    lastMessage: "Ok",
    date: "14 Jun",
    isOnline: false,
    isUser: true,
  },
  {
    id: "4",
    userName: "Player123",
    avatarUri: "https://i.pravatar.cc/100?img=2",
    lastMessage: "Ok",
    date: "14 Jun",
    isOnline: false,
    isUser: true,
  },
  {
    id: "5",
    userName: "Player",
    avatarUri: "",
    lastMessage: "Hello!",
    date: "12 Jun",
    isOnline: false,
  },
  {
    id: "6",
    userName: "Player",
    avatarUri: "",
    lastMessage: "Hello!",
    date: "12 Jun",
    isOnline: false,
  },
  {
    id: "7",
    userName: "Σxprεssσ #=_-#",
    avatarUri: "https://i.pravatar.cc/100?img=5",
    lastMessage: "Ok",
    date: "",
    isOnline: true,
  },
  {
    id: "8",
    userName: "Σxprεssσ #=_-#",
    avatarUri: "https://i.pravatar.cc/100?img=5",
    lastMessage: "Ok",
    date: "",
    isOnline: true,
  },
];
