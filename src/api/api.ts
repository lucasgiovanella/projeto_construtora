import { userRoute } from "./config";

export const getUser = async () => {
  const response = await fetch(userRoute, {
    next: { tags: ["users"], revalidate: 600 },
  });
  const data = await response.json();
  return data;
};
