import { useQuery } from "@tanstack/react-query";

export function FetchPlayerBio(id) {
  return useQuery({
    queryKey: ["player-bio", id],
    queryFn: async () => {
      const res = await fetch(`http://localhost:8080/playerbio/${id}`);
      return await res.json();
    },
    enabled: !!id,
    staleTime: Infinity,
  });
}
