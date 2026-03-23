import { useState } from "react";
import { useAdminNews, type NewsItem } from "@/hooks/useAdminData";
import { Plus, Trash2, Pencil, Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const NewsManager = () => {
  const { news, addNews, deleteNews, updateNews } = useAdminNews();
  const [isAdding, setIsAdding] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState({ titleKey: "", source: "ORP", date: "", url: "", summary: "" });

  const resetForm = () => {
    setForm({ titleKey: "", source: "ORP", date: "", url: "", summary: "" });
    setIsAdding(false);
    setEditId(null);
  };

  const handleAdd = () => {
    if (!form.titleKey || !form.url) return;
    addNews(form);
    toast.success("News entry added");
    resetForm();
  };

  const handleUpdate = () => {
    if (!editId) return;
    updateNews(editId, form);
    toast.success("News entry updated");
    resetForm();
  };

  const startEdit = (item: NewsItem) => {
    setEditId(item.id);
    setForm({ titleKey: item.titleKey, source: item.source, date: item.date, url: item.url, summary: item.summary });
    setIsAdding(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">News Entries</h3>
        <Button size="sm" onClick={() => { setIsAdding(true); setEditId(null); }}>
          <Plus className="h-4 w-4 me-1" /> Add Entry
        </Button>
      </div>

      {(isAdding || editId) && (
        <div className="rounded-xl border border-border bg-card p-4 space-y-3">
          <input
            placeholder="Title"
            value={form.titleKey}
            onChange={(e) => setForm({ ...form, titleKey: e.target.value })}
            className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
          />
          <div className="grid grid-cols-2 gap-3">
            <select
              value={form.source}
              onChange={(e) => setForm({ ...form, source: e.target.value })}
              className="rounded-lg border border-input bg-background px-3 py-2 text-sm"
            >
              <option value="ORP">ORP</option>
              <option value="SECO">SECO</option>
              <option value="Canton">Canton</option>
            </select>
            <input
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              className="rounded-lg border border-input bg-background px-3 py-2 text-sm"
            />
          </div>
          <input
            placeholder="URL"
            value={form.url}
            onChange={(e) => setForm({ ...form, url: e.target.value })}
            className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
          />
          <textarea
            placeholder="Summary"
            value={form.summary}
            onChange={(e) => setForm({ ...form, summary: e.target.value })}
            className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm min-h-[60px]"
          />
          <div className="flex gap-2">
            <Button size="sm" onClick={editId ? handleUpdate : handleAdd}>
              <Save className="h-4 w-4 me-1" /> {editId ? "Update" : "Save"}
            </Button>
            <Button size="sm" variant="outline" onClick={resetForm}>
              <X className="h-4 w-4 me-1" /> Cancel
            </Button>
          </div>
        </div>
      )}

      <div className="space-y-2">
        {news.map((item) => (
          <div key={item.id} className="flex items-center justify-between rounded-xl border border-border bg-card p-3">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{item.titleKey}</p>
              <p className="text-xs text-muted-foreground">{item.source} · {item.date}</p>
            </div>
            <div className="flex gap-1 ms-2">
              <Button size="icon" variant="ghost" onClick={() => startEdit(item)}>
                <Pencil className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="ghost" onClick={() => { deleteNews(item.id); toast.success("Deleted"); }}>
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsManager;
