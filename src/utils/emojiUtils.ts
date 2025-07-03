export const getEventEmoji = (title: string, type: string) => {
  const titleLower = title.toLowerCase();

  // Direct lookup for known fallback activities
  const fallbackEmojiMap = {
    'fun': '🎉',
    "shiva assur b'tammuz": '🕊️',
    'neot kedumim': '🌾',
    'raft building': '🛶',
    'goat herding': '🐐',
    'goodbye :(': '👋',
    'tefillin at army base': '🕯️',
    "akko's tunisian synagogue": '🕍',
    'rosh hanikra': '🏞️',
    'tiveria tayelet': '🚶‍♂️',
    'aqua kef': '💦',
    'rechov yerushalayim': '🏙️',
    'biking the kineret': '🚴',
    'meiron': '🕍',
    'chevron': '🏘️',
    'shuva- grill for the soldiers': '🍖',
    'ein mabua': '💧',
    'susya': '🏜️',
    'sleep at gemalia desert oasis': '🏜️',
    "s'dei chemed's got talent": '🎤',
  };
  const normalized = title.trim().toLowerCase();
  if (fallbackEmojiMap[normalized]) return fallbackEmojiMap[normalized];

  // Robust, exact match for fallback leisure activities
  if (titleLower === 'unwind session') return '🫧';
  if (titleLower === 'personal time') return '🤍';
  if (titleLower === 'reflection') return '🤔';
  if (titleLower === 'quiet hour') return '🤫';
  if (titleLower === 'open block') return '📦';
  if (titleLower === 'flex time') return '🔄';
  if (titleLower === 'group hangout') return '👥';
  if (titleLower === 'chill session') return '🧊';
  if (titleLower === 'social hour') return '🗣️';
  if (titleLower === 'free period') return '🕒';
  if (titleLower === 'break time') return '☕';
  if (titleLower === 'relaxation') return '🧘';
  
  // Specific emoji rules for activities that were showing leisure fallback
  if (titleLower.includes('kever')) return '🕯️'; // Tomb/grave sites
  if (titleLower.includes('orientation')) return '📋';
  if (titleLower.includes('welcome')) return '👋';
  if (titleLower.includes('departure')) return '✈️';
  if (titleLower.includes('arrival')) return '🚌';
  if (titleLower.includes('check in')) return '📝';
  if (titleLower.includes('check out')) return '📋';
  if (titleLower.includes('camp day')) return '🏕️';
  if (titleLower.includes('chill day')) return '😌';
  if (titleLower.includes('sports')) return '⚽';
  if (titleLower.includes('gaga')) return '🏃';
  if (titleLower.includes('dodgeball')) return '⚾';
  if (titleLower.includes('capture the flag')) return '🚩';
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
  if (titleLower.includes('boys start')) return '🚀';
  if (titleLower.includes('boys end')) return '🏁';
  if (titleLower.includes('talent show')) return '🎭';
  if (titleLower.includes('improv')) return '🎪';
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
  
  // Additional common camp activities
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
  
  // Additional leisure activities that need specific emojis
  if (titleLower === 'unwind session') return '🫧';
  if (titleLower === 'personal time') return '🤍';
  if (titleLower === 'reflection') return '🤔';
  if (titleLower === 'quiet hour') return '🤫';
  if (titleLower === 'open block') return '📦';
  if (titleLower === 'flex time') return '🔄';
  if (titleLower === 'group hangout') return '👥';
  
  // Additional camp games and activities
  if (titleLower.includes('capture the flag')) return '🚩';
  if (titleLower.includes('tug of war')) return '🪢';
  if (titleLower.includes('scavenger hunt')) return '🔍';
  if (titleLower.includes('relay race')) return '🏃';
  if (titleLower.includes('obstacle course')) return '🏃‍♂️';
  if (titleLower.includes('talent show')) return '🎭';
  if (titleLower.includes('campfire')) return '🔥';
  if (titleLower.includes('smores')) return '🍫';
  if (titleLower.includes('water balloon')) return '💧';
  if (titleLower.includes('slip n slide')) return '💦';
  if (titleLower.includes('dodgeball')) return '🥎';
  if (titleLower.includes('board game')) return '🎲';
  if (titleLower.includes('movie night')) return '🎬';
  if (titleLower.includes('karaoke')) return '🎤';
  if (titleLower.includes('arts & crafts')) return '🎨';
  if (titleLower.includes('ice cream')) return '🍦';
  if (titleLower.includes('pizza party')) return '🍕';
  if (titleLower.includes('bbq')) return '🍖';
  if (titleLower.includes('pool party')) return '🏊';
  if (titleLower.includes('hiking')) return '🥾';
  if (titleLower.includes('archery')) return '🏹';
  if (titleLower.includes('paintball')) return '🎨';
  if (titleLower.includes('laser tag')) return '🔫';
  if (titleLower.includes('camp olympics')) return '🏅';
  if (titleLower.includes('camp dance')) return '💃';
  if (titleLower.includes('camp graduation')) return '🎓';
  
  // Additional spiritual and cultural activities
  if (titleLower.includes('shiur')) return '📚';
  if (titleLower.includes('davening')) return '🙏';
  if (titleLower.includes('kiddush')) return '🍷';
  if (titleLower.includes('fabrengen')) return '🎉';
  if (titleLower.includes('kumzits')) return '🎵';
  if (titleLower.includes('boys start')) return '🚀';
  if (titleLower.includes('boys end')) return '🏁';
  
  // Additional adventure and outdoor activities
  if (titleLower.includes('masada')) return '🏜️';
  if (titleLower.includes('dead sea')) return '🌊';
  if (titleLower.includes('golan')) return '⛰️';
  if (titleLower.includes('rafting')) return '🛶';
  if (titleLower.includes('donkey')) return '🦙';
  if (titleLower.includes('snorkeling')) return '🤿';
  if (titleLower.includes('scuba')) return '🤿';
  if (titleLower.includes('glass')) return '🪟';
  if (titleLower.includes('dig')) return '⛏️';
  if (titleLower.includes('atv')) return '🏎️';
  if (titleLower.includes('boat')) return '⛵';
  if (titleLower.includes('sailing')) return '⛵';
  if (titleLower.includes('wall') || titleLower.includes('kotel')) return '🕊️';
  if (titleLower.includes('museum')) return '🏛️';
  if (titleLower.includes('market') || titleLower.includes('shuk')) return '🛒';
  if (titleLower.includes('beach') || titleLower.includes('eilat')) return '🏖️';
  if (titleLower.includes('yurts') || titleLower.includes('overnight')) return '⛺';
  if (titleLower.includes('old city')) return '🏰';
  if (titleLower.includes('tzfat') || titleLower.includes('tzfas')) return '🏔️';
  
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

  // Normalization for robust matching
  const norm = (str) => str.toLowerCase().replace(/[^a-z0-9]+/g, '').trim();
  const normTitle = norm(title);

  // Robust fallback mappings for your calendar (broad substring matching)
  if (normTitle.includes('fun')) return '🎉';
  if (normTitle.includes('shiva') || normTitle.includes('assur')) return '🕊️';
  if (normTitle.includes('kedumim')) return '🌾';
  if (normTitle.includes('raft')) return '🛶';
  if (normTitle.includes('goat')) return '🐐';
  if (normTitle.includes('goodbye')) return '👋';
  if (normTitle.includes('shivaassurbtammuz')) return '🕊️';
  if (normTitle.includes('neotkedumim')) return '🌾';
  if (normTitle.includes('aqua') || normTitle.includes('kef')) return '💦';
  if (normTitle.includes('rechov') || normTitle.includes('yerushalayim')) return '🏙️';
  if (normTitle.includes('biking') || normTitle.includes('kineret')) return '🚴';
  if (normTitle.includes('meiron')) return '🕍';
  if (normTitle.includes('chevron')) return '🏘️';
  if (normTitle.includes('shuva') && normTitle.includes('grill')) return '🍖';
  if (normTitle.includes('ein') && normTitle.includes('mabua')) return '💧';
  if (normTitle.includes('susya')) return '🏜️';
  if (normTitle.includes('gemalia') || normTitle.includes('oasis')) return '🏜️';
  if (normTitle.includes('talent')) return '🎤';
  if (normTitle.includes('goodbye')) return '👋';
}; 