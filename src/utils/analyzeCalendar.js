// Script to analyze calendar data and identify activities with default emojis
import { getEventEmoji } from './emojiUtils.ts';

// Sample calendar data - you can replace this with your actual data
const sampleCalendarData = [
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
  { title: "Learning", type: "educational" },
  // Add more sample activities here
  { title: "Unwind Session", type: "leisure" },
  { title: "Personal Time", type: "leisure" },
  { title: "Reflection", type: "leisure" },
  { title: "Quiet Hour", type: "leisure" },
  { title: "Open Block", type: "leisure" },
  { title: "Flex Time", type: "leisure" },
  { title: "Chill Session", type: "leisure" },
  { title: "Social Hour", type: "leisure" },
  { title: "Group Hangout", type: "leisure" },
  { title: "Free Period", type: "leisure" },
  { title: "Break Time", type: "leisure" },
  { title: "Relaxation", type: "leisure" },
  { title: "Downtime", type: "leisure" }
];

export const analyzeCalendarEmojis = (activities = sampleCalendarData) => {
  console.log("=== CALENDAR EMOJI ANALYSIS ===");
  console.log(`Analyzing ${activities.length} activities...\n`);

  const emojiAnalysis = {
    totalActivities: activities.length,
    activitiesWithSpecificEmojis: [],
    activitiesWithFallbackEmojis: [],
    emojiBreakdown: {},
    fallbackEmojiActivities: []
  };

  activities.forEach(activity => {
    const emoji = getEventEmoji(activity.title, activity.type);
    
    // Track emoji usage
    if (!emojiAnalysis.emojiBreakdown[emoji]) {
      emojiAnalysis.emojiBreakdown[emoji] = [];
    }
    emojiAnalysis.emojiBreakdown[emoji].push(activity.title);

    // Check if it's a fallback emoji
    const isFallback = emoji === '🛋️' || emoji === '🙏' || emoji === '⛰️' || 
                      emoji === '📚' || emoji === '🚐' || emoji === '🎨' || 
                      emoji === '📅';

    if (isFallback) {
      emojiAnalysis.activitiesWithFallbackEmojis.push({
        title: activity.title,
        type: activity.type,
        emoji: emoji
      });
      
      if (emoji === '🛋️') {
        emojiAnalysis.fallbackEmojiActivities.push(activity.title);
      }
    } else {
      emojiAnalysis.activitiesWithSpecificEmojis.push({
        title: activity.title,
        type: activity.type,
        emoji: emoji
      });
    }
  });

  // Display results
  console.log("=== ACTIVITIES WITH FALLBACK EMOJIS ===");
  if (emojiAnalysis.activitiesWithFallbackEmojis.length > 0) {
    emojiAnalysis.activitiesWithFallbackEmojis.forEach(activity => {
      console.log(`${activity.emoji} "${activity.title}" (${activity.type})`);
    });
  } else {
    console.log("✅ No activities with fallback emojis!");
  }

  console.log("\n=== SPECIFICALLY LEISURE ACTIVITIES WITH FALLBACK (🛋️) ===");
  if (emojiAnalysis.fallbackEmojiActivities.length > 0) {
    console.log(`Found ${emojiAnalysis.fallbackEmojiActivities.length} leisure activities needing emoji mappings:`);
    emojiAnalysis.fallbackEmojiActivities.forEach(title => {
      console.log(`  - "${title}"`);
    });
    console.log("\nThese need specific emoji mappings in emojiUtils.ts");
  } else {
    console.log("✅ No leisure activities showing fallback emoji!");
  }

  console.log("\n=== EMOJI BREAKDOWN ===");
  Object.entries(emojiAnalysis.emojiBreakdown)
    .sort(([,a], [,b]) => b.length - a.length) // Sort by frequency
    .forEach(([emoji, activities]) => {
      console.log(`${emoji} (${activities.length} activities):`);
      activities.forEach(activity => {
        console.log(`  - ${activity}`);
      });
      console.log('');
    });

  console.log("=== SUMMARY ===");
  console.log(`Total activities: ${emojiAnalysis.totalActivities}`);
  console.log(`Activities with specific emojis: ${emojiAnalysis.activitiesWithSpecificEmojis.length}`);
  console.log(`Activities with fallback emojis: ${emojiAnalysis.activitiesWithFallbackEmojis.length}`);
  console.log(`Leisure activities needing emoji mappings: ${emojiAnalysis.fallbackEmojiActivities.length}`);

  return emojiAnalysis;
};

// Run the analysis if this script is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  analyzeCalendarEmojis();
} 