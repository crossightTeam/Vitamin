import getFruits from 'api/getFruits'
import Fruit from 'components/Fruit'
import Head from 'components/Head'
import LoadingOrError from 'components/LoadingOrError'
import type { ReactElement } from 'react'
import { useQuery } from '@tanstack/react-query'
import validateServerConnection from 'api/validateServerConnection'

export default function GalleryPage(): ReactElement {
	const { isLoading, isError, error, data, isSuccess } = useQuery(
		['fruits'],
		getFruits
	)
	const serverRes = useQuery(
		['validateServerConnection'],
		validateServerConnection,
		{ enabled: isSuccess }
	)

	if (isLoading || isError) {
		return <LoadingOrError error={error as Error} />
	}

	const text = `connection status: ${serverRes.data?.status ?? 'ERROR'} ${
		serverRes.data?.statusText ?? ''
	}`

	return (
		<>
			<Head title='Vitamin' />
			<h1
				className={`py-2 text-center ${
					serverRes.isSuccess ? 'bg-green-500' : 'bg-red-500'
				}`}
			>
				{text}
			</h1>
			<div className='m-2 grid min-h-screen grid-cols-[minmax(0,384px)] place-content-center gap-2 md:m-0 md:grid-cols-[repeat(2,minmax(0,384px))] xl:grid-cols-[repeat(3,384px)]'>
				{data.map((fruit, index) => (
					<Fruit key={`FruitCard-${fruit.name}`} fruit={fruit} index={index} />
				))}
			</div>
		</>
	)
}
