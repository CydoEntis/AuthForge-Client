import { useState } from "react";
import { useFormContext } from "react-hook-form";

// Will validate origins to make sure they are
// - A valid url
// - A valid IPV4
// - localhost
export function useOriginsField(name: string) {
  const { watch, setValue } = useFormContext();
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState<string | null>(null);

  const origins: string[] = watch(name) || [];

  const isValidOrigin = (url: string): boolean => {
    try {
      const parsed = new URL(url);
      if (!["http:", "https:"].includes(parsed.protocol)) return false;

      const host = parsed.hostname;

      // Allow localhost
      if (host === "localhost") return true;

      // Allow IPv4
      const ipv4Regex = /^(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}$/;
      if (ipv4Regex.test(host)) return true;

      // Allow proper domain names
      const domainRegex = /^(?!-)[A-Za-z0-9-]{1,63}(?<!-)(\.[A-Za-z]{2,})+$/;
      return domainRegex.test(host);
    } catch {
      return false;
    }
  };

  const normalize = (url: string) => url.replace(/\/+$/, "").toLowerCase();

  const addOrigin = () => {
    const trimmed = inputValue.trim();
    setError(null);

    if (!trimmed) return;

    const normalized = normalize(trimmed);

    if (!isValidOrigin(normalized)) {
      setError("Please enter a valid origin (http/https domain, IP, or localhost).");
      return;
    }

    if (origins.includes(normalized)) {
      setError("Origin already added.");
      return;
    }

    setValue(name, [...origins, normalized], { shouldValidate: true });
    setInputValue("");
  };

  const removeOrigin = (origin: string) => {
    setValue(
      name,
      origins.filter((o) => o !== origin),
      { shouldValidate: true }
    );
  };

  return {
    origins,
    inputValue,
    setInputValue,
    error,
    addOrigin,
    removeOrigin,
  };
}
