import { PodcastCard } from "@/components/podcast-card"
import { PODCAST_DATA } from "@/constants"

const Home = () => {
  return (
    <div className='mt-9 flex flex-col gap-9'>
      <section className='flex flex-col gap-5'>
        <h1 className='text-20 font-bold text-white-1'>Trending Podcast</h1>
        {PODCAST_DATA.map((podcast) => (<PodcastCard key={podcast.id} />))}
      </section>
    </div>
  )
}

export default Home