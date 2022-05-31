import { useState } from 'react'
import { useAddSuperHeroData, useSuperHeroesData } from '../hooks/useSuperHeroesData';
import { Link } from 'react-router-dom'

export const RQSuperHeroesPage = () => {

    const [name, setName] = useState('')
    const [alterEgo, setAlterEgo] = useState('')

    const onSuccess = (data) => {
        console.log("Perform side effect after data fetching", data);
    }

    const onError = (error) => {
        console.log("Perform side effect after encountering error", error);
    }

    const {isLoading, data, isError, error, isFetching, refetch} = 
        useSuperHeroesData(onSuccess, onError)

    const { mutate : addHero } = useAddSuperHeroData()

    const handleAddHeroClick = () => {
        console.log("hi:", { name, alterEgo });
        const hero = { name, alterEgo }
        addHero(hero)
    }

    if(isLoading || isFetching) {
        return <h2>Loading...</h2>
    }

    if(isError) {
        return <h2>{error.message}</h2>
    }

    return (
        <>
            <h2>RQ Super Heroes Page</h2>
            <div>
                <input
                    type='text'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                 <input
                    type='text'
                    value={alterEgo}
                    onChange={(e) => setAlterEgo(e.target.value)}
                />
                <button onClick={handleAddHeroClick}>Add Hero</button>
            </div>
            <button onClick={refetch}>Fetch heroes</button>
            {
                data?.data.map((hero) => {
                    return <div key={hero.id}>
                        <Link to={`/rq-super-heroes/${hero.id}`}>{hero.name}</Link>
                    </div>
                })
            }
            {/* {
                data.map(heroNames => {
                    return <div key={heroNames}>{heroNames}</div>
                })
            } */}
        </>
    )
}