import Link from 'next/link';
import MenuTree from './sidebar/MenuTree';

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
    </div>
  );
}