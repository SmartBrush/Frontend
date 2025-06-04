import React from 'react'
import TabMenu from '../components/Community/TabMenu'
import SearchBar from './../components/Community/SearchBar'
import HotTopicsSection from '../components/Community/HotTopicsSection'
import SharedConcernsSection from './../components/Community/SharedConcernsSection'

const CommunityPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col justify-between">
      <div>
        <TabMenu />
        <SearchBar />
        <HotTopicsSection />
        <SharedConcernsSection />
      </div>
    </div>
  )
}

export default CommunityPage
