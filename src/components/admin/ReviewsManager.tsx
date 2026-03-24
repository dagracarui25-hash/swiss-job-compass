import { useAdminReviews } from "@/hooks/useAdminData";
import { Check, Trash2, Star, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const ReviewsManager = () => {
  const { reviews, approveReview, deleteReview } = useAdminReviews();
  const pending = reviews.filter((r) => r.status === "pending");
  const approved = reviews.filter((r) => r.status === "approved");

  return (
    <div className="space-y-6">
      {/* Pending */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
          <Clock className="h-5 w-5 text-pillar-orange" /> Pending Reviews ({pending.length})
        </h3>
        {pending.length === 0 ? (
          <p className="text-sm text-muted-foreground">No pending reviews.</p>
        ) : (
          <div className="space-y-2">
            {pending.map((r) => (
              <div key={r.id} className="rounded-xl border-2 border-pillar-orange/30 bg-card p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium text-foreground">{r.name}</p>
                    <div className="flex gap-0.5 my-1">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className={`h-4 w-4 ${s <= r.rating ? "fill-pillar-orange text-pillar-orange" : "text-muted-foreground"}`} />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground">{r.comment}</p>
                    <p className="text-xs text-muted-foreground mt-1">{r.date}</p>
                  </div>
                  <div className="flex gap-1">
                    <Button size="icon" variant="outline" className="text-pillar-green border-pillar-green/30" onClick={() => { approveReview(r.id); toast.success("Review approved"); }}>
                      <Check className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="outline" className="text-destructive border-destructive/30" onClick={() => { deleteReview(r.id); toast.success("Review deleted"); }}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Approved */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
          <Check className="h-5 w-5 text-pillar-green" /> Approved Reviews ({approved.length})
        </h3>
        {approved.length === 0 ? (
          <p className="text-sm text-muted-foreground">No approved reviews yet.</p>
        ) : (
          <div className="space-y-2">
            {approved.map((r) => (
              <div key={r.id} className="rounded-xl border border-border bg-card p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium text-foreground">{r.name}</p>
                    <div className="flex gap-0.5 my-1">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className={`h-4 w-4 ${s <= r.rating ? "fill-pillar-orange text-pillar-orange" : "text-muted-foreground"}`} />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground">{r.comment}</p>
                  </div>
                  <Button size="icon" variant="ghost" onClick={() => { deleteReview(r.id); toast.success("Review deleted"); }}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewsManager;
