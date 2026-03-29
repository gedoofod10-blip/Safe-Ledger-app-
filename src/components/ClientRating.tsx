import { useState } from 'react';

type Rating = 'excellent' | 'average' | 'poor';

interface ClientRatingProps {
  rating?: Rating;
  onChange: (rating: Rating) => void;
}

const ratingConfig: Record<Rating, { color: string; emoji: string; label: string }> = {
  excellent: { color: 'hsl(142, 60%, 40%)', emoji: '🟢', label: 'مضمون' },
  average: { color: '#eab308', emoji: '🟡', label: 'مماطل' },
  poor: { color: 'hsl(0, 72%, 51%)', emoji: '🔴', label: 'غير مضمون' },
};

const ClientRating = ({ rating, onChange }: ClientRatingProps) => {
  const [showPicker, setShowPicker] = useState(false);

  return (
    <div className="relative inline-block">
      {/* الزر الأساسي */}
      <button
        onClick={() => setShowPicker(true)}
        className="w-6 h-6 rounded-full border-2 border-white shadow-md transition-all hover:scale-110 active:scale-95 focus:outline-none"
        style={{
          backgroundColor: rating ? ratingConfig[rating].color : '#9ca3af',
        }}
      />

      {showPicker && (
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          style={{ 
            position: 'fixed', 
            top: 0, 
            left: 0, 
            width: '100vw', 
            height: '100dvh', // يضمن الطول الحقيقي للشاشة في الهواتف
            zIndex: 9999 
          }}
        >
          {/* خلفية مغبشة تمنع التفاعل خلف الصندوق */}
          <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-sm" 
            onClick={() => setShowPicker(false)} 
            style={{ position: 'absolute', width: '100%', height: '100%' }}
          />
          
          {/* صندوق التقييم المركزي - تم إضافة w-[90%] و max-h-[85dvh] */}
          <div 
            className="relative bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[2rem] shadow-2xl p-6 w-[90%] max-w-[320px] animate-in fade-in zoom-in duration-200 flex flex-col" 
            dir="rtl"
            style={{ 
              maxHeight: '85dvh', 
              overflowY: 'auto',
              margin: 'auto'
            }}
          >
            <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 text-center mb-6 border-b border-zinc-100 dark:border-zinc-800 pb-4">
              تقييم العميل
            </h3>
            
            <div className="flex flex-col gap-3">
              {(['excellent', 'average', 'poor'] as Rating[]).map(r => (
                <button
                  key={r}
                  onClick={() => { onChange(r); setShowPicker(false); }}
                  className={`flex items-center gap-4 w-full px-5 py-4 rounded-2xl transition-all active:scale-95 border-2 ${
                    rating === r 
                      ? 'bg-blue-50 border-blue-500 dark:bg-blue-900/20 dark:border-blue-500' 
                      : 'bg-zinc-50 border-transparent hover:bg-zinc-100 dark:bg-zinc-800/50 dark:hover:bg-zinc-800'
                  }`}
                >
                  <span className="text-3xl">{ratingConfig[r].emoji}</span>
                  <span className="text-lg font-bold text-zinc-900 dark:text-zinc-100">{ratingConfig[r].label}</span>
                </button>
              ))}
            </div>

            <button 
              onClick={() => setShowPicker(false)}
              className="mt-6 py-3 text-base font-bold text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors w-full"
            >
              إلغاء
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientRating;
