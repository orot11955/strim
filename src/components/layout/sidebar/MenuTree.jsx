import { useRouter } from 'next/router';
import { useState, useMemo } from 'react';
import Image from 'next/image';

export default function MenuTree({ data, depth = 0, parentPath = '' }) {
  const router = useRouter();

  const getKey = (depth, index) => `${depth}-${index}`;

  const defaultOpenKeys = useMemo(() => {
    const result = [];

    const traverse = (items, currentPath, currentDepth) => {
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const fullPath = item.path || `${currentPath}/${item.title}`;
        const key = getKey(currentDepth, i);

        if (item.path === router.asPath) {
          result.push(key);
          return true;
        }

        if (item.children && traverse(item.children, fullPath, currentDepth + 1)) {
          result.push(key);
          return true;
        }
      }
      return false;
    };

    traverse(data, parentPath, depth);
    return result;
  }, [router.asPath, data, parentPath, depth]);

  const [openMap, setOpenMap] = useState(() => {
    const map = {};
    defaultOpenKeys.forEach((key) => {
      map[key] = true;
    });
    return map;
  });

  const toggle = (key) => {
    setOpenMap((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleClick = (item, key, hasChildren) => {
    if (hasChildren) {
      toggle(key);
    } else if (item.path && item.path !== router.asPath) {
      router.replace(item.path);
    }
  };

  return (
    <ul className="menu-tree" style={{ paddingLeft: depth * 12 }}>
      {data.map((item, index) => {
        const key = getKey(depth, index);
        const hasChildren = item.children?.length > 0;
        const isOpen = openMap[key];
        const isSelected = item.path === router.asPath;

        return (
          <li key={key}>
            <div
              className={`menu-item ${isSelected ? 'selected' : ''}`}
              onClick={() => handleClick(item, key, hasChildren)}
              style={{ paddingLeft: hasChildren ? 0 : 24 }}
            >
              {hasChildren && (
                <Image
                  src={isOpen ? '/images/down-arrow.svg' : '/images/right-arrow.svg'}
                  alt="arrow"
                  width={12}
                  height={12}
                  className="arrow-icon"
                />
              )}
              <span>{item.title}</span>
              {isSelected ? <div style={{color: '#188c3b', fontWeight: 'bolder'}}>|</div> : <></>}
            </div>

            {hasChildren && isOpen && (
              <MenuTree
                data={item.children}
                depth={depth + 1}
                parentPath={item.path || `${parentPath}/${item.title}`}
              />
            )}
          </li>
        );
      })}
    </ul>
  );
}