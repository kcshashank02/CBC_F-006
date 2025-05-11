import React, { useState } from 'react';
import { Phone, MessageSquare, Globe, MapPin, Heart, Search, HelpCircle, Users, Calendar, BookOpen, ArrowRight } from 'lucide-react';

export default function MentalHealthResourcesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  
  const resources = [
    {
      id: 1,
      name: "National Suicide Prevention Lifeline",
      description: "24/7, free and confidential support for people in distress, prevention and crisis resources.",
      contact: "1-800-273-8255",
      website: "suicidepreventionlifeline.org",
      category: "crisis",
      icon: <Phone className="w-5 h-5" />
    },
    {
      id: 2,
      name: "Crisis Text Line",
      description: "Text with a trained crisis counselor. Free, 24/7 support.",
      contact: "Text HOME to 741741",
      website: "crisistextline.org",
      category: "crisis",
      icon: <MessageSquare className="w-5 h-5" />
    },
    {
      id: 3,
      name: "Psychology Today Therapist Finder",
      description: "Search for therapists in your area who accept your insurance.",
      website: "psychologytoday.com/us/therapists",
      category: "therapy",
      icon: <Search className="w-5 h-5" />
    },
    {
      id: 4,
      name: "BetterHelp",
      description: "Online counseling and therapy services with licensed professionals.",
      website: "betterhelp.com",
      category: "therapy",
      icon: <Globe className="w-5 h-5" />
    },
    {
      id: 5,
      name: "Mental Health America",
      description: "Resources, tools, and information about mental health conditions.",
      website: "mhanational.org",
      category: "education",
      icon: <BookOpen className="w-5 h-5" />
    },
    {
      id: 6,
      name: "NAMI (National Alliance on Mental Illness)",
      description: "Support groups, education programs, and advocacy for those affected by mental illness.",
      website: "nami.org",
      website: "nami.org",
      category: "support",
      icon: <Users className="w-5 h-5" />
    },
    {
      id: 7,
      name: "SAMHSA Treatment Locator",
      description: "Find treatment facilities confidentially and anonymously.",
      website: "findtreatment.samhsa.gov",
      category: "therapy",
      icon: <MapPin className="w-5 h-5" />
    },
    {
      id: 8,
      name: "Mental Health Apps",
      description: "Headspace, Calm, Woebot, and other evidence-based mental wellness apps.",
      category: "selfcare",
      icon: <HelpCircle className="w-5 h-5" />
    }
  ];

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeTab === 'all' || resource.category === activeTab;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex flex-col min-h-screen bg-sky-100">
      
      {/* Hero Section */}
      <div className="bg-sky-200 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-sky-900 mb-4">You're Not Alone</h2>
            <p className="text-lg text-sky-800 mb-8">
              Finding the right mental health support shouldn't be difficult. 
              We've gathered trusted resources to help you on your journey.
            </p>
            <div className="bg-white rounded-lg p-2 flex items-center shadow-md">
              <Search className="w-5 h-5 text-gray-400 ml-2" />
              <input 
                type="text" 
                placeholder="Search for resources..." 
                className="w-full p-2 outline-none text-gray-700"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Resource Categories */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex overflow-x-auto space-x-2 pb-4">
          <button 
            className={`px-4 py-2 rounded-full whitespace-nowrap ${activeTab === 'all' ? 'bg-sky-600 text-white' : 'bg-white text-sky-700'}`}
            onClick={() => setActiveTab('all')}
          >
            All Resources
          </button>
          <button 
            className={`px-4 py-2 rounded-full whitespace-nowrap ${activeTab === 'crisis' ? 'bg-sky-600 text-white' : 'bg-white text-sky-700'}`}
            onClick={() => setActiveTab('crisis')}
          >
            Crisis Support
          </button>
          <button 
            className={`px-4 py-2 rounded-full whitespace-nowrap ${activeTab === 'therapy' ? 'bg-sky-600 text-white' : 'bg-white text-sky-700'}`}
            onClick={() => setActiveTab('therapy')}
          >
            Find Therapy
          </button>
          <button 
            className={`px-4 py-2 rounded-full whitespace-nowrap ${activeTab === 'support' ? 'bg-sky-600 text-white' : 'bg-white text-sky-700'}`}
            onClick={() => setActiveTab('support')}
          >
            Support Groups
          </button>
          <button 
            className={`px-4 py-2 rounded-full whitespace-nowrap ${activeTab === 'education' ? 'bg-sky-600 text-white' : 'bg-white text-sky-700'}`}
            onClick={() => setActiveTab('education')}
          >
            Education
          </button>
          <button 
            className={`px-4 py-2 rounded-full whitespace-nowrap ${activeTab === 'selfcare' ? 'bg-sky-600 text-white' : 'bg-white text-sky-700'}`}
            onClick={() => setActiveTab('selfcare')}
          >
            Self-Care
          </button>
        </div>
      </div>

      {/* Resources Grid */}
      <div className="container mx-auto px-4 py-6 flex-grow">
        {filteredResources.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map(resource => (
              <div key={resource.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center text-sky-600 mr-3">
                      {resource.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-sky-800">{resource.name}</h3>
                  </div>
                  <p className="text-gray-600 mb-4">{resource.description}</p>
                  {resource.contact && (
                    <p className="text-gray-700 mb-2 flex items-center">
                      <Phone className="w-4 h-4 mr-2 text-sky-600" />
                      <span>{resource.contact}</span>
                    </p>
                  )}
                  {resource.website && (
                    <p className="text-gray-700 mb-4 flex items-center">
                      <Globe className="w-4 h-4 mr-2 text-sky-600" />
                      <span>{resource.website}</span>
                    </p>
                  )}
                  <button className="flex items-center text-sky-600 hover:text-sky-700 font-medium">
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <HelpCircle className="w-12 h-12 mx-auto text-sky-400 mb-4" />
            <h3 className="text-xl font-medium text-sky-800">No resources found</h3>
            <p className="text-gray-500 mt-2">Try adjusting your search terms or filters</p>
          </div>
        )}
      </div>

      
      
    </div>
  );
}