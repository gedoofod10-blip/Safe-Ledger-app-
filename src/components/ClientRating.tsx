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
      <button
        onClick={() => setShowPicker(true)}
        className="w-6 h-6 rounded-full border-2 border-white shadow-md transition-all hover:scale-110 active:scale-95"
        style={{
          backgroundColor: rating ? ratingConfig[rating].color : '#9ca3af',
        }}
      />

      {showPicker && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* الخلفية المغبشة */}
          <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-sm" 
            onClick={() => setShowPicker(false)} 
          />
          
          {/* صندوق التقييم في منتصف الشاشة */}
          <div 
            className="relative bg-card border border-border rounded-3xl shadow-2xl p-5 w-full max-w-[280px] animate-in fade-in zoom-in duration-200" 
            dir="rtl"
          >
            <h3 className="text-lg font-bold text-foreground text-center mb-4 border-b border-border/50 pb-2">
              تقييم العميل
            </h3>
            <div className="space-y-2">
              {(['excellent', 'average', 'poor'] as Rating[]).map(r => (
                <button
                  key={r}
                  onClick={() => { onChange(r); setShowPicker(false); }}
                  className={`flex items-center gap-4 w-full px-4 py-4 rounded-2xl transition-all active:scale-95 ${rating === r ? 'bg-primary/10 ring-2 ring-primary' : 'bg-muted/50 hover:bg-muted'}`}
                >
                  <span className="text-3xl">{ratingConfig[r].emoji}</span>
                  <span className="text-lg font-bold text-foreground">{ratingConfig[r].label}</span>
                </button>
              ))}
            </div>
            <button 
              onClick={() => setShowPicker(false)}
              className="w-full mt-4 py-3 text-base font-bold text-muted-foreground hover:text-foreground transition-colors"
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
