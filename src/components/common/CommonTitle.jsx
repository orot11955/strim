export default function CommonTitle({ path }) {
  let title = path.split('/')[1];
  
  if(title === 'post') {
    title = path.split('/').filter(Boolean).pop();    
  } 

  return (
    <div className="title">
      <h1><span style={{color: '#1a8d3e'}}>&gt;</span>&nbsp;{title}</h1>
    </div>
  );
}