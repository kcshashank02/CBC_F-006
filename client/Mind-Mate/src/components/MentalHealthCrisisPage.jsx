import { useState } from 'react';
import { Phone, Heart, MapPin, Globe, Info, Search, ExternalLink, MessageSquare, Laptop, Clock } from 'lucide-react';

export default function MentalHealthCrisisPage() {
  const [activeTab, setActiveTab] = useState('immediate');
  const [searchTerm, setSearchTerm] = useState('');
  
  const resources = {
    immediate: [
      {
        name: "National Suicide Prevention Lifeline",
        description: "24/7, free and confidential support for people in distress",
        contact: "988",
        website: "988lifeline.org",
        icon: <Phone />
      },
      {
        name: "Crisis Text Line",
        description: "Free 24/7 text line for those in crisis",
        contact: "Text HOME to 741741",
        website: "crisistextline.org",
        icon: <MessageSquare />
      },
      {
        name: "Veterans Crisis Line",
        description: "Connect with caring responders, many of whom are Veterans themselves",
        contact: "988, Press 1",
        website: "veteranscrisisline.net",
        icon: <Phone />
      },
      {
        name: "Trevor Project (LGBTQ+)",
        description: "Crisis intervention and suicide prevention for LGBTQ+ youth",
        contact: "1-866-488-7386",
        website: "thetrevorproject.org",
        icon: <Heart />
      }
    ],
    local: [
      {
        name: "Community Mental Health Centers",
        description: "Local centers providing mental health services",
        contact: "Search by location",
        website: "findtreatment.samhsa.gov",
        icon: <MapPin />
      },
      {
        name: "Emergency Rooms",
        description: "For immediate medical attention during a crisis",
        contact: "911 for emergencies",
        website: "",
        icon: <Info />
      },
      {
        name: "Mobile Crisis Units",
        description: "Teams that come to you during a mental health emergency",
        contact: "Varies by location",
        website: "",
        icon: <MapPin />
      },
      {
        name: "Warmlines",
        description: "Non-crisis support lines operated locally",
        contact: "Varies by location",
        website: "warmline.org",
        icon: <Phone />
      }
    ],
    online: [
      {
        name: "7 Cups",
        description: "Online therapy and free support",
        contact: "",
        website: "7cups.com",
        icon: <Globe />
      },
      {
        name: "BetterHelp",
        description: "Online counseling platform",
        contact: "",
        website: "betterhelp.com",
        icon: <Laptop />
      },
      {
        name: "Talkspace",
        description: "Online therapy with licensed therapists",
        contact: "",
        website: "talkspace.com",
        icon: <MessageSquare />
      },
      {
        name: "SAMHSA Treatment Locator",
        description: "Find treatment facilities confidentially and anonymously",
        contact: "1-800-662-HELP (4357)",
        website: "findtreatment.samhsa.gov",
        icon: <Search />
      }
    ]
  };

  const filteredResources = resources[activeTab].filter(resource => 
    resource.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    resource.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-sky-100 px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-sky-800 mb-2">Mental Health Crisis Resources</h1>
          <p className="text-sky-700 max-w-2xl mx-auto">
            If you or someone you know is struggling, help is available. You are not alone.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="bg-sky-50 border border-sky-200 rounded-lg p-4 mb-6">
            <div className="flex items-center text-sky-800">
              <Info className="mr-2 flex-shrink-0" size={20} />
              <p className="font-medium">If you're experiencing a life-threatening emergency, call <span className="font-bold">911</span> or go to your nearest emergency room immediately.</p>
            </div>
          </div>
          
          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search resources..."
                className="w-full p-3 pl-10 border border-sky-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-3.5 text-sky-400" size={18} />
            </div>
          </div>
          
          <div className="mb-6">
            <div className="flex border-b border-sky-200">
              <button
                className={`px-4 py-2 font-medium ${activeTab === 'immediate' ? 'text-sky-600 border-b-2 border-sky-600' : 'text-sky-500 hover:text-sky-700'}`}
                onClick={() => setActiveTab('immediate')}
              >
                Immediate Help
              </button>
              <button
                className={`px-4 py-2 font-medium ${activeTab === 'local' ? 'text-sky-600 border-b-2 border-sky-600' : 'text-sky-500 hover:text-sky-700'}`}
                onClick={() => setActiveTab('local')}
              >
                Local Resources
              </button>
              <button
                className={`px-4 py-2 font-medium ${activeTab === 'online' ? 'text-sky-600 border-b-2 border-sky-600' : 'text-sky-500 hover:text-sky-700'}`}
                onClick={() => setActiveTab('online')}
              >
                Online Support
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredResources.length > 0 ? (
              filteredResources.map((resource, index) => (
                <div key={index} className="bg-sky-50 border border-sky-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start">
                    <div className="bg-sky-200 rounded-full p-2 mr-3">
                      {resource.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-sky-800">{resource.name}</h3>
                      <p className="text-sm text-sky-700 mb-2">{resource.description}</p>
                      {resource.contact && (
                        <p className="text-sm font-medium text-sky-900 mb-1">
                          {resource.contact}
                        </p>
                      )}
                      {resource.website && (
                        <a href={`https://${resource.website}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm text-sky-600 hover:text-sky-800">
                          {resource.website}
                          <ExternalLink size={14} className="ml-1" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-2 text-center py-8 text-sky-700">
                No resources found matching your search. Please try different keywords.
              </div>
            )}
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-sky-800 mb-4">When to Seek Help</h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="bg-sky-200 rounded-full p-2 mr-3 mt-1">
                <Info size={16} />
              </div>
              <div>
                <h3 className="font-medium text-sky-800">Warning Signs</h3>
                <p className="text-sm text-sky-700">
                  Expressing thoughts of suicide, feeling hopeless, dramatic mood changes, increased substance use, withdrawal from friends and activities, or giving away possessions.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-sky-200 rounded-full p-2 mr-3 mt-1">
                <Clock size={16} />
              </div>
              <div>
                <h3 className="font-medium text-sky-800">Help is Available 24/7</h3>
                <p className="text-sm text-sky-700">
                  Mental health crises can happen at any time. Reach out whenever you need support - day or night.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}