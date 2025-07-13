import { useState } from "react";

export default function MailModal({ isOpen, onClose }) {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  if (!isOpen) return null;

  const sendMail = {};

  return (
<div className="modal-overlay">
  <div className="modal-content">
    <h2>메일 보내기</h2>
    <input type="text" placeholder="제목" />
    <textarea placeholder="내용" rows={6} />
    <div className="button-group">
      <button onClick={sendMail}>전송</button>
      <button onClick={onClose}>닫기</button>
    </div>
  </div>
</div>
  );
}