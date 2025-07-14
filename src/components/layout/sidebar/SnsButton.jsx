import Link from "next/link";

export default function SnsButton({ size, src, href, setIsMailModalOpen }) {

  const buttonStyle = {
    filter: 'invert(39%) sepia(98%) saturate(422%) hue-rotate(85deg) brightness(90%) contrast(87%)',
    height: size.height,
    width: size.width
  }

  return setIsMailModalOpen ? <div className="sns-button"><img style={buttonStyle} src={src} onClick={() => setIsMailModalOpen(true)} /></div>
    : <Link className="sns-button" href={href ? href : ""}><img style={buttonStyle} src={src} /></Link>;
}