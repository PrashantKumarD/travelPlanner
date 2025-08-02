# 🌍 VoyageGenius - AI Travel Planner

<div align="center">
  <img src="public/logo.svg" alt="VoyageGenius Logo" width="120" height="120">
  
  <h3>✨ Plan Your Perfect Trip with AI ✨</h3>
  
  <p>A modern, intelligent travel planning application powered by Google's Gemini AI that creates personalized itineraries based on your preferences.</p>
  
  [![Live Demo](https://img.shields.io/badge/Live%20Demo-🚀%20Visit%20Site-blue?style=for-the-badge)](https://ai-travel-planner-kappa-opal.vercel.app)
  [![React](https://img.shields.io/badge/React-18.2.0-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
  [![Vite](https://img.shields.io/badge/Vite-7.0.4-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)
  [![TailwindCSS](https://img.shields.io/badge/Tailwind-4.1.11-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
  [![Firebase](https://img.shields.io/badge/Firebase-12.0.0-FFCA28?style=for-the-badge&logo=firebase)](https://firebase.google.com/)
</div>

---

## 📸 Project Screenshots

<div align="center">
  <h3>🏠 Home Page</h3>
  <img src="public/Screenshot 2025-07-23 154656.png" alt="Home Page" width="800">
  
  <h3>📝 Trip Planning Interface</h3>
  <img src="public/Screenshot 2025-07-23 154940.png" alt="Trip Planning" width="800">
  
  <h3>🗺️ Generated Itinerary</h3>
  <img src="public/Screenshot 2025-07-23 155001.png" alt="Generated Itinerary" width="800">
  
  <h3>🏨 Hotels & Recommendations</h3>
  <img src="public/Screenshot 2025-07-23 155030.png" alt="Hotels" width="800">
  
  <h3>📱 My Trips Dashboard</h3>
  <img src="public/Screenshot 2025-07-23 155049.png" alt="My Trips" width="800">
</div>

---

## ✨ Features

### 🚀 **Core Features**
- **🤖 AI-Powered Planning**: Leverage Google Gemini AI for intelligent trip generation
- **📍 Smart Location Search**: Google Places API integration for accurate destinations
- **🗓️ Flexible Duration**: Plan trips from 1 to 5 days
- **💰 Budget Options**: Choose from Low, Medium, or High budget ranges
- **👥 Group Planning**: Solo, Couple, Family, or Group travel options
- **🔐 Secure Authentication**: Google OAuth integration
- **💾 Trip Management**: Save, view, and manage all your trips

### 🎨 **User Experience**
- **📱 Responsive Design**: Beautiful UI that works on all devices
- **🌈 Premium Styling**: Modern gradient backgrounds and smooth animations
- **⚡ Fast Loading**: Optimized with Vite for lightning-fast performance
- **🔄 Smart Retry Logic**: Automatic API retry with exponential backoff
- **🖼️ Fallback Images**: Graceful handling of missing images
- **🎯 Interactive Elements**: Hover effects and smooth transitions

### 🛡️ **Technical Features**
- **🔒 CORS Policy Management**: Proper handling of cross-origin requests
- **📊 Error Handling**: Comprehensive error management and user feedback
- **🌐 SEO Optimized**: Proper meta tags and title configuration
- **🚀 Deployment Ready**: Vercel-optimized with proper routing

---

## 🛠️ Tech Stack

### **Frontend**
- **⚛️ React 18.2.0** - Modern React with hooks and functional components
- **🎨 Tailwind CSS 4.1.11** - Utility-first CSS framework
- **🏗️ Vite 7.0.4** - Next-generation frontend build tool
- **🧭 React Router DOM 7.7.0** - Declarative routing for React

### **Backend & Services**
- **🔥 Firebase 12.0.0** - Real-time database and authentication
- **🤖 Google Gemini AI** - Advanced AI for trip generation
- **🗺️ Google Places API** - Location search and photos
- **🔐 Google OAuth** - Secure authentication

### **UI Components & Icons**
- **🎛️ Radix UI** - Accessible component primitives
- **🎨 Class Variance Authority** - Type-safe variant API
- **🌟 Lucide React** - Beautiful & consistent icon pack
- **🎉 React Icons** - Popular icon libraries
- **🍞 React Hot Toast** - Smooth notification system

### **Development Tools**
- **📝 ESLint** - Code quality and consistency
- **🔧 TypeScript Support** - Type definitions for better DX
- **🎯 Vite Plugins** - React and Tailwind CSS integration

---

## 🚀 Getting Started

### **Prerequisites**
- Node.js 16.0 or higher
- npm or yarn package manager
- Google Cloud Console account (for APIs)
- Firebase account

### **Installation**

1. **Clone the repository**
   ```bash
   git clone https://github.com/PrashantKumarD/travelPlanner.git
   cd ai-travel-planner
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   # Google APIs
   VITE_GOOGLE_PLACE_API_KEY=your_google_places_api_key
   VITE_GOOGLE_AUTH_CLIENT_ID=your_google_oauth_client_id
   VITE_GOOGLE_GEMINI_AI_API_KEY=your_gemini_api_key
   
   # Firebase Configuration
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_firebase_app_id
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:5173`

---

## ⚙️ Configuration

### **Google Cloud Console Setup**

1. **Enable APIs**
   - Google Places API
   - Google Maps JavaScript API
   - Google Gemini AI API

2. **OAuth 2.0 Configuration**
   ```
   Authorized JavaScript Origins:
   - http://localhost:5173
   - https://your-domain.com
   
   Authorized Redirect URIs:
   - http://localhost:5173
   - https://your-domain.com
   ```

### **Firebase Setup**

1. Create a new Firebase project
2. Enable Firestore Database
3. Set up Google Authentication
4. Configure security rules

---

## 📁 Project Structure

```
ai-travel-planner/
├── public/                     # Static assets
│   ├── logo.svg               # App logo
│   ├── dummy.jpeg             # Fallback image
│   └── screenshots/           # Project screenshots
├── src/
│   ├── components/            # Reusable components
│   │   ├── ui/               # Base UI components
│   │   ├── custom/           # Custom components
│   │   └── layout/           # Layout components
│   ├── constants/            # App constants
│   ├── create-trip/          # Trip creation feature
│   ├── my-trips/            # User trips management
│   ├── view-trip/           # Trip viewing feature
│   ├── service/             # API services
│   ├── hooks/               # Custom React hooks
│   ├── utils/               # Utility functions
│   └── lib/                 # Library configurations
├── vercel.json              # Vercel deployment config
├── vite.config.js          # Vite configuration
└── tailwind.config.js      # Tailwind CSS config
```

---

## 🚀 Deployment

### **Vercel Deployment**

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy to Vercel**
   ```bash
   vercel --prod
   ```

3. **Set Environment Variables**
   
   Add all environment variables in Vercel dashboard

### **Build for Production**
```bash
npm run build
npm run preview
```

---

## 🎯 Features Walkthrough

### **1. Trip Planning Process**
1. **🔍 Destination Selection** - Smart location search with autocomplete
2. **📅 Duration Planning** - Choose 1-5 days for your trip
3. **💰 Budget Selection** - Pick from Low, Medium, or High budget options
4. **👥 Travel Companions** - Select solo, couple, family, or group travel
5. **🤖 AI Generation** - Let Gemini AI create your personalized itinerary

### **2. Trip Management**
- **📋 View Itineraries** - Detailed day-by-day plans
- **🏨 Hotel Recommendations** - AI-suggested accommodations
- **📍 Place Details** - Rich information about destinations
- **🗺️ Google Maps Integration** - Direct navigation links
- **💾 Save & Access** - All trips saved to your account

### **3. Smart Features**
- **🔄 Auto-Retry** - Handles API overload with exponential backoff
- **🖼️ Image Fallbacks** - Graceful handling of missing images
- **📱 Responsive Design** - Perfect on mobile, tablet, and desktop
- **🎨 Beautiful UI** - Modern design with smooth animations

---

## 🐛 Troubleshooting

### **Common Issues**

**🔐 OAuth Errors**
- Ensure authorized origins are correctly set in Google Cloud Console
- Check that the client ID matches your environment variable

**🖼️ Image Loading Issues**
- Verify Google Places API is enabled
- Check CORS policies in vite.config.js

**🤖 AI Generation Failures**
- Confirm Gemini AI API key is valid
- Check API quotas and billing status

**🔥 Firebase Connection Issues**
- Verify Firebase configuration in environment variables
- Ensure Firestore rules allow authenticated users

---

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

---

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Google** for Gemini AI, Places API, and OAuth services
- **Firebase** for backend infrastructure
- **Vercel** for hosting and deployment
- **Tailwind CSS** for the beautiful styling system
- **React Community** for the amazing ecosystem

---

## 📞 Contact & Support

<div align="center">
  
  **👨‍💻 Developer**: Prashant Kumar D
  
  **📧 Email**: kumarprashant6080@gmail.com
  
  **📱 Phone**: +(91) 9329381824
  
  **📍 Location**: Bhopal, India
  
  ---
  
  ### 🌟 If you found this project helpful, please give it a star! ⭐
  
  [![GitHub stars](https://img.shields.io/github/stars/PrashantKumarD/travelPlanner?style=social)](https://github.com/PrashantKumarD/travelPlanner/stargazers)
  
</div>

---

<div align="center">
  <h3>🚀 Ready to plan your next adventure? </h3>
  <p>
    <a href="https://ai-travel-planner-kappa-opal.vercel.app" target="_blank">
      <img src="https://img.shields.io/badge/Try%20VoyageGenius-🌍%20Start%20Planning-success?style=for-the-badge&logo=vercel" alt="Try VoyageGenius">
    </a>
  </p>
  
  <p><em>Made with ❤️ for travelers worldwide</em></p>
</div>
