import TabMenu from '../components/Community/TabMenu'
import SearchBar from './../components/Community/SearchBar'
import MagazineSection from '../components/Community/MagazineSection'
import SharedConcernsSection from './../components/Community/SharedConcernsSection'

const CommunityPage = () => {
  return (
    <div className="min-h-screen mb-5 bg-white flex flex-col justify-between">
      <div>
        <div className="sticky top-0 z-50 bg-white">
          <TabMenu />
          <SearchBar />
        </div>

        <MagazineSection />
        <SharedConcernsSection />
      </div>
    </div>
  )
}

export default CommunityPage
