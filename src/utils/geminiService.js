export async function generateLiveItinerary(destination, duration, pace) {
  const daysCount = parseInt(duration) || 3;
  const mockPlan = [];

  const destinationDatabase = {
    "Goa Beaches": {
      category: "Coastal & Heritage",
      spots: [
        { name: "Aguada Fort & Lighthouse", timeRelaxed: "10:00 AM", timeBalanced: "09:00 AM", timePacked: "07:30 AM", desc: "Explore the 17th-century Portuguese stone bastions and old lighthouse with sweeping views of the Arabian Sea." },
        { name: "Basilica of Bom Jesus", timeRelaxed: "10:30 AM", timeBalanced: "09:30 AM", timePacked: "08:15 AM", desc: "Admire the world-renowned UNESCO World Heritage site holding the sacred tomb of St. Francis Xavier." },
        { name: "Anjuna Flea Market & Cliff", timeRelaxed: "11:00 AM", timeBalanced: "10:00 AM", timePacked: "09:00 AM", desc: "Stroll through bohemian seaside stalls offering handmade crafts, jewelry, and scenic red-cliff backdrops." },
        { name: "Dudhsagar Waterfalls Trail", timeRelaxed: "09:30 AM", timeBalanced: "08:30 AM", timePacked: "07:00 AM", desc: "Take a jeep safari through Bhagwan Mahaveer Sanctuary to witness the majestic four-tiered waterfall." },
        { name: "Palolem Beach & Silent Noise", timeRelaxed: "11:30 AM", timeBalanced: "10:30 AM", timePacked: "09:30 AM", desc: "Unwind on the crescent-shaped golden sands framed by lush green headlands and swaying palms." }
      ],
      dining: [
        { title: "Goan Fish Curry Lunch at Ritz Classic", time: "01:30 PM", desc: "Savor authentic Goan prawn curry, rice, and racefish delicacies in Panjim." },
        { title: "Beach Shack Seafood Feast at Curlies", time: "01:00 PM", desc: "Enjoy grilled catch-of-the-day and coastal beverages right on the Anjuna shoreline." },
        { title: "Café hopping in Fontainhas Latin Quarter", time: "01:15 PM", desc: "Taste bebinca and traditional Portuguese-influenced snacks amidst colourful heritage homes." }
      ],
      evenings: [
        { title: "Mandovi River Sunset Cruise", time: "05:30 PM", desc: "Glide down the river with traditional folk dance performances and golden twilight skies." },
        { title: "Chapora Fort Twilight View", time: "05:00 PM", desc: "Hike up the historic fort ruins popularized by Dil Chahta Hai for panoramic sunset views." },
        { title: "Vagator Beach Bonfire & Music", time: "06:30 PM", desc: "Experience the chilled-out coastal nightlife as the stars light up the Arabian Sea horizon." }
      ]
    },
    "Jaipur, Rajasthan": {
      category: "Royal Heritage",
      spots: [
        { name: "Amer Fort & Elephant Courtyard", timeRelaxed: "10:00 AM", timeBalanced: "08:30 AM", timePacked: "07:30 AM", desc: "Walk through grand gateways, pillared halls, and the breathtaking mirror-inlaid Sheesh Mahal." },
        { name: "Hawa Mahal (Palace of Winds)", timeRelaxed: "10:30 AM", timeBalanced: "09:30 AM", timePacked: "08:30 AM", desc: "Marvel at the five-story honeycomb pink sandstone facade built for royal women to observe street life." },
        { name: "City Palace & Museum", timeRelaxed: "11:00 AM", timeBalanced: "10:00 AM", timePacked: "09:15 AM", desc: "Explore royal residential courtyards, textile galleries, and silver vessels in the heart of the old city." },
        { name: "Jantar Mantar Observatory", timeRelaxed: "11:30 AM", timeBalanced: "10:30 AM", timePacked: "09:45 AM", desc: "Examine massive stone architectural instruments built in the 18th century to track stars and time." },
        { name: "Albert Hall Museum & Gardens", timeRelaxed: "10:15 AM", timeBalanced: "09:00 AM", timePacked: "08:00 AM", desc: "Appreciate Indo-Saracenic architecture housing ancient artifacts, carpets, and Egyptian mummies." }
      ],
      dining: [
        { title: "Royal Rajasthani Thali at Chokhi Dhani", time: "01:30 PM", desc: "Feast on traditional dal bati churma and gatte ki sabzi served with authentic hospitality." },
        { title: "Traditional Thali at Laxmi Misthan Bhandar", time: "01:00 PM", desc: "Savor legendary old-city sweets, pyaaz kachori, and authentic Rajasthani curries." },
        { title: "Rooftop Dining at Wind View Cafe", time: "01:15 PM", desc: "Dine directly facing the magnificent facade of Hawa Mahal with spiced teas and snacks." }
      ],
      evenings: [
        { title: "Nahargarh Fort Sunset Panorama", time: "05:30 PM", desc: "Watch the sun sink below the horizon, bathing the entire Pink City in golden twilight lights." },
        { title: "Patrika Gate Evening Lighting", time: "05:00 PM", desc: "Stroll through the vibrant, hand-painted hand-carved arches reflecting Rajasthani history." },
        { title: "Johari Bazaar Traditional Shopping", time: "06:00 PM", desc: "Browse bustling markets famous for Kundan jewelry, bandhani textiles, and mojris." }
      ]
    },
    "Manali, Himachal Pradesh": {
      category: "Alpine Mountains",
      spots: [
        { name: "Solang Valley Adventure Hub", timeRelaxed: "10:00 AM", timeBalanced: "09:00 AM", timePacked: "07:30 AM", desc: "Surround yourself with snow-capped peaks, high-altitude paragliding, and cable car rides." },
        { name: "Hadimba Temple Cedar Forest", timeRelaxed: "10:30 AM", timeBalanced: "09:30 AM", timePacked: "08:15 AM", desc: "Walk beneath ancient towering pine trees to visit the historic four-tiered wooden pagoda temple." },
        { name: "Atal Tunnel & Sissu Waterfalls", timeRelaxed: "09:00 AM", timeBalanced: "08:00 AM", timePacked: "07:00 AM", desc: "Drive through the engineering marvel tunnel into Lahaul valley to view breathtaking glacier falls." },
        { name: "Jogini Waterfall Nature Trail", timeRelaxed: "11:00 AM", timeBalanced: "10:00 AM", timePacked: "09:00 AM", desc: "Hike through apple orchards and mountain streams up to a dramatic cascading waterfall." },
        { name: "Vashisht Hot Sulphur Springs", timeRelaxed: "11:30 AM", timeBalanced: "10:30 AM", timePacked: "09:45 AM", desc: "Relax and rejuvenate in natural thermal mineral water springs housed in a traditional village." }
      ],
      dining: [
        { title: "Mountain Cafe Lunch in Old Manali", time: "01:30 PM", desc: "Enjoy wood-fired pizza, organic herbal teas, and Tibetan thukpa at a bohemian cafe." },
        { title: "Riverside Trout Fish Meal", time: "01:00 PM", desc: "Relish freshly caught river trout cooked with local Himalayan spices beside the Beas River." },
        { title: "Tibetan Momos at Mall Road", time: "01:15 PM", desc: "Sample steaming hot vegetable and chicken momos with fiery red chili chutney." }
      ],
      evenings: [
        { title: "Mall Road Stroll & Handicrafts", time: "05:30 PM", desc: "Shop for authentic Kullu shawls, wooden souvenirs, and local apple preserves." },
        { title: "Old Manali Live Acoustic Music", time: "06:00 PM", desc: "Unwind at cozy mountain venues featuring live indie bands and warm bonfires." },
        { title: "Beas River Bank Stargazing", time: "07:00 PM", desc: "Listen to the rushing mountain waters under a clear, starry Himalayan night sky." }
      ]
    },
    "Darjeeling, West Bengal": {
      category: "Misty Hills & Tea",
      spots: [
        { name: "Tiger Hill Sunrise Viewpoint", timeRelaxed: "05:00 AM", timeBalanced: "04:30 AM", timePacked: "04:00 AM", desc: "Witness golden morning sunlight illuminate the snow crests of Mount Kanchenjunga." },
        { name: "Darjeeling Himalayan Toy Train", timeRelaxed: "11:00 AM", timeBalanced: "10:00 AM", timePacked: "09:00 AM", desc: "Experience the UNESCO World Heritage steam locomotive chugging along mountain ridges." },
        { name: "Batasia Loop War Memorial", timeRelaxed: "11:30 AM", timeBalanced: "10:30 AM", timePacked: "09:45 AM", desc: "View the spiral railway loop surrounded by manicured gardens and sweeping valley vistas." },
        { name: "Happy Valley Tea Estate", timeRelaxed: "10:00 AM", timeBalanced: "09:00 AM", timePacked: "08:15 AM", desc: "Walk through lush green terraced slopes and observe traditional orthodox tea leaf processing." },
        { name: "Japanese Peace Pagoda", timeRelaxed: "03:30 PM", timeBalanced: "02:30 PM", timePacked: "01:30 PM", desc: "Find supreme calm and spiritual tranquility at the white Buddhist dome overlooking the hills." }
      ],
      dining: [
        { title: "Authentic Nepali Thali at Kunga Restaurant", time: "01:30 PM", desc: "Dine on hearty pork or vegetable dumplings, soup, and traditional rice dishes." },
        { title: "British Era Breakfast at Glenary's", time: "09:30 AM", desc: "Enjoy fresh pastries, baked pies, and Darjeeling first-flush tea with colonial ambience." },
        { title: "Tibetan Thukpa at Sonam's Kitchen", time: "01:00 PM", desc: "Savor freshly brewed artisanal coffee and nourishing noodle soups in a cozy nook." }
      ],
      evenings: [
        { title: "Chowrasta Mall Road Twilight Walk", time: "05:30 PM", desc: "Stroll the open-air pedestrian square surrounded by misty mountain air and cheerful chatter." },
        { name: "Observatory Hill Sunset Prayer Flags", time: "05:00 PM", desc: "Watch the mist roll over colorful Buddhist prayer flags fluttering against the dusk sky." },
        { name: "Himalayan Mountaineering Institute Walk", time: "04:30 PM", desc: "Explore mountaineering history and artifacts from legendary Everest expeditions." }
      ]
    }
  };

  const matchedKey = Object.keys(destinationDatabase).find(k => k.toLowerCase().includes(destination.toLowerCase())) || "Goa Beaches";
  const data = destinationDatabase[matchedKey] || destinationDatabase["Goa Beaches"];

  for (let i = 1; i <= daysCount; i++) {
    const spot = data.spots[(i - 1) % data.spots.length];
    const food = data.dining[(i - 1) % data.dining.length];
    const eve = data.evenings[(i - 1) % data.evenings.length];

    let activities = [];

    if (pace === "Relaxed") {
      activities = [
        { time: spot.timeRelaxed, title: `Morning Leisure: ${spot.name}`, desc: `${spot.desc} Take your time with extended photo and coffee breaks.` },
        { time: food.time, title: food.title, desc: `${food.desc} Enjoy a slow-paced dining experience.` },
        { time: eve.time, title: eve.title, desc: `${eve.desc} A peaceful, unhurried wrap-up to your day.` }
      ];
    } else if (pace === "Packed") {
      activities = [
        { time: spot.timePacked, title: `Early Exploration: ${spot.name}`, desc: `${spot.desc} Beat the tourist crowds with an early morning entry.` },
        { time: "10:30 AM", title: `Secondary Landmark Tour`, desc: `Explore nearby architectural highlights and historical viewpoints.` },
        { time: food.time, title: food.title, desc: `${food.desc} Quick energetic lunch stop.` },
        { time: "03:30 PM", title: `Local Museum or Garden Walk`, desc: `Dive deeper into regional heritage and culture.` },
        { time: eve.time, title: eve.title, desc: `${eve.desc} High-energy evening finish with local nightlife or street markets.` }
      ];
    } else {
      // Balanced
      activities = [
        { time: spot.timeBalanced, title: `Morning Sightseeing: ${spot.name}`, desc: spot.desc },
        { time: food.time, title: food.title, desc: food.desc },
        { time: eve.time, title: eve.title, desc: eve.desc }
      ];
    }

    mockPlan.push({
      dayNumber: i,
      title: `Day ${i}: ${spot.name} & Surroundings (${pace} Pace)`,
      activities
    });
  }

  return mockPlan;
}