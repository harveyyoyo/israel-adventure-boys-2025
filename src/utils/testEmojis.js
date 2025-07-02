// Simple test script to check emoji assignments
import { getEventEmoji } from './emojiUtils.js';

// Sample activities that might be in your calendar
const testActivities = [
  { title: "Morning Activity", type: "leisure" },
  { title: "Evening Program", type: "leisure" },
  { title: "Free Time", type: "leisure" },
  { title: "Rest Period", type: "leisure" },
  { title: "Camp Activity", type: "leisure" },
  { title: "Leisure Time", type: "leisure" },
  { title: "Recreation", type: "leisure" },
  { title: "Fun Activity", type: "leisure" },
  { title: "Hot Ones", type: "leisure" },
  { title: "Departure", type: "travel" },
  { title: "Arrival", type: "travel" },
  { title: "Breakfast", type: "food" },
  { title: "Lunch", type: "food" },
  { title: "Dinner", type: "food" },
  { title: "Pool Time", type: "recreation" },
  { title: "Hiking", type: "adventure" },
  { title: "Shabbos", type: "spiritual" },
  { title: "Learning", type: "educational" }
];

console.log("=== EMOJI TEST RESULTS ===");
testActivities.forEach(activity => {
  const emoji = getEventEmoji(activity.title, activity.type);
  console.log(`${emoji} "${activity.title}" (${activity.type})`);
});

console.log("\n=== CONSOLE EMOJI (🎮) ACTIVITIES ===");
const consoleEmojiActivities = testActivities.filter(activity => {
  const emoji = getEventEmoji(activity.title, activity.type);
  return emoji === '🎮';
});

if (consoleEmojiActivities.length > 0) {
  consoleEmojiActivities.forEach(activity => {
    console.log(`🎮 "${activity.title}" (${activity.type})`);
  });
} else {
  console.log("No activities showing console emoji!");
} 