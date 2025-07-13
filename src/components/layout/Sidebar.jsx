import Link from 'next/link';
import MenuTree from './sidebar/MenuTree';
import SnsButton from './sidebar/SnsButton';
import SiteStats from './sidebar/SiteStats';

const menuData = [
  {
    title: 'Home',
    path: '/'
  },
   {
    title: 'Profile',
    path: '/profile'
  },
  {
    title: 'Post',
    children: [
      { title: 'Spring', path: '/post/spring' },
      { title: 'React', path: '/post/react' }
    ]
  },
  {
    title: 'Review',
    path: '/post/review'
  },
  {
    title: 'Note',
    path: '/post'
  }
];

const statData = {
  visitors: 2304,
  posts: 221,
  comments: 23
}

export default function Sidebar() {
  return (
    <div className="layout-sidebar">
      <div className="sidebar-top">
        <Link href="/">
          <div className="logo">
            <div style={{color: '#188c3b', fontWeight: 'bolder'}}>&gt;</div>
            <div>orot</div>
          </div>
        </Link>
      </div>
      <div className="sidebar-menu">
        <MenuTree data={menuData} />
      </div>
      <div className="sidebar-bottom">
        <SnsButton src={"/images/dev_logo/github.svg"} href={"https://github.com/orot11955"} />
        <SnsButton src={"/images/dev_logo/mail.svg"} />
      </div>
      <div className="sidebar-stats">
        <SiteStats visitors={statData.visitors} posts={statData.posts} comments={statData.comments}/>
      </div>
    </div>
  );
}