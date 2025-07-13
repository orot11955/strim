import Link from "next/link";

export default function SnsButton({ src, href }) {

  const buttonStyle = {
    filter: 'invert(39%) sepia(98%) saturate(422%) hue-rotate(85deg) brightness(90%) contrast(87%)',
    height: '35px',
    width: '35px'
  }

  return <Link className="sns-button" href={href ? href : ""}><img style={buttonStyle} src={src}/></Link>;
}