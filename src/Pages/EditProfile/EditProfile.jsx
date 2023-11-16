import React, { useState, useEffect, useRef  } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { db } from '../../firebase/firebase'; // Import firestore từ file cấu hình Firebase của bạn
import "./EditProfile.css";
import { doc, updateDoc, serverTimestamp  } from 'firebase/firestore';

const EditProfile = () => {
    const profileData = JSON.parse(sessionStorage.getItem('profileData')) || {};
    const [profileName, setProfileName] = useState(profileData.ProfileName || '');
    const [editorContent, setEditorContent] = useState(profileData.ProfileContent || '');
    const editorContentRef = useRef(profileData.ProfileContent || '');
    useEffect(() => {
        // Cập nhật trạng thái chỉ khi có thay đổi
        if (profileData.ProfileName !== profileName) {
            setProfileName(profileData.ProfileName);
        }
        if (profileData.ProfileContent !== editorContent) {
            setEditorContent(profileData.ProfileContent);
        }
    }, [profileData.ProfileName, profileData.ProfileContent]);
    

    const handleUpdateProfile = async () => {
        try {
            if (!profileName || !editorContentRef.current) {
                alert("Vui lòng nhập tên hồ sơ và nội dung!");
                return;
            }
    
            const docRef = doc(db, 'profile', profileData.id);
            await updateDoc(docRef, {
                ProfileName: profileName,
                ProfileContent: editorContentRef.current,
                timestamp: serverTimestamp(),
                //... cập nhật các trường khác nếu cần
            });
    
            console.log('Updating profile...');
            alert("Hồ sơ đã được cập nhật thành công!");
        } catch (error) {
            console.error("Lỗi khi cập nhật hồ sơ:", error);
            alert("Đã xảy ra lỗi khi cập nhật hồ sơ. Vui lòng thử lại sau.");
        }
    };
      
     

    const handleEditorChange = (content) => {
        editorContentRef.current = content;
    };
    
   

  return (
    <div>
      <div className='AddProfile'>
        <h1>SỬA HỒ SƠ</h1>
        <div className='Utilities'>
          <div className='Marquee'>
          <marquee behavior="scroll" direction="left">Ở trang này, bạn có thể chỉnh sửa giống như ở trên phần mềm Word, trong đây có 1 số tính năng ẩn chưa được dùng, ngoài ra nếu bạn muốn lấy nội dung từ file docx qua thì chỉ cần copy và dán vào</marquee>
          </div>
        <div className='ButtonAdd'>
        <button onClick={handleUpdateProfile}>+ Cập Nhật</button>

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
      key={profileData.id || 'new'}
      initialValue={editorContent}
      onEditorChange={handleEditorChange}
      // initialValue="Nhập nội dung tại đây"
    />
    </div>
      </div>
    </div>
  );
};

export default EditProfile;