import { useState, useEffect } from 'react';
import StatusCard from 'components/StatusCard';
import PageVisitsCard from 'components/PageVisitsCard';
import { BACKEND_API_URL, defaultOptions } from 'pages/config'
import TrafficCard from 'components/TrafficCard';

export default function Dashboard() {
    const [teams, setTeams] = useState([]);
    const [users, setUsers] = useState([]);
    const [accuracy, setAccuracy] = useState([]);
    const [submissions, setSubmissions] = useState([]);

    console.log("Inside Dashboard");

    useEffect(() => {
        console.log("fetching teams")

        fetch(`${BACKEND_API_URL}/admin/teams/count`, defaultOptions)
            .then((response) => response.json())
            .then((data) => {
                setTeams(data.count);
            })
        fetch(`${BACKEND_API_URL}/admin/users/count`, defaultOptions)
            .then((response) => response.json())
            .then((data) => {
                setUsers(data.count);
            })
        fetch(`${BACKEND_API_URL}/admin/submissions/count`, defaultOptions)
            .then((response) => response.json())
            .then((data) => {
                setSubmissions(data.count);
            })
        fetch(`${BACKEND_API_URL}/admin/submissions/accuracy`, defaultOptions)
            .then((response) => response.json())
            .then((data) => {
                setAccuracy(data.accuracy);
            })
    }, []);


    return (
        <>
            <div className="bg-light-blue-500 px-3 md:px-8 h-40" />
            <div className="px-3 md:px-8 -mt-24">
                <div className="container mx-auto max-w-full">
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 mb-4">
                        <StatusCard
                            color="pink"
                            icon="trending_up"
                            title="Users"
                            amount={users}
                            percentage="3.48"
                            percentageIcon="arrow_upward"
                            percentageColor="green"
                            date="Since last month"
                        />
                        <StatusCard
                            color="orange"
                            icon="groups"
                            title="Teams"
                            amount={teams}
                            percentage="3.48"
                            percentageIcon="arrow_downward"
                            percentageColor="red"
                            date="Since last week"
                        />
                        <StatusCard
                            color="purple"
                            icon="paid"
                            title="Submissions"
                            amount={submissions}
                            percentage="1.10"
                            percentageIcon="arrow_downward"
                            percentageColor="orange"
                            date="Since yesterday"
                        />
                        <StatusCard
                            color="blue"
                            icon="poll"
                            title="Accuracy"
                            amount={accuracy}
                            percentage="12"
                            percentageIcon="arrow_upward"
                            percentageColor="green"
                            date="Since last month"
                        />
                    </div>
                </div>
            </div>

            <div className="px-3 md:px-8 h-auto">
                <div className="container mx-auto max-w-full">
                    <div className="grid grid-cols-1 xl:grid-cols-5">
                        <div className="xl:col-start-1 xl:col-end-4 px-4 mb-14">
                            <TrafficCard />
                        </div>
                        <div className="xl:col-start-4 xl:col-end-6 px-4 mb-14">
                            <PageVisitsCard />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
