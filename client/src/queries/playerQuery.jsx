import { useQuery } from "@tanstack/react-query";

export function FetchPlayerProfile(id) {
  return useQuery({
    queryKey: ["careerstats", id],
    queryFn: async () => {
      const res = await fetch(`http://localhost:8080/careerstats/${id}`);
      return await res.json();
    },
    enabled: !!id,
  });
}
