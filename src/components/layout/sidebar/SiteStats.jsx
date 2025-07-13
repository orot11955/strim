export default function SiteStats({ visitors = 0, posts = 0, comments = 0 }) {
  const stats = [
    { label: '방문자 수', value: visitors.toLocaleString() + '명' },
    { label: '전체 글 수', value: posts + '개' },
    { label: '댓글 수', value: comments + '개' },
  ];

  return (
    <div className="site-stats">
      {stats.map((stat, idx) => (
        <div className="site-stat-item" key={idx}>
          <div className="stat-value">{stat.value}</div>
          <div className="stat-label">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}