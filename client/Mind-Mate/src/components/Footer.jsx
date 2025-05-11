import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

function Footer({ darkMode = false }) {
  return (
    <footer className={`px-6 py-10 ${darkMode ? 'bg-slate-900' : 'bg-sky-50'} border-t ${darkMode ? 'border-slate-700' : 'border-sky-200'}`}>
      <div className="container mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <Heart className="text-sky-600" size={20} />
              <span className="text-lg font-semibold">Mind-Mate</span>
            </Link>
            <p className={`mb-4 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Your trusted AI partner for mental health support and wellness.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className={`hover:text-sky-600 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Home</Link></li>
              <li><Link to="/about" className={`hover:text-sky-600 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>About Us</Link></li>
              <li><Link to="/#features" className={`hover:text-sky-600 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Features</Link></li>
              <li><Link to="/#testimonials" className={`hover:text-sky-600 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Testimonials</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><Link to="/resources/articles" className={`hover:text-sky-600 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Mental Health Articles</Link></li>
              <li><Link to="/resources/professional-help" className={`hover:text-sky-600 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Professional Help</Link></li>
              <li><Link to="/resources/crisis" className={`hover:text-sky-600 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Crisis Hotlines</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className={darkMode ? 'text-slate-400' : 'text-slate-600'}>infomindmatecompanion@gmail.com</li>
              <li className={darkMode ? 'text-slate-400' : 'text-slate-600'}>+91 7892125239</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-10 pt-6 border-t text-center text-sm text-slate-500">
          <p>© 2025 Mind-Mate. All rights reserved.</p>
          <p className="mt-2">
            <Link to="/privacy" className="hover:text-sky-600 mx-2">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-sky-600 mx-2">Terms of Service</Link>
            <Link to="/cookies" className="hover:text-sky-600 mx-2">Cookie Policy</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;