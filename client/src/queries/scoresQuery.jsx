import { useQuery } from "@tanstack/react-query";

export function FetchScores() {
  return useQuery({
    queryKey: ["scores"],
    queryFn: async () => {
      const res = await fetch("http://localhost:8080/scores");
      return await res.json();
    },
    refetchIntervalInBackground: true,
  });
}
