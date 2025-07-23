export const SelectTravelerList=[
    {
        id:1,
        titles:'Just Me',
        desc:'A Sole traveler exploring the world',
        icon:'👤',
        people:1
    },
    {
        id:2,
        titles:'A Couple',
        desc:'A Couple exploring the world together',
        icon:'👫',
        people:2
    },
    {
        id:3,
        titles:'A Family',
        desc:'A Family exploring the world together',
        icon:'👪',
        people:'3-6 people'
    },
    {
        id:4,
        titles:'A Group',
        desc:'A Group exploring the world together',
        icon:'👥',
        people:'7-12 people'
    },
]
export const SelectBudgetOptions = [
    {
        id:1,
        title:'Low',
        desc:'Stay budget friendly',
        icon:'💰',
    },
    {
        id:2,
        title:'Medium',
        desc:'Stay within your budget',
        icon:'💸',
    },
    {
        id:3,
        title:'High',
        desc:'Spending the money wisely',
        icon:'🤑',
    }
]

export const AI_PROMPT='"Generate Travel Plan For Loaction: {location} for {totalDays} Days for {traveler} People with a {budget} Budget. Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Detail, Place Image Url, Geo Coordinates, ticket Pricing, rating, Time Travel each of the location for {totalDays} days with each day plan with best time to visit in JSON format."'