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
];

const statData = {
  visitors: 1,
  posts: 1,
  comments: 1
}

export default function Sidebar({ setIsMailModalOpen }) {
  return (
    <div className="layout-sidebar">
      <div className="sidebar-top">
        <Link href="/">
          <div className="logo">
            <img style={{width: 110}} src='/images/logo_y.png' />
          </div>
        </Link>
      </div>
      <div className="sidebar-menu">
        <MenuTree data={menuData} />
      </div>
      <div className="sidebar-bottom">
        <SnsButton size={{height: 30, width: 30}} src={"/images/dev_logo/github-mark.svg"} href={"https://github.com/orot11955"} />
        <SnsButton size={{height: 35, width: 35}} src={"/images/dev_logo/mail.svg"} setIsMailModalOpen={setIsMailModalOpen} />
      </div>
      <div className="sidebar-stats">
        <SiteStats visitors={statData.visitors} posts={statData.posts} comments={statData.comments} />
      </div>
    </div>
  );
}