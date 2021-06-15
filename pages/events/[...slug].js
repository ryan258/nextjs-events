// this will kick in for deeper directories pass events/[eventId]/...

import { useRouter } from 'next/router'

import ErrorAlert from '../../components/ui/ErrorAlert'
import ResultsTitle from '../../components/events/ResultsTitle'
import EventList from '../../components/events/EventList'
import Button from '../../components/ui/Button'

import { getFilteredEvents } from '../../dummy-data'

const FilteredEventsPage = () => {
  const router = useRouter()

  // get an array of the path elements, run only when you have access to the url data
  const filterData = router.query.slug
  // console.log(filterData)

  // run when we don't have the data yet
  if (!filterData) {
    return <p className="center">Loading...</p>
  }

  // then when it rerenders bc the data has arrived
  const [filteredYear, filteredMonth] = filterData

  const numYear = +filteredYear
  const numMonth = +filteredMonth

  if (
    isNaN(numYear) || //
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return (
      <>
        <ErrorAlert>
          <p>Filter invalid! Please double check your filters.</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    )
  }

  const filteredEvents = getFilteredEvents({
    year: numYear,
    month: numMonth
  })

  // valid filters, but no matching events
  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <>
        <ErrorAlert>
          <p>No events found the match your criteria 👻</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    )
  }

  const date = new Date(numYear, numMonth - 1)

  return (
    <div>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </div>
  )
}

export default FilteredEventsPage
