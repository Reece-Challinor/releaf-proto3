export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-gray-900">
              Platform
            </h4>
            <div className="space-y-2 text-sm text-gray-600">
              <a href="#" className="block hover:text-emerald-600 transition-colors">
                Documentation
              </a>
              <a href="#" className="block hover:text-emerald-600 transition-colors">
                API Reference
              </a>
              <a href="#" className="block hover:text-emerald-600 transition-colors">
                System Status
              </a>
            </div>
          </div>
          
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-gray-900">
              Resources
            </h4>
            <div className="space-y-2 text-sm text-gray-600">
              <a href="#" className="block hover:text-emerald-600 transition-colors">
                Compliance Guide
              </a>
              <a href="#" className="block hover:text-emerald-600 transition-colors">
                State Regulations
              </a>
              <a href="#" className="block hover:text-emerald-600 transition-colors">
                Best Practices
              </a>
            </div>
          </div>
          
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-gray-900">
              Support
            </h4>
            <div className="space-y-2 text-sm text-gray-600">
              <a href="#" className="block hover:text-emerald-600 transition-colors">
                Contact Us
              </a>
              <a href="#" className="block hover:text-emerald-600 transition-colors">
                Help Center
              </a>
              <a href="#" className="block hover:text-emerald-600 transition-colors">
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-8 text-center">
          <p className="text-sm text-gray-500">
            © 2024 RELEAF. Making environmental compliance simpler.
          </p>
        </div>
      </div>
    </footer>
  );
}
