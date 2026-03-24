import { useState } from "react";
import { useLanguage } from "@/i18n/useLanguage";
import { useAdminReviews } from "@/hooks/useAdminData";
import { Star, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const ReviewsSection = () => {
  const { t } = useLanguage();
  const { approvedReviews, addReview } = useAdminReviews();
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim() || rating === 0) {
      toast.error("Please fill all fields and select a rating");
      return;
    }
    addReview({ name: name.trim(), rating, comment: comment.trim() });
    toast.success("Thank you! Your review will appear after moderation.");
    setName("");
    setRating(0);
    setComment("");
  };

  return (
    <section className="mt-10">
      <h2 className="text-xl font-bold text-foreground mb-6">⭐ {t("reviewsTitle")}</h2>

      {/* Approved reviews */}
      {approvedReviews.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {approvedReviews.map((r) => (
            <div key={r.id} className="rounded-2xl border border-border bg-card p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <p className="font-semibold text-foreground">{r.name}</p>
                <span className="text-xs text-muted-foreground">· {r.date}</span>
              </div>
              <div className="flex gap-0.5 mb-2">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className={cn("h-4 w-4", s <= r.rating ? "fill-pillar-orange text-pillar-orange" : "text-muted-foreground")} />
                ))}
              </div>
              <p className="text-sm text-muted-foreground">{r.comment}</p>
            </div>
          ))}
        </div>
      )}

      {/* Submit form */}
      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
        <h3 className="font-semibold text-foreground mb-4">{t("leaveReview")}</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            placeholder={t("yourName")}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm"
            maxLength={50}
          />
          <div>
            <p className="text-sm text-muted-foreground mb-1">{t("yourRating")}</p>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setRating(s)}
                  onMouseEnter={() => setHoverRating(s)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="p-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
                >
                  <Star className={cn("h-6 w-6 transition-colors", s <= (hoverRating || rating) ? "fill-pillar-orange text-pillar-orange" : "text-muted-foreground")} />
                </button>
              ))}
            </div>
          </div>
          <textarea
            placeholder={t("yourComment")}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm min-h-[80px]"
            maxLength={500}
          />
          <Button type="submit" className="h-11">
            <Send className="h-4 w-4 me-2" /> {t("submitReview")}
          </Button>
        </form>
      </div>
    </section>
  );
};

export default ReviewsSection;
