import EventList from '@/components/EventList'
import SearchBar from '@/components/SearchBar/SearchBar'
import React from 'react'

function eventPage() {
  return (
    <section className='container px-4 mx-auto'>
        <SearchBar/>
        <EventList/>
    </section>
)
}

export default eventPage