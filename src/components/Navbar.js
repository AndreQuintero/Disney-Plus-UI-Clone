/* eslint-disable @next/next/no-img-element */
import Link from "next/link"

const Navbar = ({account}) => {
    return (
        <div className="navbar">
            <div className="logo-wrapper">
                <Link href="/"><img src="/disney.png" alt="Disney Logo" width={90} height={50}/></Link>
            </div>
            <div className="account-info">
                <p>Welcome <strong>{account?.username}</strong></p>
                <img className="avatar" src={account?.avatar?.url} alt="avatar"/>
            </div>
        </div>
    )
}

export default Navbar