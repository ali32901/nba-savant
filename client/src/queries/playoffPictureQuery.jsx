import { useQuery } from "@tanstack/react-query";

export function FetchPlayoffPicture() {
  return useQuery({
    queryKey: ["playoff"],
    queryFn: async () => {
      const res = await fetch(`http://localhost:8080/playoffpicture`);
      return await res.json();
    },
  });
}
