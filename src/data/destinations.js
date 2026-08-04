export const DESTINATIONS = [
  {
    id: "manali",
    name: "Manali, Himachal Pradesh",
    type: "Mountains",
    costPerDay: 2500,
    rating: 4.8,
    lat: 32.2432,
    lng: 77.1892,
    trafficStatus: "Normal",
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80",
    description: "High-altitude Himalayan resort town known for snow peaks, adventure sports, and scenic valleys.",
    weather: {
      type: "Cool",
      temp: "4°C",
      condition: "Snowy"
    },
    attractions: ["Solang Valley", "Rohtang Pass", "Hadimba Temple", "Old Manali"]
  },
  {
    id: "goa",
    name: "Goa Beaches",
    type: "Beaches",
    costPerDay: 1800,
    rating: 4.6,
    lat: 15.2993,
    lng: 74.124,
    trafficStatus: "Busy",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80",
    description: "Famous tropical paradise offering golden beaches, water sports, vibrant nightlife, and Portuguese architecture.",
    weather: {
      type: "Mild",
      temp: "28°C",
      condition: "Sunny"
    },
    attractions: ["Baga Beach", "Calangute Beach", "Dudhsagar Falls", "Fort Aguada"]
  },
  {
    id: "jaipur",
    name: "Jaipur, Rajasthan",
    type: "Heritage",
    costPerDay: 2200,
    rating: 4.7,
    lat: 26.9124,
    lng: 75.7873,
    trafficStatus: "Overcrowded",
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80",
    description: "The capital of Rajasthan, famous for iconic pink palaces, majestic hill forts, and rich royal culture.",
    weather: {
      type: "Mild",
      temp: "22°C",
      condition: "Pleasant"
    },
    attractions: ["Amer Fort", "Hawa Mahal", "City Palace", "Jantar Mantar"]
  },
  {
    id: "munnar",
    name: "Munnar, Kerala",
    type: "Mountains",
    costPerDay: 2000,
    rating: 4.9,
    lat: 10.0889,
    lng: 77.0595,
    trafficStatus: "Normal",
    image: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=80",
    description: "Serene hill station in the Western Ghats surrounded by rolling tea plantations, mist-covered hills, and waterfalls.",
    weather: {
      type: "Cool",
      temp: "16°C",
      condition: "Misty"
    },
    attractions: ["Tea Museum", "Eravikulam National Park", "Mattupetty Dam", "Anamudi Peak"]
  },
  {
    id: "ladakh",
    name: "Leh Ladakh, Jammu & Kashmir",
    type: "Mountains",
    costPerDay: 3200,
    rating: 4.9,
    lat: 34.1526,
    lng: 77.5771,
    trafficStatus: "Normal",
    image: "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=800&q=80",
    description: "Breathtaking high-desert landscape featuring pristine blue lakes, Buddhist monasteries, and high mountain passes.",
    weather: {
      type: "Cool",
      temp: "-2°C",
      condition: "Crisp & Cold"
    },
    attractions: ["Pangong Lake", "Nubra Valley", "Magnetic Hill", "Thiksey Monastery"]
  },
  {
    id: "udaipur",
    name: "Udaipur, Rajasthan",
    type: "Heritage",
    costPerDay: 2600,
    rating: 4.8,
    lat: 24.5854,
    lng: 73.7125,
    trafficStatus: "Busy",
    image: "https://images.unsplash.com/photo-1615836245337-f5b9b2303f1c?auto=format&fit=crop&w=800&q=80",
    description: "Known as the City of Lakes, celebrated for lavish palaces, romantic boat cruises, and regal architecture.",
    weather: {
      type: "Mild",
      temp: "24°C",
      condition: "Clear Sky"
    },
    attractions: ["City Palace", "Lake Pichola", "Jag Mandir", "Saheliyon-ki-Bari"]
  },
  {
    id: "rishikesh",
    name: "Rishikesh, Uttarakhand",
    type: "Mountains",
    costPerDay: 1500,
    rating: 4.7,
    lat: 30.0869,
    lng: 78.2676,
    trafficStatus: "Normal",
    image: "https://images.unsplash.com/photo-1598970434795-0c54fe7c0648?auto=format&fit=crop&w=800&q=80",
    description: "Spiritual capital along the holy Ganges, world-famous for white-water river rafting, yoga retreats, and evening Aarti.",
    weather: {
      type: "Mild",
      temp: "19°C",
      condition: "Pleasant"
    },
    attractions: ["Laxman Jhula", "Triveni Ghat", "Beatles Ashram", "Shivpuri Rafting Point"]
  },
  {
    id: "ooty",
    name: "Ooty, Tamil Nadu",
    type: "Mountains",
    costPerDay: 2100,
    rating: 4.5,
    lat: 11.4102,
    lng: 76.695,
    trafficStatus: "Busy",
    image: "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=800&q=80",
    description: "Queen of Hill Stations set amid the Nilgiri Hills, offering colonial charm, botanical gardens, and toy train rides.",
    weather: {
      type: "Cool",
      temp: "12°C",
      condition: "Cloudy"
    },
    attractions: ["Ooty Lake", "Doddabetta Peak", "Botanical Gardens", "Nilgiri Mountain Railway"]
  },
  {
    id: "varanasi",
    name: "Varanasi, Uttar Pradesh",
    type: "Heritage",
    costPerDay: 1400,
    rating: 4.6,
    lat: 25.3176,
    lng: 82.9739,
    trafficStatus: "Overcrowded",
    image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80",
    description: "One of the oldest living cities in the world, renowned for ancient ghats along the sacred Ganges river.",
    weather: {
      type: "Mild",
      temp: "23°C",
      condition: "Warm"
    },
    attractions: ["Dashashwamedh Ghat", "Kashi Vishwanath Temple", "Assi Ghat", "Sarnath"]
  },
  {
    id: "andaman",
    name: "Andaman Islands",
    type: "Beaches",
    costPerDay: 3500,
    rating: 4.9,
    lat: 11.7401,
    lng: 92.6586,
    trafficStatus: "Normal",
    image: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=800&q=80",
    description: "Exotic archipelago boasting crystal clear turquoise waters, pristine white sand, and vibrant coral reefs.",
    weather: {
      type: "Mild",
      temp: "29°C",
      condition: "Tropical Sunny"
    },
    attractions: ["Radhanagar Beach", "Cellular Jail", "Elephant Beach", "Ross Island"]
  }
];