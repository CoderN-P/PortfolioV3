export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50 mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <p className="text-gray-600 font-medium">Neel Parpia</p>
            <p className="text-gray-500 text-sm">High School Developer</p>
          </div>
          
          <div className="flex items-center gap-6">
            <a 
              href="https://github.com/CoderN-P" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              GitHub
            </a>
            <a 
              href="mailto:neel.parpia@gmail.com"
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              Email
            </a>
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-gray-500 text-sm">© 2025 Neel Parpia</p>
            <p className="text-gray-400 text-xs">Built with Next.js & Tailwind CSS</p>
          </div>
        </div>
      </div>
    </footer>
  );
}