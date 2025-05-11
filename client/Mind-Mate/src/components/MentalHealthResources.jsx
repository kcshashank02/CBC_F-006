import { useState } from 'react';
import { Search, Heart, Book, Phone, Calendar, Info, ArrowRight } from 'lucide-react';

export default function MentalHealthResources() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', name: 'All Resources' },
    { id: 'articles', name: 'Articles', icon: Book },
    { id: 'crisis', name: 'Crisis Support', icon: Phone },
    { id: 'self-care', name: 'Self-Care', icon: Heart },
    { id: 'tools', name: 'Tools & Apps', icon: Calendar },
  ];

  const resources = [
    {
      id: 1,
      type: 'articles',
      title: 'Understanding Anxiety: Causes and Coping Strategies',
      description: 'Learn about the root causes of anxiety and evidence-based techniques to manage symptoms.',
      readTime: '8 min read',
      featured: true
    },
    {
      id: 2,
      type: 'articles',
      title: 'The Connection Between Sleep and Mental Health',
      description: 'Explore how quality sleep impacts your mental wellbeing and tips for better rest.',
      readTime: '6 min read'
    },
    {
      id: 3,
      type: 'crisis',
      title: 'National Suicide Prevention Lifeline',
      description: 'Free and confidential support for people in distress, 24/7.',
      contact: '988'
    },
    {
      id: 4,
      type: 'crisis',
      title: 'Crisis Text Line',
      description: 'Text HOME to 741741 to connect with a Crisis Counselor.',
      contact: 'Text HOME to 741741'
    },
    {
      id: 5,
      type: 'self-care',
      title: 'Mindfulness Meditation Practices',
      description: 'Simple meditation exercises you can practice daily for improved mental clarity.',
      readTime: '5 min read'
    },
    {
      id: 6,
      type: 'self-care',
      title: 'Creating a Personal Wellness Plan',
      description: 'Step-by-step guide to building a wellness routine that works for you.',
      readTime: '10 min read',
      featured: true
    },
    {
      id: 7,
      type: 'tools',
      title: 'Calm - Meditation App',
      description: 'Guided meditations, sleep stories, and breathing programs.',
      platform: 'iOS, Android, Web'
    },
    {
      id: 8,
      type: 'tools',
      title: 'Mood Tracker Journal',
      description: 'Track your emotional patterns and identify triggers.',
      platform: 'iOS, Android'
    },
    {
      id: 9,
      type: 'articles',
      title: 'Building Resilience Through Difficult Times',
      description: 'Strategies to strengthen your emotional resilience and bounce back from challenges.',
      readTime: '7 min read'
    },
    {
      id: 10,
      type: 'articles',
      title: 'Recognizing Signs of Depression',
      description: 'Common symptoms of depression and when to seek professional help.',
      readTime: '5 min read'
    }
  ];

  const filteredResources = resources.filter(resource => {
    const matchesCategory = activeCategory === 'all' || resource.type === activeCategory;
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredResources = resources.filter(resource => resource.featured);

  return (
    <div className="min-h-screen bg-sky-100">
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-sky-800 mb-4">Mental Health Resources</h1>
          <p className="text-lg text-sky-600 max-w-2xl mx-auto">
            Access helpful information, tools, and support for your mental wellbeing journey.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-8 relative">
          <input
            type="text"
            placeholder="Search resources..."
            className="w-full px-4 py-3 rounded-lg border border-sky-200 focus:outline-none focus:ring-2 focus:ring-sky-500 pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-3.5 text-sky-400" size={18} />
        </div>

        {/* Featured Resources */}
        {activeCategory === 'all' && searchTerm === '' && (
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-sky-800 mb-6">Featured Resources</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {featuredResources.map(resource => (
                <div key={resource.id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full border-l-4 border-sky-500">
                  <div className="p-6 flex-1">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-sky-100 text-sky-800 mb-4">
                      {categories.find(c => c.id === resource.type)?.name}
                    </span>
                    <h3 className="font-bold text-xl mb-2 text-sky-900">{resource.title}</h3>
                    <p className="text-sky-700">{resource.description}</p>
                  </div>
                  <div className="px-6 py-3 bg-sky-50 flex justify-between items-center">
                    {resource.readTime && <span className="text-sm text-sky-600">{resource.readTime}</span>}
                    {resource.contact && <span className="text-sm text-sky-600">{resource.contact}</span>}
                    <button className="text-sky-600 font-medium flex items-center text-sm hover:text-sky-800">
                      Read more <ArrowRight size={16} className="ml-1" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Category Filters */}
        <div className="flex overflow-x-auto space-x-2 mb-8 pb-2">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center px-4 py-2 rounded-full whitespace-nowrap ${
                  activeCategory === category.id
                    ? 'bg-sky-600 text-white font-medium'
                    : 'bg-white text-sky-700 hover:bg-sky-50'
                }`}
              >
                {Icon && <Icon size={16} className="mr-2" />}
                {category.name}
              </button>
            );
          })}
        </div>

        {/* Resources Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.length > 0 ? (
            filteredResources.map(resource => (
              <div key={resource.id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full hover:shadow-lg transition-shadow">
                <div className="p-6 flex-1">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-sky-100 text-sky-800 mb-4">
                    {categories.find(c => c.id === resource.type)?.name}
                  </span>
                  <h3 className="font-bold text-lg mb-2 text-sky-900">{resource.title}</h3>
                  <p className="text-sky-700 text-sm">{resource.description}</p>
                </div>
                <div className="px-6 py-3 bg-sky-50 flex justify-between items-center">
                  {resource.readTime && <span className="text-xs text-sky-600">{resource.readTime}</span>}
                  {resource.contact && <span className="text-xs text-sky-600 font-semibold">{resource.contact}</span>}
                  {resource.platform && <span className="text-xs text-sky-600">{resource.platform}</span>}
                  <button className="text-sky-600 flex items-center text-sm hover:text-sky-800">
                    View <ArrowRight size={14} className="ml-1" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <Info size={48} className="mx-auto text-sky-400 mb-4" />
              <h3 className="text-xl font-medium text-sky-800 mb-2">No resources found</h3>
              <p className="text-sky-600">Try adjusting your search or category filter</p>
            </div>
          )}
        </div>

        {/* Quick Help Box */}
        <div className="mt-12 bg-sky-200 rounded-lg p-6 shadow-inner">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-sky-900 mb-2">Need immediate support?</h2>
              <p className="text-sky-700 mb-4 md:mb-0">
                If you're experiencing a mental health crisis, help is available 24/7.
              </p>
            </div>
            <div className="flex flex-col space-y-3">
              <a href="#" className="bg-sky-600 text-white px-6 py-2 rounded-md font-medium hover:bg-sky-700 text-center">
                Crisis Hotlines
              </a>
              <a href="#" className="bg-white text-sky-700 px-6 py-2 rounded-md font-medium hover:bg-sky-50 text-center">
                Find a Therapist
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}