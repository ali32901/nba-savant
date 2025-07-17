import { useQuery } from "@tanstack/react-query";

export function FetchLeagueStats(year) {
  return useQuery({
    queryKey: ["league-stats", year],
    queryFn: async () => {
      const res = await fetch(`http://localhost:8080/leaguestats/${year}`);
      return await res.json();
    },
    enabled: !!year,
    staleTime: Infinity,
  });
}
