import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingPage from "../../components/LoadingPage/LoadingPage";

const LatestCharityRequests = () => {
  const axiosSecure = useAxiosSecure();
  const { data: requests = [], isLoading } = useQuery({
    queryKey: ["latestCharityRequests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/charity-requests/latest"); // adjust API if needed
      return res.data;
    },
  });

  if (isLoading) return <LoadingPage></LoadingPage>;

  return (
    <section className="my-16 px-4 max-w-11/12 mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8 ">
        Latest Charity Requests
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {requests.slice(0, 3).map((request) => (
          <div
            key={request._id}
            className="bg-white rounded-2xl shadow-lg p-6 border hover:shadow-2xl transition"
          >
            <div className="flex items-center gap-4 mb-4">
              <img
                src={request.charityImage}
                alt={request.charityName}
                className="w-14 h-14 rounded-full object-cover border"
              />
              <div>
                <h3 className="font-semibold text-lg">{request.charityName}</h3>
                <p className="text-sm text-gray-500">
                  Donation: {request.donationTitle}
                </p>
              </div>
            </div>
            <p className="text-gray-700 text-sm">{request.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LatestCharityRequests;
