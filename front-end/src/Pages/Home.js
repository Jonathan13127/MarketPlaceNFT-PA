import { VideoComponent } from '../Components/VideoComponent/videoComponent'
import { Card } from '../Components/Card/Card'

export const Home = () => {
    
    return (
        <main className='App w-fit h-fit mt-24'>
            <div className='w-screen'>
                <VideoComponent />
            </div>
            <Card />
        </main>
    )
}