import "dotenv/config";
import mongoose from "mongoose";
import { format, subDays } from "date-fns";

import connectDB from "../config/db.js";
import User from "../models/User.js";
import Habit from "../models/Habit.js";
import HabitLog from "../models/HabitLog.js";
import AIInsights from "../models/AIInsights.js";

const EMAIL = "taylor@gmail.com";
const PASSWORD = "password@123";
const NAME = "Taylor Conklin";

const seedHabits = [
  {
    name: "Drink 2L Water",
    description: "Stay hydrated throughout the day",
    category: "Health",
    frequency: "daily",
    targetDays: 7,
    color: "#3B82F6",
    icon: "💧",
    _streakProb: 0.95,
    _pattern: "daily"
  },

  {
    name: "Morning Walk",
    description: "Walk for 20 minutes",
    category: "Fitness",
    frequency: "daily",
    targetDays: 7,
    color: "#10B981",
    icon: "🚶",
    _streakProb: 0.85,
    _pattern: "daily"
  },

  {
    name: "Study DSA",
    description: "Solve at least one DSA problem",
    category: "Learning",
    frequency: "daily",
    targetDays: 7,
    color: "#8B5CF6",
    icon: "💻",
    _streakProb: 0.75,
    _pattern: "weekdays",
    _brokeAt: 12
  },

  {
    name: "Read 10 Pages",
    description: "Read books for personal growth",
    category: "Learning",
    frequency: "daily",
    targetDays: 7,
    color: "#F59E0B",
    icon: "📚",
    _streakProb: 0.85,
    _pattern: "daily"
  },

  {
    name: "Workout",
    description: "Exercise for 30 minutes",
    category: "Fitness",
    frequency: "daily",
    targetDays: 5,
    color: "#EF4444",
    icon: "🏋️",
    _streakProb: 0.70,
    _pattern: "alternate",
    _brokeAt: 18
  },

  {
    name: "Meditate",
    description: "Practice mindfulness",
    category: "Mindfulness",
    frequency: "daily",
    targetDays: 7,
    color: "#EC4899",
    icon: "🧘",
    _streakProb: 0.55,
    _pattern: "sporadic"
  },

  {
    name: "Journal",
    description: "Write daily reflections",
    category: "Mindfulness",
    frequency: "daily",
    targetDays: 7,
    color: "#A855F7",
    icon: "✍️",
    _streakProb: 0.45,
    _pattern: "sporadic"
  },

  {
    name: "Sleep Before 11 PM",
    description: "Maintain healthy sleep schedule",
    category: "Health",
    frequency: "daily",
    targetDays: 7,
    color: "#6366F1",
    icon: "😴",
    _streakProb: 0.90,
    _pattern: "declining",
    _brokeAt: 22
  },

  {
    name: "Learn AI/ML",
    description: "Study AI/ML concepts",
    category: "Learning",
    frequency: "daily",
    targetDays: 7,
    color: "#06B6D4",
    icon: "🤖",
    _streakProb: 0.65,
    _pattern: "comeback"
  },

  {
    name: "Practice Coding",
    description: "Build coding consistency",
    category: "Learning",
    frequency: "daily",
    targetDays: 7,
    color: "#14B8A6",
    icon: "⌨️",
    _streakProb: 0.70,
    _pattern: "weekdays"
  },

  {
    name: "Track Expenses",
    description: "Record daily spending",
    category: "Finance",
    frequency: "daily",
    targetDays: 7,
    color: "#22C55E",
    icon: "💰",
    _streakProb: 0.40,
    _pattern: "weekends"
  },

  {
    name: "Call Family",
    description: "Stay connected with family",
    category: "Social",
    frequency: "weekly",
    targetDays: 3,
    color: "#F97316",
    icon: "📞",
    _streakProb: 0.60,
    _pattern: "weekends"
  },

  {
    name: "Open Source Contribution",
    description: "Contribute to GitHub projects",
    category: "Learning",
    frequency: "weekly",
    targetDays: 2,
    color: "#4F46E5",
    icon: "🚀",
    _streakProb: 0.55,
    _pattern: "weekdays",
    _brokeAt: 8
  },

  {
    name: "No Social Media Before Noon",
    description: "Reduce distractions",
    category: "Productivity",
    frequency: "daily",
    targetDays: 7,
    color: "#DC2626",
    icon: "📵",
    _streakProb: 0.50,
    _pattern: "declining",
    _brokeAt: 14
  },

  {
    name: "Plan Tomorrow",
    description: "Create next day's task list",
    category: "Productivity",
    frequency: "daily",
    targetDays: 7,
    color: "#0EA5E9",
    icon: "📝",
    _streakProb: 0.80,
    _pattern: "daily"
  }
];

const todayKey = () =>
  format(new Date(), "yyyy-MM-dd");

const buildLogs = (
  habit,
  totalDays = 90
) => {
  const logs = [];
  const today = new Date();

  for (
    let i = 0;
    i < totalDays;
    i++
  ) {
    const d = subDays(today, i);
    const dow = d.getDay();
    const key = format(
      d,
      "yyyy-MM-dd"
    );

    let p =
      habit._streakProb || 0.7;

    if (
      habit._pattern ===
      "weekdays"
    ) {
      if (
        dow === 0 ||
        dow === 6
      ) {
        p *= 0.35;
      }
    }

    if (
      habit._pattern ===
      "weekends"
    ) {
      if (
        dow >= 1 &&
        dow <= 5
      ) {
        p *= 0.25;
      }
    }

    if (
      habit._pattern ===
      "alternate"
    ) {
      if (i % 2 === 1) {
        p *= 0.2;
      }
    }

    if (
      habit._pattern ===
      "sporadic"
    ) {
      p *= 0.6;
    }

    if (
      habit._pattern ===
      "declining"
    ) {
      p *= Math.max(
        0.2,
        1 - i / totalDays
      );
    }

    if (
      habit._pattern ===
      "comeback"
    ) {
      if (i > 30) {
        p *= 0.4;
      } else {
        p *= 1.2;
      }
    }

    if (
      habit._brokeAt &&
      i >= habit._brokeAt - 2 &&
      i <= habit._brokeAt + 2
    ) {
      continue;
    }

    const seed =
      Math.sin(
        i * 9301 +
          habit.name.length *
            49297
      ) * 233280;

    const rnd =
      seed -
      Math.floor(seed);

    if (rnd < p) {
      logs.push({
        completedDate: key,
      });
    }
  }

  return logs;
};

const run = async () => {
  await connectDB();

  let user =
    await User.findOne({
      email: EMAIL,
    });

  if (user) {
    console.log(
      `Found existing user ${EMAIL} - clearing data...`
    );

    await Habit.deleteMany({
      userId: user._id,
    });

    await HabitLog.deleteMany({
      userId: user._id,
    });

    await AIInsights.deleteMany({
      userId: user._id,
    });

    user.name = NAME;
    user.avatar =
      NAME.charAt(0).toUpperCase();
    user.morningMotivation =
      true;
    user.password = PASSWORD;

    await user.save();
  } else {
    user =
      await User.create({
        name: NAME,
        email: EMAIL,
        password: PASSWORD,
        avatar:
          NAME.charAt(
            0
          ).toUpperCase(),
        morningMotivation:
          true,
      });

    console.log(
      `Created user ${EMAIL}`
    );
  }

  const createdHabits = [];

  for (
    let i = 0;
    i < seedHabits.length;
    i++
  ) {
    const h =
      seedHabits[i];

    const habit =
      await Habit.create({
        userId: user._id,
        name: h.name,
        description:
          h.description,
        category:
          h.category,
        frequency:
          h.frequency,
        targetDays:
          h.targetDays,
        color: h.color,
        icon: h.icon,
        order: i,
      });

    createdHabits.push({
      habit,
      config: h,
    });
  }

  let totalLogs = 0;

  for (const {
    habit,
    config,
  } of createdHabits) {
    const logs =
      buildLogs(config);

    const docs =
      logs.map((l) => ({
        userId: user._id,
        habitId:
          habit._id,
        completedDate:
          l.completedDate,
      }));

    if (docs.length) {
      await HabitLog.insertMany(
        docs,
        {
          ordered: false,
        }
      ).catch(() => {});

      totalLogs +=
        docs.length;
    }
  }

  const today =
    todayKey();

  const todayDoneHabits =
    createdHabits
      .slice(0, 4)
      .map(
        (c) => c.habit
      );

  for (const h of todayDoneHabits) {
    await HabitLog.updateOne(
      {
        userId: user._id,
        habitId: h._id,
        completedDate:
          today,
      },
      {
        $setOnInsert: {
          userId:
            user._id,
          habitId:
            h._id,
          completedDate:
            today,
        },
      },
      {
        upsert: true,
      }
    );
  }

  console.log(
    "\n✅ Seed complete"
  );

  console.log(
    `User: ${EMAIL}`
  );

  console.log(
    `Password: ${PASSWORD}`
  );

  console.log(
    `Habits: ${createdHabits.length}`
  );

  console.log(
    `Logs: ~${totalLogs}`
  );

  await mongoose.disconnect();
};

run().catch(
  async (err) => {
    console.error(
      "Seed failed:",
      err
    );

    await mongoose.disconnect();

    process.exit(1);
  }
);