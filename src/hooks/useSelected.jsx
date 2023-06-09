import { useQuery } from "react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useSelected = () => {
    const { user, loading } = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const { data: selected = [], isLoading: isSelectedLoading, refetch } = useQuery({
        queryKey: ['isSelected', user?.email],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure(`/selectedClass/${user?.email}`);
            return res.data;
        }
    })
    return [selected, refetch, isSelectedLoading];
}

export default useSelected