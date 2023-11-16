import React, { useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { db } from '../../firebase/firebase'; // Import firestore từ file cấu hình Firebase của bạn
import "./Add_Profile.css";
import { collection, addDoc, serverTimestamp  } from 'firebase/firestore';

const AddProfile = () => {
  const [profileName, setProfileName] = useState('');
  const [editorContent, setEditorContent] = useState('');

  const handleAddProfile = async () => {
    console.log('handleAddProfile called', { profileName, editorContent });
    try {
      // Kiểm tra xem đã nhập tên hồ sơ và nội dung hay chưa
      if (!profileName || !editorContent) {
        alert("Vui lòng nhập tên hồ sơ và nội dung!");
        return;
      }
      
      // Thêm dữ liệu vào Firestore (cập nhật theo cú pháp mới của Firebase v9+)
      await addDoc(collection(db, 'profile'), {
        ProfileName: profileName,
        ProfileContent: editorContent,
        ProfileStatus: 0,
        timestamp: serverTimestamp(),
        Operation: 0,
        Comment: null,
      });

      console.log('Adding profile...');
      // Reset trạng thái của component sau khi thêm thành công
      setProfileName('');
      setEditorContent('');

      alert("Đã thêm hồ sơ thành công!");
    } catch (error) {
      console.error("Lỗi khi thêm hồ sơ:", error);
      alert("Đã xảy ra lỗi khi thêm hồ sơ. Vui lòng thử lại sau.");
    }
  };

  const handleEditorChange = (content) => {
    console.log('Editor Content:', content);
    setEditorContent(content);
  };
  return (
    <div>
      <div className='AddProfile'>
        <h1>THÊM HỒ SƠ</h1>
        <div className='Utilities'>
          <div className='Marquee'>
          <marquee behavior="scroll" direction="left">Ở trang này, bạn có thể làm giống như ở trên phần mềm Word, trong đây có 1 số tính năng ẩn chưa được dùng, ngoài ra nếu bạn muốn lấy nội dung từ file docx qua thì chỉ cần copy và dán vào</marquee>
          </div>
        <div className='ButtonAdd'>
        <button onClick={handleAddProfile}>+ THÊM</button>

        </div>
        </div>
        <div className='ProfileName'>
        <label htmlFor="">Tên hồ sơ:</label>
        <input
          type="text"
          placeholder='Nhập tên hồ sơ...'
          value={profileName}
          onChange={(e) => setProfileName(e.target.value)}
          
        />
      </div>
        <div className=''>
        </div>
        <div className='Editor'>
        <Editor
        
      apiKey='ypivlx7q24hham80v1bu9bf2qwpqmzo6v8ltq833kw639r5o'
      init={{
        height: 500,
        plugins: 'ai preview pagebreak visualchars code fullscreen insertdatetime template help advlist tinycomments mentions anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents mergetags powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss',
        toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat | export',
        export_word_formats: 'docx',  // Định dạng Word bạn muốn cho phép xuất
        tinycomments_mode: 'embedded',
        tinycomments_author: 'Author name',
        mergetags_list: [
          { value: 'First.Name', title: 'First Name' },
          { value: 'Email', title: 'Email' },
        ],
        ai_request: (request, respondWith) => respondWith.string(() => Promise.reject("See docs to implement AI Assistant")),
      }}
      onEditorChange={handleEditorChange}
      // initialValue="Nhập nội dung tại đây"
    />
    </div>
      </div>
    </div>
  );
};

export default AddProfile;