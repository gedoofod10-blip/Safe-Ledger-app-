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
      {/* زر التقييم الصغير */}
      <button
        onClick={() => setShowPicker(true)}
        className="w-6 h-6 rounded-full border-2 border-white shadow-md transition-all hover:scale-110 active:scale-95"
        style={{
          backgroundColor: rating ? ratingConfig[rating].color : '#9ca3af',
        }}
      />

      {showPicker && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* الخلفية المغبشة (Overlay) - تغطي كامل الشاشة وتمنع التفاعل مع ما خلفها */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm" 
            onClick={() => setShowPicker(false)} 
          />
          
          {/* صندوق التقييم - تم إضافة max-h-full و overflow-y-auto لضمان عدم الاقتطاع */}
          <div 
            className="relative bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-2xl p-6 w-full max-w-[320px] max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-200" 
            dir="rtl"
          >
            <div className="flex flex-col items-center">
              <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 text-center mb-6 border-b border-zinc-100 dark:border-zinc-800 w-full pb-3">
                تقييم العميل
              </h3>
              
              <div className="space-y-3 w-full">
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

              {/* زر الإلغاء */}
              <button 
                onClick={() => setShowPicker(false)}
                className="w-full mt-6 py-3 text-base font-bold text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors"
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientRating;
