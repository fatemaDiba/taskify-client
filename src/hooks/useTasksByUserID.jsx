import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios";

const useTasksByUserID = (userID) => {
  const axiosBase = useAxios();

  const {
    data: tasks = [],
    isLoading: taskLoading,
    refetch: taskRefetch,
  } = useQuery({
    queryKey: ["tasks", userID],
    queryFn: async () => {
      const res = await axiosBase.get(`/task/${userID}`);
      return res.data;
    },
    enabled: !!userID,
  });

  return [tasks, taskLoading, taskRefetch];
};

export default useTasksByUserID;
