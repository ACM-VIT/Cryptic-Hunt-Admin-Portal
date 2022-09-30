import Card from '@material-tailwind/react/Card';
import CardHeader from '@material-tailwind/react/CardHeader';
import CardBody from '@material-tailwind/react/CardBody';
import Button from '@material-tailwind/react/Button';
import Progress from '@material-tailwind/react/Progress';
import { BACKEND_API_URL, defaultOptions } from 'pages/config'
import { useState, useEffect } from 'react';
import { isTemplateSpan } from 'typescript';

export default function TrafficCard() {
    // get requests from url
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`${BACKEND_API_URL}/admin/submissions/analysis`, defaultOptions
        )
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                setRequests(data);
                setLoading(false);
            })
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    return (
        <Card>
            <CardHeader color="purple" contentPosition="none">
                <div className="w-full flex items-center justify-between">
                    <h2 className="text-white text-2xl">Highest Questions Submissions</h2>
                    <Button
                        color="transparent"
                        buttonType="link"
                        size="lg"
                        style={{ padding: 0 }}
                    >
                        See More
                    </Button>
                </div>
            </CardHeader>
            <CardBody>
                <div className="overflow-x-auto">
                    <table className="items-center w-full bg-transparent border-collapse">
                        <thead className="thead-light">
                            <tr>
                                <th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                                    Question Group
                                </th>
                                <th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                                    Submissions
                                </th>
                                <th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left w-56"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {requests.map((item, index) => (
                                <tr key={index}>
                                    <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                        {item.name}
                                    </th>
                                    <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                        {item.submissions}
                                    </td>
                                    <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                        <Progress color="blue" value={item.percentageCorrect} />
                                    </td>
                                </tr>
                            ))}
                            {/* {`hello`}
                            <pre>
                                <code>
                                    {JSON.stringify(requests, null, 2)}
                                </code>
                            </pre> */}
                        </tbody>
                    </table>
                </div>
            </CardBody>
        </Card>
    );
}
