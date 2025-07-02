import { getEventEmoji } from './emojiUtils';

export interface ActivityData {
  title: string;
  type: string;
  date: string;
  isMultiDay: boolean;
}

export interface ActivitiesAnalysis {
  totalActivities: number;
  activitiesByType: Record<string, string[]>;
  allActivities: ActivityData[];
  timestamp: string;
}

export interface EmojiAnalysis {
  activitiesWithFallbackEmojis: ActivityData[];
  fallbackEmojiCount: number;
  totalActivities: number;
  fallbackPercentage: number;
}

export const checkMissingEmojis = (items: any[]): EmojiAnalysis => {
  const activitiesWithFallbackEmojis: ActivityData[] = [];
  
  items.forEach(item => {
    const emoji = getEventEmoji(item.title, item.type);
    
    // Check if it's a fallback emoji (generic type-based emoji)
    const isFallback = emoji === '🎮' || emoji === '🙏' || emoji === '⛰️' || 
                      emoji === '📚' || emoji === '🚐' || emoji === '🎨' || 
                      emoji === '📅';
    
    if (isFallback) {
      activitiesWithFallbackEmojis.push({
        title: item.title,
        type: item.type,
        date: item.date,
        isMultiDay: item.isMultiDay
      });
    }
  });
  
  return {
    activitiesWithFallbackEmojis,
    fallbackEmojiCount: activitiesWithFallbackEmojis.length,
    totalActivities: items.length,
    fallbackPercentage: Math.round((activitiesWithFallbackEmojis.length / items.length) * 100)
  };
};

export const checkConsoleEmojiActivities = (items: any[]) => {
  const consoleEmojiActivities: ActivityData[] = [];
  
  items.forEach(item => {
    const emoji = getEventEmoji(item.title, item.type);
    
    // Specifically check for console emoji (🎮)
    if (emoji === '🎮') {
      consoleEmojiActivities.push({
        title: item.title,
        type: item.type,
        date: item.date,
        isMultiDay: item.isMultiDay
      });
    }
  });
  
  console.log('\n=== CONSOLE EMOJI (🎮) ACTIVITIES ===');
  console.log(`Activities showing console emoji: ${consoleEmojiActivities.length}`);
  
  if (consoleEmojiActivities.length > 0) {
    console.log('\nActivities with console emoji (🎮):');
    consoleEmojiActivities.forEach(activity => {
      console.log(`  - "${activity.title}" (${activity.type})`);
    });
    console.log('\nThese need specific emoji mappings in emojiUtils.ts');
  } else {
    console.log('✅ No activities showing console emoji!');
  }
  
  return consoleEmojiActivities;
};

export const logActivitiesToFile = (items: any[]) => {
  const activitiesData: ActivitiesAnalysis = {
    totalActivities: items.length,
    activitiesByType: {},
    allActivities: items.map(item => ({
      title: item.title,
      type: item.type,
      date: item.date,
      isMultiDay: item.isMultiDay
    })),
    timestamp: new Date().toISOString()
  };

  // Group by type
  items.forEach(item => {
    if (!activitiesData.activitiesByType[item.type]) {
      activitiesData.activitiesByType[item.type] = [];
    }
    activitiesData.activitiesByType[item.type].push(item.title);
  });

  // Check for missing emojis
  const emojiAnalysis = checkMissingEmojis(items);
  
  // Specifically check for console emoji activities
  const consoleEmojiActivities = checkConsoleEmojiActivities(items);
  
  // Comprehensive emoji analysis
  const comprehensiveAnalysis = checkAllActivitiesAndEmojis(items);

  // Save to localStorage for persistence
  localStorage.setItem('camp-activities-analysis', JSON.stringify(activitiesData));
  localStorage.setItem('camp-emoji-analysis', JSON.stringify(emojiAnalysis));
  
  // Log to console for immediate viewing
  console.log('=== CAMP ACTIVITIES ANALYSIS ===');
  console.log(`Total activities: ${activitiesData.totalActivities}`);
  console.log(`Timestamp: ${activitiesData.timestamp}`);
  console.log('\nActivities by type:');
  
  Object.entries(activitiesData.activitiesByType).forEach(([type, titles]) => {
    console.log(`\n${type.toUpperCase()} (${titles.length} activities):`);
    titles.forEach(title => console.log(`  - ${title}`));
  });
  
  console.log('\n=== EMOJI ANALYSIS ===');
  console.log(`Activities with fallback emojis: ${emojiAnalysis.fallbackEmojiCount}/${emojiAnalysis.totalActivities} (${emojiAnalysis.fallbackPercentage}%)`);
  
  if (emojiAnalysis.activitiesWithFallbackEmojis.length > 0) {
    console.log('\nActivities needing specific emojis:');
    emojiAnalysis.activitiesWithFallbackEmojis.forEach(activity => {
      console.log(`  - ${activity.title} (${activity.type})`);
    });
  } else {
    console.log('✅ All activities have specific emojis!');
  }
  
  console.log('\n=== COMPLETE ACTIVITIES DATA ===');
  console.log('Full data saved to localStorage as "camp-activities-analysis"');
  console.log('Emoji analysis saved to localStorage as "camp-emoji-analysis"');
  console.log('You can access them with: localStorage.getItem("camp-activities-analysis")');
  console.log('=== END ANALYSIS ===');
  
  return activitiesData;
};

export const checkAllActivitiesAndEmojis = (items: any[]) => {
  console.log('\n=== COMPREHENSIVE EMOJI ANALYSIS ===');
  console.log(`Total activities: ${items.length}`);
  
  const emojiAnalysis: Record<string, { count: number, activities: string[] }> = {};
  const consoleEmojiActivities: string[] = [];
  
  items.forEach(item => {
    const emoji = getEventEmoji(item.title, item.type);
    
    // Track emoji usage
    if (!emojiAnalysis[emoji]) {
      emojiAnalysis[emoji] = { count: 0, activities: [] };
    }
    emojiAnalysis[emoji].count++;
    emojiAnalysis[emoji].activities.push(item.title);
    
    // Track console emoji specifically
    if (emoji === '🎮') {
      consoleEmojiActivities.push(item.title);
    }
  });
  
  console.log('\n=== EMOJI BREAKDOWN ===');
  Object.entries(emojiAnalysis)
    .sort(([,a], [,b]) => b.count - a.count) // Sort by frequency
    .forEach(([emoji, data]) => {
      console.log(`${emoji} (${data.count} activities):`);
      data.activities.forEach(activity => {
        console.log(`  - ${activity}`);
      });
      console.log('');
    });
  
  console.log('\n=== CONSOLE EMOJI (🎮) ACTIVITIES ===');
  if (consoleEmojiActivities.length > 0) {
    console.log(`Found ${consoleEmojiActivities.length} activities with console emoji:`);
    consoleEmojiActivities.forEach(activity => {
      console.log(`  - ${activity}`);
    });
    console.log('\nThese need specific emoji mappings in emojiUtils.ts');
  } else {
    console.log('✅ No activities showing console emoji!');
  }
  
  console.log('\n=== SUMMARY ===');
  console.log(`Total unique emojis used: ${Object.keys(emojiAnalysis).length}`);
  console.log(`Most common emoji: ${Object.entries(emojiAnalysis).sort(([,a], [,b]) => b.count - a.count)[0]?.[0] || 'None'}`);
  console.log(`Activities needing emoji mappings: ${consoleEmojiActivities.length}`);
  
  return {
    emojiAnalysis,
    consoleEmojiActivities,
    totalActivities: items.length
  };
}; 