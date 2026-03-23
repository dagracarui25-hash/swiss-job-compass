import { useLanguage } from "@/i18n/useLanguage";
import { Language, languageNames } from "@/i18n/locales";
import { Globe } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const languages = Object.entries(languageNames) as [Language, string][];

const LanguageSwitcher = () => {
  const { currentLang, setLang } = useLanguage();

  return (
    <div className="flex items-center gap-2">
      <Globe className="h-5 w-5 text-muted-foreground" />
      <Select value={currentLang} onValueChange={(v) => setLang(v as Language)}>
        <SelectTrigger className="w-[140px] h-11 border-border bg-card text-card-foreground">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {languages.map(([code, name]) => (
            <SelectItem key={code} value={code} className="h-11">
              {name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default LanguageSwitcher;
