import { useQueries } from 'react-query'
import axios from 'axios'

const fetchSuperHero = (heroId) => {
    return axios.get(`http://localhost:4000/superheroes/${heroId}`)
}

export const DynamicParallelPage = ({heroId}) => {
    const queryResults = useQueries(
        heroId.map(id => {
            return {
                queryKey: ['super-hero', id],
                queryFn: () => fetchSuperHero(id),
            }
        })
    )
    
    console.log({ queryResults });

    return <div>DynamicParallelPage</div>
}