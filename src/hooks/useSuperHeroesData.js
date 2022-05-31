import { useQuery, useMutation, useQueryClient } from 'react-query'
import axios from 'axios'

const fetchSuperHeroes = () => {
    return axios.get('http://localhost:4000/superheroes')
}

const addSuperHero = (hero) => {
    return axios.post('http://localhost:4000/superheroes', hero)
}


export const useSuperHeroesData = (onSuccess, onError) => {
    return useQuery(
        'super-heroes', 
        fetchSuperHeroes,
        {
            onSuccess,
            onError,
            // enabled: false,
            // select: (data) => {
            //     const superHeroesNames = data.data.map((hero) => hero.name)
            //     return superHeroesNames
            // }
        }
    )
}

export const useAddSuperHeroData = () => {
    const queryClient = useQueryClient()
    return useMutation(addSuperHero, {
        // onSuccess: (data) => {
        //     // queryClient.invalidateQueries('super-heroes')
        //     queryClient.setQueryData('super-heroes', (oldQueryData) => {
        //         return {
        //             ...oldQueryData,
        //             data: [...oldQueryData.data, data.data],
        //         }
        //     })
        // }
        // Async - khai báo một hàm bất đồng bộ
        // Await - tạm dừng việc thực hiện các hàm async
        onMutate: async(newHero) => {
            await queryClient.cancelQueries('super-heroes')
            const previousHeroData = queryClient.getQueryData('super-heroes')
            queryClient.setQueryData('super-heroes', (oldQueryData) => {
                return {
                    ...oldQueryData,
                    data: [
                        ...oldQueryData.data,
                        { id: oldQueryData?.data?.length + 1, ...newHero},
                    ]
                }
            })
            return {
                previousHeroData,
            }
        },
        onError: (_error, _hero, context) => {
            // set data = previous data
            queryClient.setQueryData('super-heroes', context.previousHeroData)
        },
        onSettled: () => {
            // run khi success or error
            // refresh data
            queryClient.invalidateQueries('super-heroes')
        },
    })
}
