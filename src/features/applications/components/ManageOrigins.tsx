import { Plus, X } from "lucide-react";
import { FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AnimatePresence, motion } from "framer-motion";
import { useOriginsField } from "../hooks/useOriginsField";

interface ManageOriginProps {
  name: string;
  isLoading?: boolean;
}

function ManageOrigins({ name, isLoading }: ManageOriginProps) {
  const { origins, inputValue, setInputValue, addOrigin, removeOrigin, error } = useOriginsField(name);

  return (
    <FormField
      name={name}
      render={() => (
        <FormItem>
          <FormControl>
            <div className="flex gap-2">
              <Input
                placeholder="https://myapp.com"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                disabled={isLoading}
              />
              <Button type="button" variant="outline" onClick={addOrigin} disabled={isLoading || !inputValue.trim()}>
                <Plus className="w-4 h-4 mr-1" /> Add
              </Button>
            </div>
          </FormControl>

          <AnimatePresence mode="wait" initial={false}>
            {error && (
              <motion.p
                key={error}
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="text-sm text-destructive mt-1"
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>

          {origins.length > 0 && (
            <motion.div
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-wrap gap-2 mt-3"
            >
              {origins.map((origin) => (
                <motion.div key={origin} layout>
                  <Badge variant="outline" className="flex items-center gap-1 border rounded">
                    {origin}
                    <button type="button" onClick={() => removeOrigin(origin)} className="hover:text-destructive">
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                </motion.div>
              ))}
            </motion.div>
          )}

          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default ManageOrigins;
