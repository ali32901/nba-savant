import { useQuery } from "@tanstack/react-query";

export function FetchStandings() {
  return useQuery({
    queryKey: ["standings"],
    queryFn: async () => {
      const res = await fetch("http://localhost:8080/standings");
      return await res.json();
    },
  });
}
