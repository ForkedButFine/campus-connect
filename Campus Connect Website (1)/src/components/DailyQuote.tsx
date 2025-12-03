import { useState, useEffect } from 'react';
import { Quote, Bookmark, BookmarkCheck } from 'lucide-react';

interface DailyQuoteProps {
  currentUser: any;
}

const motivationalQuotes = [
  { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
  { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
  { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
  { text: "Education is the most powerful weapon which you can use to change the world.", author: "Nelson Mandela" },
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius" },
  { text: "The expert in anything was once a beginner.", author: "Helen Hayes" },
  { text: "Success is the sum of small efforts repeated day in and day out.", author: "Robert Collier" },
  { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
  { text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
];

export function DailyQuote({ currentUser }: DailyQuoteProps) {
  const [quote, setQuote] = useState(motivationalQuotes[0]);
  const [savedQuotes, setSavedQuotes] = useState<any[]>([]);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    // Get quote of the day based on date
    const today = new Date().toDateString();
    const savedDate = localStorage.getItem('quoteDate');
    const savedQuoteIndex = localStorage.getItem('quoteIndex');
    
    if (savedDate !== today) {
      const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
      setQuote(motivationalQuotes[randomIndex]);
      localStorage.setItem('quoteDate', today);
      localStorage.setItem('quoteIndex', randomIndex.toString());
    } else if (savedQuoteIndex) {
      setQuote(motivationalQuotes[parseInt(savedQuoteIndex)]);
    }

    // Load saved quotes
    const saved = localStorage.getItem(`savedQuotes_${currentUser?.id}`);
    if (saved) {
      const quotes = JSON.parse(saved);
      setSavedQuotes(quotes);
      setIsSaved(quotes.some((q: any) => q.text === quote.text));
    }
  }, [currentUser]);

  const handleSaveQuote = () => {
    if (!isSaved) {
      const newSavedQuotes = [...savedQuotes, quote];
      setSavedQuotes(newSavedQuotes);
      localStorage.setItem(`savedQuotes_${currentUser?.id}`, JSON.stringify(newSavedQuotes));
      setIsSaved(true);
    }
  };

  const handleRefresh = () => {
    const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
    setQuote(motivationalQuotes[randomIndex]);
    setIsSaved(savedQuotes.some((q: any) => q.text === motivationalQuotes[randomIndex].text));
  };

  return (
    <div className="bg-gradient-to-br from-purple-400 to-pink-500 text-white p-8 rounded-lg shadow-lg">
      <div className="flex items-start justify-between mb-4">
        <Quote size={32} />
        <div className="flex gap-2">
          <button
            onClick={handleSaveQuote}
            className="hover:bg-white/20 p-2 rounded transition"
            title={isSaved ? "Already saved" : "Save quote"}
          >
            {isSaved ? <BookmarkCheck size={24} /> : <Bookmark size={24} />}
          </button>
          <button
            onClick={handleRefresh}
            className="hover:bg-white/20 px-4 py-2 rounded transition"
          >
            Refresh
          </button>
        </div>
      </div>
      <h2 className="text-2xl mb-4">Daily Motivation</h2>
      <p className="text-xl mb-4 italic">"{quote.text}"</p>
      <p className="text-right">— {quote.author}</p>
    </div>
  );
}
