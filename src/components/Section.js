import Link from 'next/link'

import Card from './Card'

const Section = ({genre, videos}) => {
    return (
        <div className="section">
            <h3>{genre}</h3>
            <div>
                {videos.map( video => (
                    <Link key={video.id} href={`/video/${video.slug}`} >
                        <a>
                            <Card thumbnail={video.thumbnail}/>
                        </a>
                    </Link>
                   
                ))}
            </div>
        </div>
    )
}

export default Section