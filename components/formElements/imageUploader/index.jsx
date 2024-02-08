import React, { useRef, useState, ChangeEvent } from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa';

const ImageUploader = ({fileLocation, fileName}) => {
  const fileInputRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [buttonColor, setButtonColor] = useState('#313131');
  const [buttonText, setButtonText] = useState('Resim Yükle');
  const [imageName, setImageName] = useState('');

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
      setSelectedImage(file);
      setButtonColor('#06d12f');
      setButtonText('Resim Seçildi');
    } else {
      setSelectedImage(null);
      setButtonColor('#313131');
      setButtonText('Resim Yükle');
      event.target.value = ''; // Resim seçimini sıfırlamak için input değerini boşaltıyoruz
    }

    if(event && event.target && event.target.files && event.target.files[0]){
        setImageName(event.target.files?.[0].name)
    }

    else if(file){
        setImageName(file.name)
    }
    else{
        setImageName('Resim Eklendi.')      
    }

  };

  const handleReset = () => {
    fileInputRef.current.value = ''; // Resim seçimini sıfırlamak için input değerini boşaltıyoruz
    setSelectedImage(null);
    setButtonColor('#313131');
    setButtonText('Resim Seç');
  };

  const handleUpload = () => {
    if (selectedImage) {
      const folderPath = './uploadedImages'; // Yeni klasör yolu
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageData = reader.result;
        // Burada resmi yükleyebilirsiniz (ör. bir API çağrısı yaparak)
      };
      reader.readAsDataURL(selectedImage);
    }
  };

  return (
    <div className="flex items-center gap-2 p-2">
      <input
        type="file"
        accept=".jpeg, .jpg, .png"
        onChange={handleImageChange}
        style={{ display: 'none' }}
        ref={fileInputRef}
      />
      {selectedImage && (
        <button className="text-white text-xl p-2 rounded-xl bg-cst_red" onClick={handleReset}>
          <FaTimes/>
        </button>
      )}
      <button
    //   min-w-[120px] p-2 rounded-xl  bg-secondary text-white hover:bg-primary hover:text-white hover:border-primary inline
        style={{backgroundColor: buttonColor}}
    className={` min-w-[120px] p-2 rounded-xl text-white hover:bg-primary hover:text-white hover:border-primary inline ${buttonColor}`}
        onClick={handleButtonClick}
      >
        <div className='flex flex-row flex-nowrap min-w-[140px] justify-center items-center'>
        {selectedImage && <FaCheck className="mr-2" />}
        {buttonText}
        </div>
      </button>
      
    </div>
  );
};

export default ImageUploader;
