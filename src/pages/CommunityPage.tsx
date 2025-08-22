import TabMenu from '../components/Community/TabMenu'
import SearchBar from './../components/Community/SearchBar'
import MagazineSection from '../components/Community/MagazineSection'
import SharedConcernsSection from './../components/Community/SharedConcernsSection'

const CommunityPage = () => {
  return (
    <div className="min-h-screen font-[Pretendard] bg-white flex flex-col justify-between">
      <div>
        <TabMenu />
        <SearchBar />
        <MagazineSection />
        <SharedConcernsSection />
      </div>
    </div>
  )
}

export default CommunityPage
