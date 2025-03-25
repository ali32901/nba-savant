import { useQuery } from "@tanstack/react-query";

export function FetchScores() {
  return useQuery({
    queryKey: ["scores"],
    queryFn: async () => {
      const res = await fetch("http://localhost:8080/api/scores");
      return await res.json();
    },
    // refetchInterval: 24000,
  });
}
