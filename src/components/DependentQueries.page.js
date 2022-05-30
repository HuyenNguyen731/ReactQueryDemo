import { useQueries, useQuery } from 'react-query'
import axios from 'axios'

const fetchUserByEmail =(email) => {
    return axios.get(`http://localhost:4000/users/${email}`)
}

const fetchCourseByChannelId =(channelId) => {
    return axios.get(`http://localhost:4000/channels/${channelId}`)
}


export const DependentQueriesPage = ({ email }) => {
    const { data: user} = useQuery(['user', email], () => 
        fetchUserByEmail(email)
    )
    const channelId = user?.data.channelId


    const { data: channel} = useQuery(['channel', channelId], () => 
        fetchCourseByChannelId(channelId),
        {
            enabled: !!channelId
        }
    )

    console.log(channel?.data.courses);

    return (
        <>
            <h2>DependentQueries</h2>
            {
                channel?.data.courses.map(course => {
                    return <div key={course}>{course}</div>
                })
            }
        </>
    )
}