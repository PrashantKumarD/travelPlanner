import { GoogleGenerativeAI } from "@google/generative-ai";
const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY;

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const generationConfig = {
  responseMimeType: "application/json",
};

const history = [
  {
    role: "user",
    parts: [
      {
        text: "Generate Travel Plan For Loaction: New York City for 5 days for couple with a Cheap Budget. Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Detail, Place Image Url, Geo Coordinates, ticket Pricing, rating, Time Travel each of the location for 3 days with each day plan with best time to visit in JSON format. Make the itinerary an array where each element is a map representing a day.",
      },
    ],
  },
  {
    role: "model",
    parts: [
      {
        text: JSON.stringify({
          "hotels": [
            {
              "hotelName": "Pod 51",
              "hotelAddress": "230 E 51st St, New York, NY 10022",
              "price": "Approx $120 per night",
              "hotelImageUrl": "https://images.trvl-media.com/lodging/2000000/1300000/1290300/1290234/c6c3e9a1.jpg?impolicy=resizecrop&rw=1200&ra=fit",
              "geoCoordinates": "40.7562, -73.9680",
              "rating": "4.1",
              "description": "A trendy and budget-friendly hotel offering compact, smart rooms in Midtown East, close to major attractions."
            },
            {
              "hotelName": "The Jane Hotel",
              "hotelAddress": "113 Jane St, New York, NY 10014",
              "price": "Approx $99 per night",
              "hotelImageUrl": "https://images.trvl-media.com/lodging/3000000/2150000/2144700/2144686/2c7595b2.jpg?impolicy=resizecrop&rw=1200&ra=fit",
              "geoCoordinates": "40.7390, -74.0094",
              "rating": "3.8",
              "description": "Located in the West Village, this historic hotel offers cozy, cabin-like rooms and a unique, vintage atmosphere."
            },
            {
              "hotelName": "HI New York City Hostel",
              "hotelAddress": "891 Amsterdam Ave, New York, NY 10025",
              "price": "Approx $50 per night (dorm) / $130 (private room)",
              "hotelImageUrl": "https://images.trvl-media.com/lodging/1000000/440000/432600/432587/057f92b3.jpg?impolicy=resizecrop&rw=1200&ra=fit",
              "geoCoordinates": "40.7989, -73.9664",
              "rating": "4.3",
              "description": "A highly-rated hostel on the Upper West Side, offering both shared and private rooms. A great way to save money and meet other travelers."
            }
          ],
          "bestTimeToVisit": "The best time to visit for a budget-friendly trip is during the shoulder seasons: Spring (April to early June) or Fall (September to early November). The weather is pleasant, and flight/hotel prices are lower than the summer peak and holiday season.",
          "itinerary": [
            {
              "day": 1,
              "plan": "Exploring Lower Manhattan & Iconic Landmarks",
              "locations": [
                {
                  "placeName": "Staten Island Ferry",
                  "placeDetail": "Enjoy a free ferry ride that offers fantastic views of the Statue of Liberty and the Manhattan skyline. A classic NYC budget experience.",
                  "placeImageUrl": "https://www.nyc.gov/assets/media/images/gallery/staten-island-ferry/staten-island-ferry_1.jpg",
                  "geoCoordinates": "40.6449, -74.0740",
                  "ticketPricing": "Free",
                  "rating": "4.7",
                  "travelTime": "Round trip takes about 50 minutes."
                },
                {
                  "placeName": "Financial District & 9/11 Memorial",
                  "placeDetail": "Walk through Wall Street, see the Charging Bull statue, and then visit the 9/11 Memorial pools. The memorial is free to visit, though the museum has an entrance fee.",
                  "placeImageUrl": "https://www.911memorial.org/sites/default/files/styles/md_landscape/public/2022-03/20190520_911M_1456_CC.jpg",
                  "geoCoordinates": "40.7115, -74.0125",
                  "ticketPricing": "Memorial: Free; Museum: ~$26",
                  "rating": "4.8",
                  "travelTime": "2-3 hours exploration."
                },
                {
                  "placeName": "Brooklyn Bridge",
                  "placeDetail": "Walk across the iconic Brooklyn Bridge from the Brooklyn side towards Manhattan for breathtaking skyline views, especially around sunset.",
                  "placeImageUrl": "https://media.cntraveler.com/photos/5a74a33c1a83053a47314417/16:9/w_2560,c_limit/Brooklyn-Bridge-GettyImages-639535388.jpg",
                  "geoCoordinates": "40.7061, -73.9969",
                  "ticketPricing": "Free",
                  "rating": "4.8",
                  "travelTime": "45-60 minutes to walk across."
                }
              ]
            },
            {
              "day": 2,
              "plan": "Midtown Manhattan Marvels",
              "locations": [
                {
                  "placeName": "Times Square & Broadway",
                  "placeDetail": "Experience the vibrant, chaotic energy of Times Square. While you're here, consider getting last-minute, discounted Broadway show tickets from the TKTS booth.",
                  "placeImageUrl": "https://www.travelandleisure.com/thmb/R2EpzDndyYv4F2a2i-mLsQhB8eM=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/new-york-city-evening-TIMESQUARE0421-50e332c1e878491a89635b44d3393226.jpg",
                  "geoCoordinates": "40.7580, -73.9855",
                  "ticketPricing": "Free to visit; Show tickets vary widely.",
                  "rating": "4.4",
                  "travelTime": "1-2 hours of exploration."
                },
                {
                  "placeName": "New York Public Library & Bryant Park",
                  "placeDetail": "Visit the stunning Rose Main Reading Room at the NYPL, then relax in the adjacent Bryant Park, a beautiful urban oasis.",
                  "placeImageUrl": "https://static01.nyt.com/images/2016/08/17/arts/17LIBRARYJP1/17LIBRARYJP1-superJumbo.jpg",
                  "geoCoordinates": "40.7532, -73.9822",
                  "ticketPricing": "Free",
                  "rating": "4.8",
                  "travelTime": "1.5 hours."
                },
                {
                  "placeName": "Grand Central Terminal",
                  "placeDetail": "More than just a train station, it's an architectural masterpiece. Admire the celestial ceiling in the Main Concourse and feel the history.",
                  "placeImageUrl": "https://www.grandcentralterminal.com/wp-content/uploads/2023/12/GCT_1010_V3_MainConcourse_Web-scaled.jpg",
                  "geoCoordinates": "40.7527, -73.9772",
                  "ticketPricing": "Free",
                  "rating": "4.7",
                  "travelTime": "30-45 minutes."
                }
              ]
            },
            {
              "day": 3,
              "plan": "Art, Parks, and Culture",
              "locations": [
                {
                  "placeName": "Central Park",
                  "placeDetail": "Spend the morning exploring a section of this massive urban park. Visit Strawberry Fields, Bethesda Terrace, or simply wander the paths.",
                  "placeImageUrl": "https://www.centralpark.com/downloads/6932/download/bethesda-terrace.jpg?cb=7433431a47347a86f918e33282a3c761",
                  "geoCoordinates": "40.785091, -73.968285",
                  "ticketPricing": "Free",
                  "rating": "4.8",
                  "travelTime": "2-4 hours, depending on how much you explore."
                },
                {
                  "placeName": "The High Line",
                  "placeDetail": "Walk along this elevated park built on a former railway. It offers unique views of the city and is filled with art installations and gardens.",
                  "placeImageUrl": "https://www.thehighline.org/wp-content/uploads/2023/06/visit-timessquare-alliance-mariliran-2023-018-v1-scaled-e1687455828458.jpg",
                  "geoCoordinates": "40.7479, -74.0048",
                  "ticketPricing": "Free",
                  "rating": "4.7",
                  "travelTime": "1-1.5 hours to walk its length."
                },
                {
                  "placeName": "Greenwich Village",
                  "placeDetail": "Explore the charming, historic streets of 'the Village.' It's known for its bohemian past, Washington Square Park, and cozy cafes. A great place to wander and soak in the atmosphere.",
                  "placeImageUrl": "https://www.nyc.gov/assets/sbs/images/content/pages/washington-square-park_16x9.jpg",
                  "geoCoordinates": "40.7336, -74.0011",
                  "ticketPricing": "Free",
                  "rating": "4.6",
                  "travelTime": "2-3 hours of exploration."
                }
              ]
            }
          ]
        }),
      },
    ],
  },
];

export const chatSession = model.startChat({
  generationConfig,
  history,
});