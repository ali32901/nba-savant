import { useQuery } from "@tanstack/react-query";

export function FetchPlayerProfile(id) {
  return useQuery({
    queryKey: ["profile", id],
    queryFn: async () => {
      const res = await fetch(`http://localhost:8080/api/player/${id}`);
      return await res.json();
    },
    enabled: !!id,
  });
}
