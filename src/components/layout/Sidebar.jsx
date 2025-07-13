import Link from 'next/link';
import MenuTree from './sidebar/MenuTree';
import SnsButton from './sidebar/SnsButton';
import SiteStats from './sidebar/SiteStats';

const menuData = [
  {
    title: '홈',
    path: '/'
  },
   {
    title: '프로필',
    path: '/profile'
  },
  {
    title: '포스트',
    children: [
      { title: 'Spring', path: '/post/spring' },
      { title: 'React', path: '/post/react' },
      { title: 'DB', path: '/post/db' }
    ]
  },
  {
    title: '리뷰',
    path: '/post/review'
  },
  {
    title: '노트',
    path: '/note'
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