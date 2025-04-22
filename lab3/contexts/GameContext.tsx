import React, { createContext, useState, useContext, ReactNode } from "react";

// Define the task type
export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

// Define the context type
interface GameContextType {
  score: number;
  addScore: (points: number) => void;
  tasks: Task[];
  completeTask: (id: string) => void;
  resetGame: () => void;
  clicks: number;
  doubleClicks: number;
  longPresses: number;
  drags: boolean;
  swipeRight: boolean;
  swipeLeft: boolean;
  pinches: boolean;
  updateClicks: () => void;
  updateDoubleClicks: () => void;
  updateLongPresses: () => void;
  updateDrags: () => void;
  updateSwipeRight: () => void;
  updateSwipeLeft: () => void;
  updatePinches: () => void;
}

// Create the context
const GameContext = createContext<GameContextType | undefined>(undefined);

// Initial tasks
const initialTasks: Task[] = [
  {
    id: "1",
    title: "Зробити 10 кліків",
    description: "Натиснути на об'єкт 10 разів",
    completed: false,
  },
  {
    id: "2",
    title: "Зробити подвійний клік 5 разів",
    description:
      "Використати TapGestureHandler для виконання 5 подвійних кліків",
    completed: false,
  },
  {
    id: "3",
    title: "Утримувати об'єкт 3 секунди",
    description: "Використати LongPressGestureHandler для довгого натискання",
    completed: false,
  },
  {
    id: "4",
    title: "Перетягнути об'єкт",
    description:
      "Використати PanGestureHandler, щоб перемістити об'єкт по екрану",
    completed: false,
  },
  {
    id: "5",
    title: "Зробити свайп вправо",
    description:
      "Використати FlingGestureHandler, щоб зробити швидкий свайп вправо",
    completed: false,
  },
  {
    id: "6",
    title: "Зробити свайп вліво",
    description:
      "Використати FlingGestureHandler, щоб зробити швидкий свайп вліво",
    completed: false,
  },
  {
    id: "7",
    title: "Змінити розмір об'єкта",
    description:
      "Використати PinchGestureHandler, щоб збільшити або зменшити об'єкт",
    completed: false,
  },
  {
    id: "8",
    title: "Отримати 100 очок",
    description: "Набрати загалом 100 очок у лічильнику",
    completed: false,
  },
];

// Create the provider
export const GameProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [score, setScore] = useState(0);
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [clicks, setClicks] = useState(0);
  const [doubleClicks, setDoubleClicks] = useState(0);
  const [longPresses, setLongPresses] = useState(0);
  const [drags, setDrags] = useState(false);
  const [swipeRight, setSwipeRight] = useState(false);
  const [swipeLeft, setSwipeLeft] = useState(false);
  const [pinches, setPinches] = useState(false);

  // Add points to the score
  const addScore = (points: number) => {
    setScore((prevScore) => {
      const newScore = prevScore + points;

      // Check if the score task should be completed
      if (newScore >= 100) {
        completeTask("8");
      }

      return newScore;
    });
  };

  // Mark a task as completed
  const completeTask = (id: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: true } : task
      )
    );
  };

  // Reset the game state
  const resetGame = () => {
    setScore(0);
    setTasks(initialTasks);
    setClicks(0);
    setDoubleClicks(0);
    setLongPresses(0);
    setDrags(false);
    setSwipeRight(false);
    setSwipeLeft(false);
    setPinches(false);
  };

  // Update counters and check task completion
  const updateClicks = () => {
    setClicks((prev) => {
      const newClicks = prev + 1;
      if (newClicks >= 10) {
        completeTask("1");
      }
      return newClicks;
    });
  };

  const updateDoubleClicks = () => {
    setDoubleClicks((prev) => {
      const newDoubleClicks = prev + 1;
      if (newDoubleClicks >= 5) {
        completeTask("2");
      }
      return newDoubleClicks;
    });
  };

  const updateLongPresses = () => {
    setLongPresses((prev) => {
      const newLongPresses = prev + 1;
      completeTask("3");
      return newLongPresses + 1;
    });
  };

  const updateDrags = () => {
    setDrags(true);
    completeTask("4");
  };

  const updateSwipeRight = () => {
    setSwipeRight(true);
    completeTask("5");
  };

  const updateSwipeLeft = () => {
    setSwipeLeft(true);
    completeTask("6");
  };

  const updatePinches = () => {
    setPinches(true);
    completeTask("7");
  };

  return (
    <GameContext.Provider
      value={{
        score,
        addScore,
        tasks,
        completeTask,
        resetGame,
        clicks,
        doubleClicks,
        longPresses,
        drags,
        swipeRight,
        swipeLeft,
        pinches,
        updateClicks,
        updateDoubleClicks,
        updateLongPresses,
        updateDrags,
        updateSwipeRight,
        updateSwipeLeft,
        updatePinches,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

// Custom hook to use the game context
export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
};
