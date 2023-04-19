import Head from 'next/head'
import NewMeetupForm from '@/components/meetups/NewMeetupForm'
import { useRouter } from 'next/router'

const NewMeetupPage = () => {
	const router = useRouter()
	async function onAddMeetup(enteredData) {
		const response = await fetch('/api/new-meetup', {
			method: 'POST',
			body: JSON.stringify(enteredData),
			headers: {
				'Content-Type': 'application/json',
			},
		})
		const data = await response.json()
		console.log('DATA:', data)

		router.push('/')
	}

	return (
		<>
			<Head>
				<title>Add a new meetup</title>
				<meta name='description' content='this is where you add a new meetup' />
			</Head>
			<NewMeetupForm onAddMeetup={onAddMeetup} />
		</>
	)
}

export default NewMeetupPage
