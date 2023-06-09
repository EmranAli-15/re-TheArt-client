import { useQuery } from "react-query";
import useAuth from "./useAuth"
import useAxiosSecure from "./useAxiosSecure";

const useClasses = () => {
    const { user, loading } = useAuth();
    const [axiosSecure] = useAxiosSecure();

    const { refetch, data: classes = [] } = useQuery({
        queryKey: ['classes', user?.email],
        enabled: !loading,
        queryFn: async () => {
            const response = await axiosSecure(`/classes?email=${user?.email}`)
            console.log(response);
            return response.data;
        }
    })
    return [classes, refetch]
}

export default useClasses