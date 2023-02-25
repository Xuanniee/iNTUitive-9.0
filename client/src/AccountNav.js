import {Link, useLocation} from "react-router-dom";

export default function AccountNav() {
    //uselocation gets the path
    const {pathname} = useLocation();
    let subpage = pathname.split('/')?.[2];
    //for profile page 
    if (subpage === undefined) {
        subpage = 'profile';
    }
    function linkClasses(type=null) {
        //check if the user is at the particular page 
        const isActive = pathname === '/account' && type === 'profile';
        let classes = 'inline-flex gap-1 py-2 px-6';
        if (type === false) {
            classes += ' bg-primary text-white rounded-full';
        } else {
            classes += ' bg-gray-200'
        }
        return classes;
    }
    
    return (
        <nav className="w-full flex justify-center mt-4 gap-2 mb-8">
            <Link className={linkClasses('profile')} to={'/account'}> 
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
                My profile 
            </Link>
            <Link className={linkClasses('summaries')} to={'/account/summaries'}> 
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                </svg>
                My summaries 
            </Link>
        </nav>
    )
}