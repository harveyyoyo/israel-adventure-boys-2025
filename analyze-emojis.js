// Standalone script to analyze which activities have default emojis
// Copy the getEventEmoji function logic here to avoid import issues

function getEventEmoji(title, type) {
  const titleLower = title.toLowerCase();
  
  // All specific emoji checks (including 'hot ones')
  if (titleLower.includes('hot ones')) return '🌶️';
  if (titleLower.includes('shabbos')) return '🕯️';
  if (titleLower.includes('tzfat') || titleLower.includes('tzfas')) return '🏔️';
  if (titleLower.includes('wall') || titleLower.includes('kotel')) return '🕊️';
  if (titleLower.includes('museum')) return '🏛️';
  if (titleLower.includes('market') || titleLower.includes('shuk')) return '🛒';
  if (titleLower.includes('beach') || titleLower.includes('eilat')) return '🏖️';
  if (titleLower.includes('hike') || titleLower.includes('hiking')) return '🥾';
  if (titleLower.includes('yurts') || titleLower.includes('overnight')) return '⛺';
  if (titleLower.includes('old city')) return '🏰';
  if (titleLower.includes('flight') || titleLower.includes('travel')) return '✈️';
  if (titleLower.includes('pool') || titleLower.includes('swim')) return '🏊';
  if (titleLower.includes('meal') || titleLower.includes('dinner')) return '🍽️';
  if (titleLower.includes('tour')) return '🚌';
  if (titleLower.includes('activity')) return '🎯';
  if (titleLower.includes('masada')) return '🏜️';
  if (titleLower.includes('dead sea')) return '🌊';
  if (titleLower.includes('golan')) return '⛰️';
  if (titleLower.includes('rafting')) return '🛶';
  if (titleLower.includes('chocolate')) return '🍫';
  if (titleLower.includes('paintball')) return '🎨';
  if (titleLower.includes('archery')) return '🏹';
  if (titleLower.includes('donkey')) return '🦙';
  if (titleLower.includes('snorkeling')) return '🤿';
  if (titleLower.includes('scuba')) return '🤿';
  if (titleLower.includes('glass')) return '🪟';
  if (titleLower.includes('dig')) return '⛏️';
  if (titleLower.includes('atv')) return '🏎️';
  if (titleLower.includes('boat')) return '⛵';
  if (titleLower.includes('sailing')) return '⛵';
  if (titleLower.includes('bonfire')) return '🔥';
  if (titleLower.includes('smores')) return '🍫';
  if (titleLower.includes('kumzits')) return '🎵';
  if (titleLower.includes('learning')) return '📖';
  if (titleLower.includes('shiur')) return '📚';
  if (titleLower.includes('davening')) return '🙏';
  if (titleLower.includes('kiddush')) return '🍷';
  if (titleLower.includes('fabrengen')) return '🎉';
  if (titleLower.includes('orientation')) return '📋';
  if (titleLower.includes('welcome')) return '👋';
  if (titleLower.includes('boys start')) return '🚀';
  if (titleLower.includes('boys end')) return '🏁';
  if (titleLower.includes('camp day')) return '🏕️';
  if (titleLower.includes('chill day')) return '😌';
  if (titleLower.includes('talent show')) return '🎭';
  if (titleLower.includes('improv')) return '🎪';
  if (titleLower.includes('dodgeball')) return '⚾';
  if (titleLower.includes('capture the counselor')) return '🎯';
  if (titleLower.includes('banana boating')) return '🍌';
  if (titleLower.includes('fear factor')) return '😱';
  if (titleLower.includes('stomp')) return '👟';
  if (titleLower.includes('water sports')) return '🏄';
  if (titleLower.includes('ice mall')) return '❄️';
  if (titleLower.includes('dolphins')) return '🐬';
  if (titleLower.includes('bbq')) return '🍖';
  if (titleLower.includes('pizza')) return '🍕';
  if (titleLower.includes('sushi')) return '🍣';
  if (titleLower.includes('forest walk')) return '🌲';
  if (titleLower.includes('nap')) return '😴';
  if (titleLower.includes('natural spring')) return '💧';
  if (titleLower.includes('cave')) return '🕳️';
  if (titleLower.includes('haunted house')) return '👻';
  if (titleLower.includes('blind museum')) return '🕶️';
  if (titleLower.includes('nova festival')) return '🎪';
  if (titleLower.includes('memorial')) return '🕊️';
  if (titleLower.includes('sderot')) return '🏘️';
  if (titleLower.includes('yad v\'shem')) return '🕯️';
  if (titleLower.includes('tisha bav')) return '🕊️';
  if (titleLower.includes('hidden waterfall')) return '🌊';
  if (titleLower.includes('black canyon')) return '🏔️';
  if (titleLower.includes('party boat')) return '🎉';
  if (titleLower.includes('grape harvest')) return '🍇';
  if (titleLower.includes('red canyon')) return '🏜️';
  if (titleLower.includes('timna park')) return '🏞️';
  if (titleLower.includes('departure')) return '✈️';
  
  // Additional common camp activities
  if (titleLower.includes('arrival')) return '🚌';
  if (titleLower.includes('check in')) return '📝';
  if (titleLower.includes('check out')) return '📋';
  if (titleLower.includes('breakfast')) return '🥐';
  if (titleLower.includes('lunch')) return '🥪';
  if (titleLower.includes('snack')) return '🍎';
  if (titleLower.includes('free time')) return '😌';
  if (titleLower.includes('rest')) return '😴';
  if (titleLower.includes('shower')) return '🚿';
  if (titleLower.includes('lights out')) return '🌙';
  if (titleLower.includes('wake up')) return '🌅';
  if (titleLower.includes('morning')) return '🌅';
  if (titleLower.includes('evening')) return '🌆';
  if (titleLower.includes('night')) return '🌙';
  if (titleLower.includes('sports')) return '⚽';
  if (titleLower.includes('basketball')) return '🏀';
  if (titleLower.includes('soccer')) return '⚽';
  if (titleLower.includes('volleyball')) return '🏐';
  if (titleLower.includes('tennis')) return '🎾';
  if (titleLower.includes('baseball')) return '⚾';
  if (titleLower.includes('football')) return '🏈';
  if (titleLower.includes('swimming')) return '🏊';
  if (titleLower.includes('fishing')) return '🎣';
  if (titleLower.includes('canoeing')) return '🛶';
  if (titleLower.includes('kayaking')) return '🛶';
  if (titleLower.includes('climbing')) return '🧗';
  if (titleLower.includes('zip line')) return '🪂';
  if (titleLower.includes('ropes course')) return '🧗';
  if (titleLower.includes('team building')) return '🤝';
  if (titleLower.includes('leadership')) return '👑';
  if (titleLower.includes('workshop')) return '🔧';
  if (titleLower.includes('craft')) return '🎨';
  if (titleLower.includes('art')) return '🎨';
  if (titleLower.includes('music')) return '🎵';
  if (titleLower.includes('dance')) return '💃';
  if (titleLower.includes('drama')) return '🎭';
  if (titleLower.includes('photography')) return '📸';
  if (titleLower.includes('cooking')) return '👨‍🍳';
  if (titleLower.includes('baking')) return '🥖';
  if (titleLower.includes('campfire')) return '🔥';
  if (titleLower.includes('singing')) return '🎤';
  if (titleLower.includes('guitar')) return '🎸';
  if (titleLower.includes('drum')) return '🥁';
  if (titleLower.includes('karaoke')) return '🎤';
  if (titleLower.includes('movie')) return '🎬';
  if (titleLower.includes('game')) return '🎮';
  if (titleLower.includes('board game')) return '🎲';
  if (titleLower.includes('card game')) return '🃏';
  if (titleLower.includes('puzzle')) return '🧩';
  if (titleLower.includes('scavenger hunt')) return '🔍';
  if (titleLower.includes('treasure hunt')) return '💎';
  if (titleLower.includes('relay race')) return '🏃';
  if (titleLower.includes('obstacle course')) return '🏃';
  if (titleLower.includes('tug of war')) return '🪢';
  if (titleLower.includes('water balloon')) return '💧';
  if (titleLower.includes('slip n slide')) return '💦';
  if (titleLower.includes('sprinkler')) return '💦';
  if (titleLower.includes('ice cream')) return '🍦';
  if (titleLower.includes('popcorn')) return '🍿';
  if (titleLower.includes('hot dog')) return '🌭';
  if (titleLower.includes('hamburger')) return '🍔';
  if (titleLower.includes('soda')) return '🥤';
  if (titleLower.includes('juice')) return '🧃';
  if (titleLower.includes('water')) return '💧';
  if (titleLower.includes('coffee')) return '☕';
  if (titleLower.includes('tea')) return '🫖';
  if (titleLower.includes('milk')) return '🥛';
  if (titleLower.includes('cereal')) return '🥣';
  if (titleLower.includes('pancake')) return '🥞';
  if (titleLower.includes('waffle')) return '🧇';
  if (titleLower.includes('eggs')) return '🥚';
  if (titleLower.includes('bacon')) return '🥓';
  if (titleLower.includes('salad')) return '🥗';
  if (titleLower.includes('sandwich')) return '🥪';
  if (titleLower.includes('soup')) return '🍲';
  if (titleLower.includes('pasta')) return '🍝';
  if (titleLower.includes('rice')) return '🍚';
  if (titleLower.includes('chicken')) return '🍗';
  if (titleLower.includes('fish')) return '🐟';
  if (titleLower.includes('vegetable')) return '🥬';
  if (titleLower.includes('fruit')) return '🍎';
  if (titleLower.includes('cookie')) return '🍪';
  if (titleLower.includes('cake')) return '🍰';
  if (titleLower.includes('cupcake')) return '🧁';
  if (titleLower.includes('brownie')) return '🍫';
  if (titleLower.includes('marshmallow')) return '🍡';
  if (titleLower.includes('graham cracker')) return '🍪';
  if (titleLower.includes('hot chocolate')) return '☕';
  if (titleLower.includes('lemonade')) return '🍋';
  if (titleLower.includes('smoothie')) return '🥤';
  if (titleLower.includes('milkshake')) return '🥤';
  
  // Expanded leisure/recreation/outing activities
  if (titleLower.includes('shopping')) return '🛍️';
  if (titleLower.includes('arcade')) return '🕹️';
  if (titleLower.includes('bowling')) return '🎳';
  if (titleLower.includes('relax')) return '🛀';
  if (titleLower.includes('spa')) return '💆';
  if (titleLower.includes('park')) return '🌳';
  if (titleLower.includes('zoo')) return '🦁';
  if (titleLower.includes('mall')) return '🏬';
  if (titleLower.includes('amusement')) return '🎢';
  if (titleLower.includes('trampoline')) return '🤸';
  if (titleLower.includes('laser tag')) return '🔫';
  if (titleLower.includes('mini golf')) return '⛳';
  if (titleLower.includes('show')) return '🎟️';
  if (titleLower.includes('ice skating')) return '⛸️';
  if (titleLower.includes('roller skating')) return '🛼';
  if (titleLower.includes('aquarium')) return '🐠';
  if (titleLower.includes('picnic')) return '🧺';
  if (titleLower.includes('playground')) return '🛝';
  if (titleLower.includes('fair')) return '🎡';
  if (titleLower.includes('carnival')) return '🎠';
  if (titleLower.includes('festival')) return '🎪';
  if (titleLower.includes('escape room')) return '🗝️';
  if (titleLower.includes('pottery')) return '🏺';
  if (titleLower.includes('science')) return '🔬';
  if (titleLower.includes('discovery')) return '🔎';
  if (titleLower.includes('adventure park')) return '🧗';
  if (titleLower.includes('go kart')) return '🏎️';
  if (titleLower.includes('farm')) return '🚜';
  if (titleLower.includes('animals')) return '🐾';
  
  // Common leisure activities that were showing console emoji
  if (titleLower.includes('morning activity')) return '🌅';
  if (titleLower.includes('evening program')) return '🌆';
  if (titleLower.includes('camp activity')) return '🏕️';
  if (titleLower.includes('leisure time')) return '😌';
  if (titleLower.includes('recreation')) return '🎯';
  if (titleLower.includes('fun activity')) return '🎪';
  if (titleLower.includes('program')) return '📋';
  if (titleLower.includes('activity time')) return '⏰';
  if (titleLower.includes('camp program')) return '🏕️';
  if (titleLower.includes('evening activity')) return '🌆';
  if (titleLower.includes('morning program')) return '🌅';
  if (titleLower.includes('day activity')) return '☀️';
  if (titleLower.includes('camp time')) return '🏕️';
  if (titleLower.includes('activity period')) return '⏱️';
  if (titleLower.includes('program time')) return '📅';
  if (titleLower.includes('rest period')) return '😴';
  if (titleLower.includes('leisure period')) return '😌';
  if (titleLower.includes('free period')) return '🕒';
  if (titleLower.includes('break')) return '☕';
  if (titleLower.includes('hangout')) return '🛋️';
  if (titleLower.includes('chill')) return '🧊';
  if (titleLower.includes('social')) return '🗣️';
  if (titleLower.includes('meetup')) return '🤝';
  if (titleLower.includes('group time')) return '👥';
  if (titleLower.includes('open time')) return '🕰️';
  if (titleLower.includes('downtime')) return '🛌';
  if (titleLower.includes('relaxation')) return '🧘';
  
  // Type-based fallback emojis - all different from activity emojis
  switch (type) {
    case 'spiritual': return '🙏';
    case 'adventure': return '⛰️';
    case 'educational': return '📚';
    case 'leisure':
      // Try to use a more neutral fallback for leisure
      return '🛋️';
    case 'travel': return '🚐';
    case 'cultural': return '🎨';
    default: return '📅';
  }
}

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

function analyzeCalendarEmojis(activities = sampleCalendarData) {
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
}

// Run the analysis
analyzeCalendarEmojis(); 