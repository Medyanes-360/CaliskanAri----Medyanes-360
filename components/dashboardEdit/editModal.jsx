import React, { useState, useEffect } from "react";
import { SketchPicker } from "react-color";
import Image from "next/image";
import { postAPI, getAPI } from "@/services/fetchAPI";
import Swal from "sweetalert2";
import AWS from "aws-sdk";
const EditModal = ({ isOpen, onClose, modalContent, pageId }) => {
  const [selectedColor, setSelectedColor] = useState("#000000");
  const [selectedTextColor, setSelectedTextColor] = useState("#000000");
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageStudents, setSelectedImageStudents] = useState(null);
  const [selectedImageVideo, setSelectedImageVideo] = useState(null);
  const [selectedImageMain, setSelectedImageMain] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [selectedImagesInformations, setSelectedImagesInformations] = useState(
    []
  );
  const [categories, setCategories] = useState([]); //DERSLER KATEGORİLER
  const [menus, setMenus] = useState([]); //SABİT OLAN VERİLERR BUNU DB DEN ÇEKECEĞİZ
  const [courses, setCourses] = useState([]); //SABİT OLAN KURSLAR
  const [info, setInfo] = useState({}); // SABİT BİLGİLERİ ALIDIĞIMIZ DEĞİŞKEN
  const [informations, setInformations] = useState([]); //İNFORMATİONS ALANI İÇİN SABİT VERİLER
  const [contact, setContact] = useState({}); //FOOTER İLETİŞİM BİLGİLERİ
  const [resources, setResources] = useState([]); //FOOTER KAYNAKLAR DEĞİŞKENİ
  const [logobanner, setLogoBanner] = useState([]); //LOGO BANNER SAYFASINDAKİ RESİMLER
  const [image, setImage] = useState({});
  const [footercourses, setFootercourses] = useState([]); //FOOTER KURSLAR DEĞİŞKENİ
  const [featured, setFeatured] = useState([]); //FEATURED DEĞİŞKENİ
  const uploadImageToS3Course = async (imageFile, field) => {
    const S3_BUCKET = "caliskanari";
    const REGION = "us-east-1";
    AWS.config.update({
      accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY,
      secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
    });
    const params = {
      Bucket: S3_BUCKET,
      Key: `images/${imageFile.name}`,
      Body: imageFile,
    };

    const s3 = new AWS.S3({
      params: { Bucket: S3_BUCKET },
      region: REGION,
    });

    var upload = s3
      .putObject(params)
      .on("httpUploadProgress", (evt) => {
        console.log(
          "Uploading " + parseInt((evt.loaded * 100) / evt.total) + "%"
        );
      })
      .promise();

    await upload.then((err, data) => {
      console.log(data);
      setNewCourse((prevCourse) => ({
        ...prevCourse,
        [field]: `https://caliskanari.s3.amazonaws.com/images/${imageFile.name}`,
      }));
      console.log(err);
    });
  };
  useEffect(() => {
    const featuresData = getAPI("/home/HomeFeatured");
    featuresData
      .then(function (result) {
        setFeatured(result);
      })
      .catch(function (error) {
        console.error("Hata oluştu:", error);
      });
    const MenusData = getAPI("/home/HomeMenus");

    MenusData.then(function (result) {
      setMenus(result);
    }).catch(function (error) {
      console.error("Hata oluştu:", error);
    });
    const coursesData = getAPI("/home/HomeCoursesCard");

    coursesData
      .then(function (result) {
        setCourses(result);
      })
      .catch(function (error) {
        console.error("Hata oluştu:", error);
      });
    const categoryData = getAPI("/home/HomeCategories");

    categoryData
      .then(function (result) {
        setCategories(result);
      })
      .catch(function (error) {
        console.error("Hata oluştu:", error);
      });
    const infoData = getAPI("/home/HomeInfo");

    infoData
      .then(function (result) {
        setInfo(result);
      })
      .catch(function (error) {
        console.error("Hata oluştu:", error);
      });
    const informationsData = getAPI("/home/HomeInformation");

    informationsData
      .then(function (result) {
        setInformations(result);
      })
      .catch(function (error) {
        console.error("Hata oluştu:", error);
      });
    const footerCoursesData = getAPI("/home/HomeFooterCourses");

    footerCoursesData
      .then(function (result) {
        setFootercourses(result);
      })
      .catch(function (error) {
        console.error("Hata oluştu:", error);
      });
    const footerResourcesData = getAPI("/home/HomeResources");

    footerResourcesData
      .then(function (result) {
        setResources(result);
      })
      .catch(function (error) {
        console.error("Hata oluştu:", error);
      });
    const footerContactData = getAPI("/home/HomeContact");

    footerContactData
      .then(function (result) {
        setContact(result);
      })
      .catch(function (error) {
        console.error("Hata oluştu:", error);
      });
    const imagetData = getAPI("/home/HomeImage");

    imagetData
      .then(function (result) {
        setImage(result);
      })
      .catch(function (error) {
        console.error("Hata oluştu:", error);
      });
    const logoBannertData = getAPI("/home/HomeLogoBanner");

    logoBannertData
      .then(function (result) {
        setLogoBanner(result);
      })
      .catch(function (error) {
        console.error("Hata oluştu:", error);
      });
  }, []);

  const [newCourse, setNewCourse] = useState({
    title: "",
    quantity: null,
    icon: "",
    border: "",
    background: "",
    extraField: "",
  }); //YENİ KURS EKLEME DEĞİŞKENİ
  const [newFeature, setNewFeature] = useState({
    title: "",
    name: "",
    image: "",
    price: "",
    star: null,
    topDesc: "",
    students: null,
    lessons: null,
  }); //YENİ DERS EKLEME DEĞİŞKENİ
  const [newNavbar, setNewNavbar] = useState({
    name: "",
    items: [],
  }); //YENİ MENU EKLEME DEĞİŞKENİ
  const [newFeatureCategory, setNewFeatureCategory] = useState({
    name: "",
  }); //YENİ KATEGORİ EKLEME DEĞİŞKENİ

  const handleAddCourseInputChange = (event, field) => {
    const { value, files } = event.target;
    if (field === "icon" && files && files.length > 0) {
      const imageFile = files[0];
      uploadImageToS3Course(imageFile, field);
    } else {
      setNewCourse((prevCourse) => ({
        ...prevCourse,
        [field]: value,
      }));
    }
  }; //YENİ KURS EKLEME

  const handleAddFeatureInputChange = (event, field) => {
    const { value, files } = event.target;
    if (field === "image" && files && files.length > 0) {
      const imageFile = files[0];

      uploadImageToS3(imageFile, field);
    } else {
      setNewFeature((prevFeature) => ({
        ...prevFeature,
        [field]: value,
      }));
    }
  };

  const uploadImageToS3 = async (imageFile, field) => {
    const S3_BUCKET = "caliskanari";
    const REGION = "us-east-1";
    AWS.config.update({
      accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY,
      secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
    });
    const params = {
      Bucket: S3_BUCKET,
      Key: `images/${imageFile.name}`,
      Body: imageFile,
    };

    const s3 = new AWS.S3({
      params: { Bucket: S3_BUCKET },
      region: REGION,
    });

    var upload = s3
      .putObject(params)
      .on("httpUploadProgress", (evt) => {
        console.log(
          "Uploading " + parseInt((evt.loaded * 100) / evt.total) + "%"
        );
      })
      .promise();

    await upload.then((err, data) => {
      setNewFeature((prevFeature) => ({
        ...prevFeature,
        [field]: `https://caliskanari.s3.amazonaws.com/images/${imageFile.name}`,
      }));
      console.log(err);
    });
  };
  const handleAddFeatureCategoryInputChange = (event, field) => {
    const { value, files } = event.target;
    if (field === "image" && files && files.length > 0) {
      const imageFile = files[0];
      setNewFeatureCategory((prevFeatureCategories) => ({
        ...prevFeatureCategories,
        [field]: URL.createObjectURL(imageFile),
      }));
    } else {
      setNewFeatureCategory((prevFeatureCategories) => ({
        ...prevFeatureCategories,
        [field]: value,
      }));
    }
  }; //YENİ KATEGORİ EKLEME

  const handleAddCourse = async (event) => {
    event.preventDefault();
    setCourses((prevCourses) => [...prevCourses, newCourse]);
    setNewCourse({
      title: "",
      quantity: null,
      icon: "",
      border: "",
      background: "",
      extraField: "",
    });
    const response = await postAPI("/home/addCourse", newCourse);
    Swal.fire({
      title: "Başarılı",
      text: "Kurs başarılı bir şekilde eklendi.",
      icon: "success",
    });
    closeAddCourseModal();
  }; //YENİ KURS EKLEME

  const handleAddFeature = async (event) => {
    event.preventDefault();
    setFeatured((prevFeature) => [...prevFeature, newFeature]);
    setNewFeature({
      title: "",
      name: "",
      image: "",
      price: "",
      star: null,
      topDesc: "",
      students: null,
      lessons: null,
    });
    const response = await postAPI("/home/addFeature", newFeature);
    Swal.fire({
      title: "Başarılı",
      text: "Ders başarılı bir şekilde eklendi.",
      icon: "success",
    });
    closeAddFeatureModal();
  }; //YENİ KURS EKLEME
  const handleAddNavbarInputChange = (event, field, index) => {
    const { value } = event.target;
    if (field === "items") {
      setNewNavbar((prevNavbar) => {
        const updatedItems = [...prevNavbar.items]; // Create a copy of the items array
        updatedItems[index] = value; // Update the value at the specified index
        return {
          ...prevNavbar,
          [field]: updatedItems,
        };
      });
    } else {
      setNewNavbar((prevNavbar) => ({
        ...prevNavbar,
        [field]: value,
      }));
    }
  }; //YENİ MENU EKLEME
  const deleteNavbarMenu = async (deleteObject) => {
    Swal.fire({
      title: "Menüyü Sil",
      text: "Menüyü gerçekten silmek istiyor musunuz ?",
      showCancelButton: true,
      icon: "warning",
      confirmButtonColor: "#241341",
      cancelButtonColor: "#d33",
      confirmButtonText: "Evet",
      cancelButtonText: `İptal`,
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        const response = await postAPI(
          "/home/deleteMenu",
          deleteObject.id,
          "DELETE"
        );
        const updatedMenus = menus.filter(
          (menu) => menu.id !== deleteObject.id
        );
        setMenus(updatedMenus);
        Swal.fire("Silindi !", "", "success");
      } else if (result.isDenied) {
        Swal.fire("İşlem iptal edildi !", "", "info");
      }
    });
  }; //NAVBAR DAN MENÜ SİLME

  const deleteCourse = async (deleteObject) => {
    Swal.fire({
      title: "Kursu Sil",
      text: "Kursu gerçekten silmek istiyor musunuz ?",
      showCancelButton: true,
      icon: "warning",
      confirmButtonColor: "#241341",
      cancelButtonColor: "#d33",
      confirmButtonText: "Evet",
      cancelButtonText: `İptal`,
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        const updatedCourses = courses.filter(
          (course) => course.id !== deleteObject.id
        );
        setCourses(updatedCourses);
        const response = await postAPI(
          "/home/deleteCourse",
          deleteObject.id,
          "DELETE"
        );
        Swal.fire("Silindi !", "", "success");
      } else if (result.isDenied) {
        Swal.fire("İşlem iptal edildi !", "", "info");
      }
    });
  }; //KURS SİLME
  const deleteFeature = async (deleteObject) => {
    Swal.fire({
      title: "Dersi Sil",
      text: "Dersi gerçekten silmek istiyor musunuz ?",
      showCancelButton: true,
      icon: "warning",
      confirmButtonColor: "#241341",
      cancelButtonColor: "#d33",
      confirmButtonText: "Evet",
      cancelButtonText: `İptal`,
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        const updatedFeatures = featured.filter(
          (feature) => feature.id !== deleteObject.id
        );
        setFeatured(updatedFeatures);
        const response = await postAPI(
          "/home/deleteFeature",
          deleteObject.id,
          "DELETE"
        );
        Swal.fire("Silindi !", "", "success");
      } else if (result.isDenied) {
        Swal.fire("İşlem iptal edildi !", "", "info");
      }
    });
  }; //DERS SİLME

  const deleteFeatureCategory = async (deleteObject) => {
    Swal.fire({
      title: "Kategoriyi Sil",
      text: "Kategoriyi gerçekten silmek istiyor musunuz ?",
      showCancelButton: true,
      icon: "warning",
      confirmButtonColor: "#241341",
      cancelButtonColor: "#d33",
      confirmButtonText: "Evet",
      cancelButtonText: `İptal`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const updatedCategory = categories.filter(
          (category) => category.id !== deleteObject.id
        );
        setCategories(updatedCategory);
        const response = await postAPI(
          "/home/deleteCategory",
          deleteObject.id,
          "DELETE"
        );
        Swal.fire("Silindi !", "", "success");
      } else if (result.isDenied) {
        Swal.fire("İşlem iptal edildi !", "", "info");
      }
    });
  }; //KATEGORİ SİLME
  const handleAddNavbar = async (event) => {
    event.preventDefault();
    setNewNavbar({
      name: "",
      items: [],
    });
    setMenus((preMenus) => [...preMenus, newNavbar]);
    const response = await postAPI("/home/addMenu", newNavbar);
    Swal.fire({
      title: "Başarılı",
      text: "Menü başarılı bir şekilde eklendi.",
      icon: "success",
    });
    closeAddNavbarModal();
  }; // YENİ MENU EKLEME
  const handleAddFeatureCategory = async (event) => {
    event.preventDefault();
    setCategories((prevFeatureCategories) => [
      ...prevFeatureCategories,
      newFeatureCategory,
    ]);
    setNewFeatureCategory({
      name: "",
    });
    const response = await postAPI("/home/addCategory", newFeatureCategory);
    Swal.fire({
      title: "Başarılı",
      text: "Kategori başarılı bir şekilde eklendi.",
      icon: "success",
    });
    closeAddFeatureCategoryModal();
  }; // YENİ MENU EKLEME
  const handleAddAnotherItem = () => {
    setUnderMenuCount((prevCount) => prevCount + 1);
  };
  const handleDeleteAnotherItem = () => {
    setUnderMenuCount((prevCount) => prevCount - 1);
  };
  const [selectedBigInputIndex, setSelectedBigInputIndex] = useState(null);
  const [isChildInputModalOpen, setChildInputModalOpen] = useState(false);
  const [addCourse, setAddCourse] = useState(false);
  const [addNavbar, setAddNavbar] = useState(false);
  const [addFeatureCategory, setAddFeatureCategory] = useState(false);
  const [addFeature, setAddFeature] = useState(false);

  const handleColorChange = (color) => {
    setSelectedColor(color.hex);
  };

  const handleTextColorChange = (color) => {
    setSelectedTextColor(color.hex);
  };

  const handleInputChange = (event, menuIndex, itemIndex = null) => {
    if (itemIndex === null) {
      const newMenus = [...menus];
      newMenus[menuIndex] = {
        ...newMenus[menuIndex],
        name: event.target.value,
      };
      setMenus(newMenus);
    } else {
      const newMenus = menus.map((menu, i) =>
        i === menuIndex
          ? {
              ...menu,
              items: menu.items.map((item, j) =>
                j === itemIndex ? event.target.value : item
              ),
            }
          : menu
      );
      setMenus(newMenus);
    }
  }; //NAVBAR YAZI DEĞİŞTİREN FONKSİTON

  const handleInputChangeInfo = (event, key) => {
    const newInfo = { ...info }; // Info objesini kopyala
    newInfo[0][key] = event.target.value; // Belirtilen anahtarın değerini değiştir
    setInfo(newInfo); // Güncellenmiş bilgileri ayarla
  }; //INFO YAZI DEĞİŞTİREN FONKSİTON

  // Kurs bilgileri için input değişiklik işlevi
  const handleInputChangeFooterCourse = (event, index) => {
    const newFootercourses = [...footercourses]; // Kursları kopyala
    newFootercourses[index] = {
      ...newFootercourses[index],
      label: event.target.value,
    }; // Belirtilen kursun etiket değerini güncelle
    setFootercourses(newFootercourses); // Güncellenmiş kursları ayarla
  };

  // Kaynak bilgileri için input değişiklik işlevi
  const handleInputChangeFooterResources = (event, index) => {
    const newResources = [...resources]; // Kaynakları kopyala
    newResources[index] = { ...newResources[index], label: event.target.value }; // Belirtilen kaynağın etiket değerini güncelle
    setResources(newResources); // Güncellenmiş kaynakları ayarla
  };

  // İletişim bilgileri için input değişiklik işlevi
  const handleInputChangeFooterContact = (event, key) => {
    const newContact = { ...contact }; // İletişim bilgilerini kopyala
    newContact[0][key] = event.target.value; // Belirtilen anahtarın değerini güncelle
    setContact(newContact); // Güncellenmiş iletişim bilgilerini ayarla
  };

  const handleCourseInputChange = (event, index, field) => {
    if (field === "icon") {
      const file = event.target.files[0]; // Kullanıcının seçtiği dosya
      const imageUrl = URL.createObjectURL(file); // Resmin URL'sini oluştur
      const newCourses = [...courses];
      newCourses[index] = {
        ...newCourses[index],
        [field]: imageUrl, // Resmin URL'sini sakla
      };
      setCourses(newCourses); // Yeni durum değerini ayarla
    } else {
      const { value } = event.target;
      const newCourses = [...courses];
      newCourses[index] = {
        ...newCourses[index],
        [field]: value,
      };
      setCourses(newCourses);
    }
  }; //KURS ALANI KURS BİLGİLERİNİ DEĞİŞİTREN FONKSİYON

  const handleFeaturesInputChange = (event, index, field) => {
    if (field === "image") {
      const file = event.target.files[0]; // Kullanıcının seçtiği dosya
      const imageUrl = URL.createObjectURL(file); // Resmin URL'sini oluştur
      const newFeature = [...featured];
      newFeature[index] = {
        ...newFeature[index],
        [field]: imageUrl, // Resmin URL'sini sakla
      };
      setFeatured(newFeature); // Yeni durum değerini ayarla
    } else {
      const { value } = event.target;
      const newFeature = [...featured];
      newFeature[index] = {
        ...newFeature[index],
        [field]: value,
      };
      setFeatured(newFeature);
    }
  }; //KURS ALANI KURS BİLGİLERİNİ DEĞİŞİTREN FONKSİYON
  const handleFeaturesCategoryInputChange = (event, index, field) => {
    const { value } = event.target;
    const newFeatureCategory = [...categories];
    newFeatureCategory[index] = {
      ...newFeatureCategory[index],
      [field]: value,
    };
    setCategories(newFeatureCategory);
  }; //KURS ALANI KURS BİLGİLERİNİ DEĞİŞİTREN FONKSİYON

  const closeAddCourseModal = () => {
    setAddCourse(false);
  };
  const closeAddFeatureModal = () => {
    setAddFeature(false);
  };
  const closeAddFeatureCategoryModal = () => {
    setAddFeatureCategory(false);
  };
  const closeAddNavbarModal = () => {
    setAddNavbar(false);
  };
  const updateInfo = async (updatedInfo) => {
    // Güncellenmiş bilgileri sunucuya gönderme işlemi
    const response = await postAPI("/home/updateInfo", updatedInfo);

    // Başarılı güncelleme mesajı
    Swal.fire({
      title: "Başarılı",
      text: "Bilgiler başarılı bir şekilde güncellendi.",
      icon: "success",
    });

    closeChildInputModal();
  };

  const updateNavbar = async (updatedMenu) => {
    const response = await postAPI("/home/updateMenu", updatedMenu);
    Swal.fire({
      title: "Başarılı",
      text: "Menü verileri başarılı bir şekilde güncellendi.",
      icon: "success",
    });
    closeChildInputModal();
  };
  const updateFooter = async (footercourses, resources, contact) => {
    const response = await postAPI("/home/updateFooterCourses", footercourses);
    const response1 = await postAPI("/home/updateFooterResources", resources);
    const response2 = await postAPI("/home/updateFooterContact", contact);

    Swal.fire({
      title: "Başarılı",
      text: "Bilgiler başarılı bir şekilde güncellendi.",
      icon: "success",
    });
    closeChildInputModal();
  };
  const updateCourse = async (updatedCourse) => {
    const response = await postAPI("/home/updateCourse", updatedCourse);
    Swal.fire({
      title: "Başarılı",
      text: "Kurs verileri başarılı bir şekilde güncellendi.",
      icon: "success",
    });
    closeChildInputModal();
  };
  const updateFeature = async (updatedFeature) => {
    const response = await postAPI("/home/updateFeature", updatedFeature);
    Swal.fire({
      title: "Başarılı",
      text: "Ders verileri başarılı bir şekilde güncellendi.",
      icon: "success",
    });
    closeChildInputModal();
  };
  const handleSubmitBackgroundColor = async (event, pageId) => {
    event.preventDefault();
    const data = {
      pageId: pageId,
      bgColor: selectedColor,
    };
    const response = await postAPI("/home/updateBgColor", data);
    Swal.fire({
      title: "Başarılı",
      text: "Arka plan rengi başarılı bir şekilde güncellendi.",
      icon: "success",
    });
  }; //HER KISIM İÇİN PAGEID ALIP ONA GÖRE DB YE GÖNDERECEĞİZ ARKA PLAN RENGİNİ

  const handleSubmitTextColor = async (event, pageId) => {
    event.preventDefault();
    const data = {
      pageId: pageId,
      TextColor: selectedTextColor,
    };
    const response = await postAPI("/home/updateTextColor", data);
    Swal.fire({
      title: "Başarılı",
      text: "Yazı rengi başarılı bir şekilde güncellendi.",
      icon: "success",
    });
  }; //HER KISIM İÇİN PAGEID ALIP ONA GÖRE DB YE GÖNDERECEĞİZ ARKA PLAN RENGİNİ
  const handleSubmitNavbar = async (event) => {
    event.preventDefault();
    const response = await postAPI("/home/addMenu", menus);
    onClose();
  }; //NAVBAR YAPTIĞIMIZ EKLEME DEĞİŞTİRME İŞLEMLERNİ KAYDEDEN FONKSİYON
  const handleSubmitCourses = async (event) => {
    event.preventDefault();
    const response = await postAPI("/home/addCourse", courses);
    onClose();
  }; //KURSLARDA YAPTIĞIMIZ EKLEME DEĞİŞTİRME İŞLEMLERNİ KAYDEDEN FONKSİYON
  const handleSubmitFeature = async (event) => {
    event.preventDefault();
    onClose();
  }; //DERSELERE YAPTIĞIMIZ EKLEME DEĞİŞTİRME İŞLEMLERNİ KAYDEDEN FONKSİYON
  const handleSubmitFeatureCategory = async (event) => {
    event.preventDefault();
    const response = await postAPI("/home/addCategory", categories);
    onClose();
  }; //DERSELERE YAPTIĞIMIZ EKLEME DEĞİŞTİRME İŞLEMLERNİ KAYDEDEN FONKSİYON

  const [updatedInformation, setUpdatedInformation] = useState();
  const updateInformations = async (updatedInformation) => {
    try {
      const response = await postAPI(
        "/home/updateInformations",
        updatedInformation
      );
      Swal.fire({
        title: "Başarılı",
        text: "Yazılar başarılı bir şekilde eklendi.",
        icon: "success",
      });
      onClose();
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleInformationsTextInputChange = (event, field, index) => {
    const { value } = event.target;
    const updatedInformations = [...informations];
    const updatedInformation = {
      ...updatedInformations[index],
      [field]: value,
    };
    updatedInformations[index] = updatedInformation;
    setInformations(updatedInformations);
    setUpdatedInformation(updatedInformation); // Güncellenen veriyi gönder
  };
  const handleImageChangeLogoBanner = (event, index) => {
    const imageFile = event.target.files[0];
    setSelectedImageIndex(index);
    uploadImageToS3LogoBanner(imageFile, index);
  }; //LOGOBANNER RESİM DEĞİŞTİRME
  const uploadImageToS3LogoBanner = async (imageFile, selectedImageIndex) => {
    const S3_BUCKET = "caliskanari";
    const REGION = "us-east-1";
    AWS.config.update({
      accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY,
      secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
    });
    console.log(imageFile);
    const params = {
      Bucket: S3_BUCKET,
      Key: `images/${imageFile.name}`,
      Body: imageFile,
    };

    const s3 = new AWS.S3({
      params: { Bucket: S3_BUCKET },
      region: REGION,
    });

    var upload = s3
      .putObject(params)
      .on("httpUploadProgress", (evt) => {
        console.log(
          "Uploading " + parseInt((evt.loaded * 100) / evt.total) + "%"
        );
      })
      .promise();

    await upload.then((err, data) => {
      setLogoBanner((prevLogobanner) => {
        const newLogobanner = [...prevLogobanner];
        newLogobanner[
          selectedImageIndex
        ].logo = `https://caliskanari.s3.amazonaws.com/images/${imageFile.name}`;
        return newLogobanner;
      });
      console.log(err);
    });
  };
  const handleSubmitImageLogoBanner = async (event) => {
    event.preventDefault();
    console.log(selectedImage);
    console.log(selectedImageIndex);

    if (selectedImageIndex !== null) {
      uploadImageToS3LogoBanner(selectedImage);
      setSelectedImage(null);
      const response = await postAPI(
        "/home/updateLogoBanner",
        logobanner[selectedImageIndex]
      );
      console.log(response);
      Swal.fire({
        title: "Başarılı",
        text: "Yazılar başarılı bir şekilde eklendi.",
        icon: "success",
      });
      setSelectedImageIndex(null);
    }
  }; //LOGOBANNER RESİM DEĞİŞTİRME

  const handleImageChangeStudents = (event) => {
    const imageFile = event.target.files[0];
    setSelectedImageStudents(imageFile);
    setImage((prevImage) => ({
      ...prevImage,
      studentPhoto: URL.createObjectURL(imageFile),
    }));
  }; //STUDENTS RESİM DEĞİŞTİRME

  const handleSubmitStudents = (event) => {
    event.preventDefault();
  }; //STUDENTS RESİM DEĞİŞTİRME
  const handleImageChangeVideo = (event) => {
    const imageFile = event.target.files[0];
    setSelectedImageVideo(imageFile);
    setImage((prevImage) => ({
      ...prevImage,
      videoCover: URL.createObjectURL(imageFile),
    }));
  }; //VİDEO RESİM DEĞİŞTİRME

  const handleSubmitVideo = (event) => {
    event.preventDefault();
  }; //VİDEO RESİM DEĞİŞTİRME
  const handleImageChangeMain = (event) => {
    const imageFile = event.target.files[0];
    setSelectedImageMain(imageFile);
    setImage((prevImage) => ({
      ...prevImage,
      mainSection: URL.createObjectURL(imageFile),
    }));
  }; //MAİN RESİM DEĞİŞTİRME

  const handleSubmitMain = async (event) => {
    event.preventDefault();
    const response = await postAPI("/home/addImage", Image);
  }; //MAİN RESİM DEĞİŞTİRME

  const handleImageChangeInformations = (event, index) => {
    const imageFile = event.target.files[0];
    setSelectedImagesInformations((prevImages) => {
      const updatedImages = [...prevImages];
      updatedImages[index] = URL.createObjectURL(imageFile);
      return updatedImages;
    });

    setInformations((prevInformations) => {
      const updatedInformations = [...prevInformations];
      updatedInformations[index] = {
        ...updatedInformations[index],
        icon: URL.createObjectURL(imageFile),
      };
      return updatedInformations;
    });
  };
  const handleSubmitInformations = async (event, index) => {
    event.preventDefault();

    const newIconURL = selectedImagesInformations[index];

    setInformations((prevInformations) => {
      const updatedInformations = [...prevInformations];
      updatedInformations[index] = {
        ...updatedInformations[index],
        icon: newIconURL,
      };
      return updatedInformations;
    });
    const response = await postAPI("/home/addInformations", informations);
  };

  const openChildInputModal = (index) => {
    setSelectedBigInputIndex(index);
    setChildInputModalOpen(true);
  };

  const closeChildInputModal = () => {
    setSelectedBigInputIndex(null);
    setChildInputModalOpen(false);
  };

  const [underMenuCount, setUnderMenuCount] = useState(1);
  const modalClass = isOpen
    ? "fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-gray-600 bg-opacity-50"
    : "hidden";

  return (
    <div className={modalClass}>
      <div className="absolute w-full h-full flex items-center justify-center">
        <div
          className={`relative mx-auto px-auto bg-white rounded-2xl animate__animated animate__fadeInDown w-80 lg:w-fit lg:max-w-[800px] `}
        >
          <div>
            <div className="flex flex-col px-3 mx-auto rounded-lg bg-bgWhite">
              <div className="flex flex-col md:flex-row justify-evenly items-center gap-x-2 lg:gap-x-5 mt-3 text-xs lg:text-sm ml-auto">
                <div className="flex items-center justify-center relative w-full ml-auto">
                  <div
                    className="w-5 h-5 md:w-10 md:h-10 rounded-md p-4 cursor-pointer transition-all duration-700  bg-gray-400/50 hover:bg-red-500 group  right-2 bottom-1"
                    onClick={onClose}
                  >
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 512 512"
                      className="text-txtRed transition-all duration-700 rotate-180 flex absolute group-hover:opacity-0 group-hover:rotate-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                      height="30"
                      width="30"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M289.94 256l95-95A24 24 0 00351 127l-95 95-95-95a24 24 0 00-34 34l95 95-95 95a24 24 0 1034 34l95-95 95 95a24 24 0 0034-34z"></path>
                    </svg>
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 24 24"
                      className="text-white rotate-0 transition-all duration-700 opacity-0 group-hover:block group-hover:rotate-180 group-hover:opacity-100 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                      height="30"
                      width="30"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M4.5 12.75a.75.75 0 0 1 .75-.75h13.5a.75.75 0 0 1 0 1.5H5.25a.75.75 0 0 1-.75-.75Z"></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div className="content">
              {modalContent === "backgroundColor" && (
                <div className="flex flex-col items-center justify-center p-5">
                  <h1 className="text-gray-700 font-semibold">
                    {pageId} Sayfası Arka Plan Renk Seçici
                  </h1>
                  <form
                    onSubmit={(event) =>
                      handleSubmitBackgroundColor(event, pageId)
                    }
                    className="flex flex-col items-center justify-center"
                  >
                    <SketchPicker
                      className="my-3 w-full !p-5"
                      color={selectedColor}
                      onChange={(color) => handleColorChange(color)}
                    />
                    <h1 className="text-gray-500 text-center font-semibold m-3 mb-0">
                      Seçtiğiniz renk kodu: {selectedColor}
                    </h1>
                    <button
                      type="submit"
                      className="text-gray-600 bg-gray-100 p-3 rounded-xl font-semibold m-5"
                    >
                      Kaydet
                    </button>
                  </form>
                </div>
              )}
              {modalContent === "renk" && (
                <div className="flex flex-col items-center justify-center p-5">
                  <h1 className="text-gray-700 font-semibold">
                    {pageId} Sayfası Yazı Renkleri
                  </h1>
                  <form
                    onSubmit={(event) => handleSubmitTextColor(event, pageId)}
                    className="flex flex-col items-center justify-center"
                  >
                    <SketchPicker
                      className="my-3 w-full !p-5"
                      color={selectedTextColor}
                      onChange={(color) => handleTextColorChange(color)}
                    />

                    <h1 className="text-gray-500 text-center font-semibold m-3 mb-0">
                      Seçtiğiniz renk kodu: {selectedTextColor}
                    </h1>
                    <button
                      type="submit"
                      className="text-gray-600 bg-gray-100 p-3 rounded-xl font-semibold m-5"
                    >
                      Kaydet
                    </button>
                  </form>
                </div>
              )}
              {modalContent === "yazı" && pageId === "navbar" && (
                <div className="flex flex-col items-center justify-center">
                  <button
                    onClick={() => setAddNavbar(true)}
                    className="text-gray-600 bg-gray-100 py-3 px-8 rounded-xl font-semibold mx-5"
                  >
                    Menü Ekle
                  </button>
                  <form
                    onSubmit={handleSubmitNavbar}
                    className="flex flex-row flex-wrap items-center justify-center max-[768px]:max-h-[500px] overflow-scroll"
                  >
                    {menus.map((menu, menuIndex) => (
                      <div key={menuIndex} className="inputArea">
                        <div className="bigInput max-[768px]:flex">
                          <input
                            onChange={(event) =>
                              handleInputChange(event, menuIndex)
                            }
                            placeholder={menu.name}
                            type="text"
                            className="bg-gray-100 p-3 text-gray-600 font-semibold m-3 rounded-xl w-36 lg:w-auto"
                          />
                          <button
                            type="button"
                            onClick={() => openChildInputModal(menuIndex)}
                            className="text-gray-600 bg-gray-100 py-3 px-5 rounded-xl font-semibold m-5 mr-2 ml-0"
                          >
                            <i class="fa-solid fa-angle-right"></i>
                          </button>
                          <button
                            type="button"
                            onClick={() => deleteNavbarMenu(menu)}
                            className="text-gray-600 bg-gray-100 py-3 px-5 rounded-xl font-semibold m-5 mr-0 ml-0"
                          >
                            <i class="fa-solid fa-trash"></i>
                          </button>
                        </div>
                      </div>
                    ))}
                    <button
                      type="submit"
                      className="text-gray-600 bg-gray-100 py-3 px-24 rounded-xl font-semibold m-5"
                    >
                      Kaydet
                    </button>
                  </form>
                </div>
              )}
              {modalContent === "buton" && pageId === "features" && (
                <div className="flex flex-col items-center justify-center ">
                  <h1 className="text-gray-700 font-semibold">Dersler</h1>
                  <button
                    onClick={() => setAddFeature(true)}
                    className="text-gray-600 bg-gray-100 py-3 px-8 rounded-xl font-semibold m-5 mb-0"
                  >
                    Ders Ekle
                  </button>
                  <form
                    onSubmit={handleSubmitFeature}
                    className="flex flex-row flex-wrap items-center justify-center max-h-[500px] overflow-scroll"
                  >
                    {featured.map((feature, index) => (
                      <div key={index} className="inputArea">
                        <div className="bigInput flex">
                          <input
                            onChange={(event) =>
                              handleFeaturesInputChange(event, index, "title")
                            }
                            placeholder="Ders Adı"
                            type="text"
                            value={feature.title}
                            className="bg-gray-100 p-3 text-gray-600 font-semibold m-3 rounded-xl  w-36 lg:w-auto"
                          />
                          <button
                            type="button"
                            onClick={() => openChildInputModal(index)}
                            className="text-gray-600 bg-gray-100 py-3 px-5 rounded-xl font-semibold m-5 ml-0"
                          >
                            <i class="fa-solid fa-angle-right"></i>
                          </button>
                          <button
                            type="button"
                            onClick={() => deleteFeature(feature)}
                            className="text-gray-600 bg-gray-100 py-3 px-5 rounded-xl font-semibold m-5 mr-0 ml-0"
                          >
                            <i class="fa-solid fa-trash"></i>
                          </button>
                        </div>
                      </div>
                    ))}
                    <button
                      type="submit"
                      className="text-gray-600 bg-gray-100 py-3 px-8 rounded-xl font-semibold m-5"
                    >
                      Kaydet
                    </button>
                  </form>
                </div>
              )}
              {modalContent === "butonCategory" && pageId === "features" && (
                <div className="flex flex-col items-center justify-center ">
                  <h1 className="text-gray-700 font-semibold">Kategoriler</h1>
                  <button
                    onClick={() => setAddFeatureCategory(true)}
                    className="text-gray-600 bg-gray-100 py-3 px-8 rounded-xl font-semibold m-5 mb-0"
                  >
                    Kategori Ekle
                  </button>
                  <form
                    onSubmit={handleSubmitFeatureCategory}
                    className="flex flex-row flex-wrap items-center justify-center max-h-[500px] overflow-scroll"
                  >
                    {categories.map((category, index) => (
                      <div key={index} className="inputArea">
                        <div className="bigInput flex">
                          <input
                            onChange={(event) =>
                              handleFeaturesCategoryInputChange(
                                event,
                                index,
                                "name"
                              )
                            }
                            placeholder="İsim"
                            type="text"
                            value={category.name}
                            className="bg-gray-100 p-3 text-gray-600 font-semibold m-3 rounded-xl  w-36 lg:w-auto"
                          />

                          <button
                            type="button"
                            onClick={() => deleteFeatureCategory(category)}
                            className="text-gray-600 bg-gray-100 py-3 px-5 rounded-xl font-semibold m-5 mr-0 ml-0"
                          >
                            <i class="fa-solid fa-trash"></i>
                          </button>
                        </div>
                      </div>
                    ))}
                    <button
                      type="submit"
                      className="text-gray-600 bg-gray-100 py-3 px-8 rounded-xl font-semibold m-5"
                    >
                      Kaydet
                    </button>
                  </form>
                </div>
              )}
              {modalContent === "buton" && pageId === "courses" && (
                <div className="flex flex-col items-center justify-center ">
                  <h1 className="text-gray-700 font-semibold">Kurslar</h1>
                  <button
                    onClick={() => setAddCourse(true)}
                    className="text-gray-600 bg-gray-100 py-3 px-8 rounded-xl font-semibold m-5 mb-0"
                  >
                    Kurs Ekle
                  </button>
                  <form
                    onSubmit={handleSubmitCourses}
                    className="flex flex-row flex-wrap items-center justify-center max-h-[500px] overflow-scroll"
                  >
                    {courses.map((course, index) => (
                      <div key={index} className="inputArea">
                        <div className="bigInput flex">
                          <input
                            onChange={(event) =>
                              handleCourseInputChange(event, index, "title")
                            }
                            placeholder="Kurs Adı"
                            type="text"
                            value={course.title}
                            className="bg-gray-100 p-3 text-gray-600 font-semibold m-3 rounded-xl w-36 lg:w-auto"
                          />
                          <button
                            type="button"
                            onClick={() => openChildInputModal(index)}
                            className="text-gray-600 bg-gray-100 py-3 px-5 rounded-xl font-semibold m-5 ml-0"
                          >
                            <i class="fa-solid fa-angle-right"></i>
                          </button>
                          <button
                            type="button"
                            onClick={() => deleteCourse(course)}
                            className="text-gray-600 bg-gray-100 py-3 px-5 rounded-xl font-semibold m-5 mr-0 ml-0"
                          >
                            <i class="fa-solid fa-trash"></i>
                          </button>
                        </div>
                      </div>
                    ))}
                    <button
                      type="submit"
                      className="text-gray-600 bg-gray-100 py-3 px-8 rounded-xl font-semibold m-5"
                    >
                      Kaydet
                    </button>
                  </form>
                </div>
              )}
              {modalContent === "yazı" && pageId === "main" && (
                <div className="flex flex-col items-center justify-center lg:p-2">
                  <textarea
                    onChange={(event) => handleInputChangeInfo(event, "title")}
                    placeholder={info[0].title}
                    type="text"
                    className="bg-gray-100 p-3 text-gray-600 font-semibold m-3 rounded-xl lg:w-96 h-36"
                  />
                  <textarea
                    onChange={(event) => handleInputChangeInfo(event, "desc1")}
                    placeholder={info[0].desc1}
                    type="text"
                    className="bg-gray-100 p-3 text-gray-600 font-semibold m-3 rounded-xl lg:w-96 h-36"
                  />
                  <textarea
                    onChange={(event) => handleInputChangeInfo(event, "desc2")}
                    placeholder={info[0].desc2}
                    type="text"
                    className="bg-gray-100 p-3 text-gray-600 font-semibold m-3 rounded-xl lg:w-96 h-36"
                  />
                  <button
                    onClick={() => updateInfo(info)}
                    className="text-gray-600 bg-gray-100 py-3 px-8 rounded-xl font-semibold m-5"
                  >
                    Kaydet
                  </button>
                </div>
              )}
              {modalContent === "yazı" && pageId === "courses" && (
                <div className="flex flex-col items-center justify-center">
                  <div className="inputArea flex items-center justify-center lg:flex-row flex-col">
                    <textarea
                      onChange={(event) =>
                        handleInputChangeInfo(event, "classCoursesTitle1")
                      }
                      placeholder={info[0].classCoursesTitle1}
                      type="text"
                      className="bg-gray-100 p-3 text-gray-600 font-semibold m-3 rounded-xl w-48 lg:h-48 h-24"
                    />
                    <textarea
                      onChange={(event) =>
                        handleInputChangeInfo(event, "classCoursesTitle2")
                      }
                      placeholder={info[0].classCoursesTitle2}
                      type="text"
                      className="bg-gray-100 p-3 text-gray-600 font-semibold m-3 rounded-xl w-48 lg:h-48 h-24"
                    />
                  </div>
                  <div className="flex items-center justify-center lg:flex-row flex-col">
                    <textarea
                      onChange={(event) =>
                        handleInputChangeInfo(event, "classCoursesDesc1")
                      }
                      placeholder={info[0].classCoursesDesc1}
                      type="text"
                      className="bg-gray-100 p-3 text-gray-600 font-semibold m-3 rounded-xl w-48  lg:h-48 h-24"
                    />
                    <textarea
                      onChange={(event) =>
                        handleInputChangeInfo(event, "classCoursesDesc2")
                      }
                      placeholder={info[0].classCoursesDesc2}
                      type="text"
                      className="bg-gray-100 p-3 text-gray-600 font-semibold m-3 rounded-xl w-48 lg:h-48 h-24"
                    />
                  </div>
                  <button
                    onClick={() => updateInfo(info)}
                    className="text-gray-600 bg-gray-100 py-3 px-8 rounded-xl font-semibold m-5"
                  >
                    Kaydet
                  </button>
                </div>
              )}
              {modalContent === "yazı" && pageId === "students" && (
                <div className="flex flex-col items-center justify-center">
                  <textarea
                    onChange={(event) =>
                      handleInputChangeInfo(event, "learnersStudentsTitle1")
                    }
                    placeholder={info[0].learnersStudentsTitle1}
                    type="text"
                    className="bg-gray-100 p-3 text-gray-600 font-semibold m-3 rounded-xl w-[90%] lg:w-96 lg:h-36 h-24"
                  />
                  <textarea
                    onChange={(event) =>
                      handleInputChangeInfo(event, "learnersStudentsTitle2")
                    }
                    placeholder={info[0].learnersStudentsTitle2}
                    type="text"
                    className="bg-gray-100 p-3 text-gray-600 font-semibold m-3 rounded-xl w-[90%] lg:w-96 lg:h-36 h-24"
                  />
                  <textarea
                    onChange={(event) =>
                      handleInputChangeInfo(event, "learnersStudentsDesc")
                    }
                    placeholder={info[0].learnersStudentsDesc}
                    type="text"
                    className="bg-gray-100 p-3 text-gray-600 font-semibold m-3 rounded-xl w-[90%] lg:w-96 lg:h-36 h-24"
                  />

                  <button
                    onClick={() => updateInfo(info)}
                    className="text-gray-600 bg-gray-100 py-3 px-8 rounded-xl font-semibold m-5"
                  >
                    Kaydet
                  </button>
                </div>
              )}
              {modalContent === "yazı" && pageId === "features" && (
                <div className="flex flex-col items-center justify-center">
                  <div className="inputArea">
                    <input
                      onChange={(event) =>
                        handleInputChangeInfo(event, "featuredTitle1")
                      }
                      placeholder={info[0].featuredTitle1}
                      type="text"
                      className="bg-gray-100 p-3 text-gray-600 font-semibold m-3 rounded-xl"
                    />
                    <input
                      onChange={(event) =>
                        handleInputChangeInfo(event, "featuredTitle2")
                      }
                      placeholder={info[0].featuredTitle2}
                      type="text"
                      className="bg-gray-100 p-3 text-gray-600 font-semibold m-3 rounded-xl"
                    />
                  </div>

                  <button
                    onClick={() => updateInfo(info)}
                    className="text-gray-600 bg-gray-100 py-3 px-8 rounded-xl font-semibold m-5"
                  >
                    Kaydet
                  </button>
                </div>
              )}
              {modalContent === "yazı" && pageId === "video" && (
                <div className="flex flex-col items-center justify-center">
                  <input
                    onChange={(event) => handleInputChangeInfo(event, "video")}
                    placeholder={info[0].video}
                    type="text"
                    className="bg-gray-100 p-3 text-gray-600 font-semibold m-3 rounded-xl"
                  />
                  <input
                    onChange={(event) =>
                      handleInputChangeInfo(event, "videoTitle1")
                    }
                    placeholder={info[0].videoTitle1}
                    type="text"
                    className="bg-gray-100 p-3 text-gray-600 font-semibold m-3 rounded-xl"
                  />
                  <div className="inputArea lg:flex">
                    <div className="flex flex-col items-center justify-center">
                      <input
                        onChange={(event) =>
                          handleInputChangeInfo(event, "videoTitle2")
                        }
                        placeholder={info[0].videoTitle2}
                        type="text"
                        className="bg-gray-100 p-3 text-gray-600 font-semibold m-3 rounded-xl lg:w-44"
                      />
                      <textarea
                        onChange={(event) =>
                          handleInputChangeInfo(event, "videoDesc1")
                        }
                        placeholder={info[0].videoDesc1}
                        type="text"
                        className="bg-gray-100 p-3 text-gray-600 font-semibold m-3 rounded-xl w-[92%] lg:h-48 h-24 lg:w-44"
                      />
                    </div>
                    <div className="flex flex-col items-center justify-center">
                      <input
                        onChange={(event) =>
                          handleInputChangeInfo(event, "videoTitle3")
                        }
                        placeholder={info[0].videoTitle3}
                        type="text"
                        className="bg-gray-100 p-3 text-gray-600 font-semibold m-3 rounded-xl lg:w-44"
                      />
                      <textarea
                        onChange={(event) =>
                          handleInputChangeInfo(event, "videoDesc2")
                        }
                        placeholder={info[0].videoDesc2}
                        type="text"
                        className="bg-gray-100 p-3 text-gray-600 font-semibold m-3 rounded-xl w-[92%]  lg:h-48 h-24 lg:w-44"
                      />
                    </div>
                    <div className="flex flex-col items-center justify-center">
                      <input
                        onChange={(event) =>
                          handleInputChangeInfo(event, "videoTitle4")
                        }
                        placeholder={info[0].videoTitle4}
                        type="text"
                        className="bg-gray-100 p-3 text-gray-600 font-semibold m-3 rounded-xl lg:w-44"
                      />

                      <textarea
                        onChange={(event) =>
                          handleInputChangeInfo(event, "videoDesc3")
                        }
                        placeholder={info[0].videoDesc3}
                        type="text"
                        className="bg-gray-100 p-3 text-gray-600 font-semibold m-3 rounded-xl w-[92%] lg:h-48 h-24 lg:w-44"
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => updateInfo(info)}
                    className="text-gray-600 bg-gray-100 py-3 px-8 rounded-xl font-semibold m-5"
                  >
                    Kaydet
                  </button>
                </div>
              )}
              {modalContent === "yazı" && pageId === "logoBanner" && (
                <div className="flex flex-col items-center justify-center">
                  <div className="inputArea flex flex-wrap items-center justify-center">
                    <input
                      onChange={(event) =>
                        handleInputChangeInfo(event, "clientTitle1")
                      }
                      placeholder={info[0].clientTitle1}
                      type="text"
                      className="bg-gray-100 p-3 text-gray-600 font-semibold m-3 rounded-xl"
                    />

                    <input
                      onChange={(event) =>
                        handleInputChangeInfo(event, "clientTitle2")
                      }
                      placeholder={info[0].clientTitle2}
                      type="text"
                      className="bg-gray-100 p-3 text-gray-600 font-semibold m-3 rounded-xl"
                    />
                    <textarea
                      onChange={(event) =>
                        handleInputChangeInfo(event, "clientDesc")
                      }
                      placeholder={info[0].clientDesc}
                      type="text"
                      className="bg-gray-100 p-3 text-gray-600 font-semibold m-3 rounded-xl w-[70%] h-48"
                    />
                  </div>

                  <button
                    onClick={() => updateInfo(info)}
                    className="text-gray-600 bg-gray-100 py-3 px-8 rounded-xl font-semibold m-5"
                  >
                    Kaydet
                  </button>
                </div>
              )}
              {modalContent === "yazı" && pageId === "banner" && (
                <div className="flex flex-col items-center justify-center">
                  <div className="inputArea">
                    <textarea
                      onChange={(event) =>
                        handleInputChangeInfo(event, "bannerTitle1")
                      }
                      placeholder={info[0].bannerTitle1}
                      type="text"
                      className="bg-gray-100 p-3 text-gray-600 font-semibold m-3 rounded-xl w-[92%] lg:h-48 h-24 lg:w-44"
                    />

                    <textarea
                      onChange={(event) =>
                        handleInputChangeInfo(event, "bannerTitle2")
                      }
                      placeholder={info[0].bannerTitle2}
                      type="text"
                      className="bg-gray-100 p-3 text-gray-600 font-semibold m-3 rounded-xl w-[92%] lg:h-48 h-24 lg:w-44"
                    />
                  </div>

                  <button
                    onClick={() => updateInfo(info)}
                    className="text-gray-600 bg-gray-100 py-3 px-8 rounded-xl font-semibold m-5"
                  >
                    Kaydet
                  </button>
                </div>
              )}
              {modalContent === "yazı" && pageId === "informations" && (
                <div className="flex flex-col items-center justify-center">
                  <div className="inputArea lg:flex">
                    {informations.map((information, index) => (
                      <div key={index} className="inputArea flex">
                        <div className="bigInput flex items-center justify-center flex-wrap flex-col ">
                          <input
                            onChange={(event) =>
                              handleInformationsTextInputChange(
                                event,
                                "title",
                                index
                              )
                            }
                            type="text"
                            placeholder={information.title}
                            className="bg-gray-100 p-3 text-gray-600 font-semibold m-3 rounded-xl w-48"
                          />
                          <textarea
                            onChange={(event) =>
                              handleInformationsTextInputChange(
                                event,
                                "description",
                                index
                              )
                            }
                            type="text"
                            placeholder={information.description}
                            className="bg-gray-100 p-3 text-gray-600 font-semibold m-3 rounded-xl w-48 lg:h-48 h-24"
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => updateInformations(updatedInformation)}
                    className="text-gray-600 bg-gray-100 py-3 px-8 rounded-xl font-semibold m-5"
                  >
                    Kaydet
                  </button>
                </div>
              )}
              {modalContent === "yazı" && pageId === "footer" && (
                <div className="flex flex-col items-center justify-center ">
                  <h1 className="text-left text-sm text-gray-600 font-semibold m-5 mb-0">
                    İletişim Bilgileri
                  </h1>
                  <div className="inputArea flex items-center justify-center flex-wrap">
                    <input
                      onChange={(event) =>
                        handleInputChangeFooterContact(event, "phone")
                      }
                      placeholder={contact[0].phone}
                      type="text"
                      className="bg-gray-100 p-3 text-gray-600 font-semibold m-3 rounded-xl"
                    />

                    <input
                      onChange={(event) =>
                        handleInputChangeFooterContact(event, "mapUrl")
                      }
                      placeholder={contact[0].mapUrl}
                      type="text"
                      className="bg-gray-100 p-3 text-gray-600 font-semibold m-3 rounded-xl"
                    />
                    <input
                      onChange={(event) =>
                        handleInputChangeFooterContact(event, "address")
                      }
                      placeholder={contact[0].address}
                      type="text"
                      className="bg-gray-100 p-3 text-gray-600 font-semibold m-3 rounded-xl"
                    />
                  </div>
                  <h1 className="text-left text-sm text-gray-600 font-semibold m-5 mb-0">
                    Kaynak Bilgileri
                  </h1>
                  <div className="inputArea flex items-center justify-center flex-wrap">
                    {resources.map((resource, index) => (
                      <div key={index} className="inputArea">
                        <div className="bigInput flex items-center justify-center flex-row flex-wrap">
                          <input
                            onChange={(event) =>
                              handleInputChangeFooterResources(event, index)
                            }
                            type="text"
                            placeholder={resource.label}
                            className="bg-gray-100 p-3 text-gray-600 font-semibold m-3 rounded-xl"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  <h1 className="text-left text-sm text-gray-600 font-semibold m-5 mb-0">
                    Kurs Bilgileri
                  </h1>
                  <div className="inputArea flex items-center justify-center flex-wrap">
                    {footercourses.map((footercourse, index) => (
                      <div key={index} className="inputArea">
                        <div className="bigInput flex items-center justify-center flex-row flex-wrap">
                          <input
                            onChange={(event) =>
                              handleInputChangeFooterCourse(event, index)
                            }
                            type="text"
                            placeholder={footercourse.label}
                            className="bg-gray-100 p-3 text-gray-600 font-semibold m-3 rounded-xl"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() =>
                      updateFooter(footercourses, resources, contact)
                    }
                    className="text-gray-600 bg-gray-100 py-3 px-8 rounded-xl font-semibold m-5"
                  >
                    Kaydet
                  </button>
                </div>
              )}
              {modalContent === "resim" && pageId === "logoBanner" && (
                <div className="flex flex-row flex-wrap items-center justify-center max-h-[600px] overflow-scroll">
                  <h1 className="text-gray-700 font-semibold">
                    {pageId} Sayfası Resim Düzenleme
                  </h1>
                  {logobanner.map((item, index) => (
                    <div
                      key={index}
                      className="flex flex-col lg:flex-row items-center justify-center"
                    >
                      <img
                        src={item.logo}
                        height={100}
                        width={100}
                        alt={`Logo ${index + 1}`}
                      />
                      <form
                        onSubmit={handleSubmitImageLogoBanner}
                        className="flex flex-col lg:flex-row items-center justify-center"
                      >
                        <label htmlFor={`image-${index}`}>Resim Seçin:</label>
                        <input
                          type="file"
                          className="bg-gray-200 text-gray-600 font-semibold rounded-xl w-60"
                          id={`image-${index}`}
                          name={`image-${index}`}
                          onChange={(event) =>
                            handleImageChangeLogoBanner(event, index)
                          }
                        />
                        {selectedImageIndex === index && selectedImage && (
                          <img
                            src={URL.createObjectURL(selectedImage)}
                            height={100}
                            width={100}
                            alt="Seçilen Resim"
                          />
                        )}
                        <button
                          type="submit"
                          className="text-gray-600 bg-gray-100 p-3 rounded-xl font-semibold m-5"
                        >
                          Kaydet
                        </button>
                      </form>
                    </div>
                  ))}
                </div>
              )}
              {modalContent === "resim" && pageId === "students" && (
                <div className="flex flex-col flex-wrap items-center justify-center p-5">
                  <h1 className="text-gray-700 font-semibold">
                    {pageId} Sayfası Resim Düzenleme
                  </h1>
                  <div className="flex flex-col items-center justify-center">
                    <img
                      src={image.studentPhoto}
                      height={100}
                      width={200}
                      alt={`Logo`}
                    />
                    <form
                      onSubmit={handleSubmitStudents}
                      className="flex flex-col items-center justify-center"
                    >
                      <label htmlFor={`students`}>Resim Seçin:</label>
                      <input
                        onChange={handleImageChangeStudents}
                        type="file"
                        className="bg-gray-200 text-gray-600 font-semibold rounded-xl w-60"
                        id={`students`}
                        name={`students`}
                      />
                      {selectedImageStudents && (
                        <img
                          src={selectedImageStudents}
                          height={100}
                          width={300}
                          alt="Yeni Seçilen Resim"
                        />
                      )}

                      <button
                        type="submit"
                        className="text-gray-600 bg-gray-100 p-3 rounded-xl font-semibold m-5"
                      >
                        Kaydet
                      </button>
                    </form>
                  </div>
                </div>
              )}
              {modalContent === "resim" && pageId === "video" && (
                <div className="flex flex-col flex-wrap items-center justify-center p-5">
                  <h1 className="text-gray-700 font-semibold">
                    {pageId} Sayfası Resim Düzenleme
                  </h1>
                  <div className="flex flex-col items-center justify-center">
                    <img
                      src={image.videoCover}
                      height={100}
                      width={200}
                      alt={`Logo`}
                    />
                    <form
                      onSubmit={handleSubmitVideo}
                      className="flex flex-col items-center justify-center"
                    >
                      <label htmlFor={`students`}>Resim Seçin:</label>
                      <input
                        onChange={handleImageChangeVideo}
                        type="file"
                        className="bg-gray-200 text-gray-600 font-semibold rounded-xl w-60"
                        id={`students`}
                        name={`students`}
                      />
                      {selectedImageVideo && (
                        <img
                          src={selectedImageVideo}
                          height={100}
                          width={300}
                          alt="Yeni Seçilen Resim"
                        />
                      )}

                      <button
                        type="submit"
                        className="text-gray-600 bg-gray-100 p-3 rounded-xl font-semibold m-5"
                      >
                        Kaydet
                      </button>
                    </form>
                  </div>
                </div>
              )}
              {modalContent === "resim" && pageId === "main" && (
                <div className="flex flex-col flex-wrap items-center justify-center p-5">
                  <h1 className="text-gray-700 font-semibold">
                    {pageId} Sayfası Resim Düzenleme
                  </h1>
                  <div className="flex flex-col items-center justify-center">
                    <img
                      src={image.mainSection}
                      height={100}
                      width={200}
                      alt={`Logo`}
                    />
                    <form
                      onSubmit={handleSubmitMain}
                      className="flex flex-col items-center justify-center"
                    >
                      <label htmlFor={`students`}>Resim Seçin:</label>
                      <input
                        onChange={handleImageChangeMain}
                        type="file"
                        className="bg-gray-200 text-gray-600 font-semibold rounded-xl w-60"
                        id={`students`}
                        name={`students`}
                      />
                      {selectedImageMain && (
                        <img
                          src={selectedImageMain}
                          height={100}
                          width={300}
                          alt="Yeni Seçilen Resim"
                        />
                      )}

                      <button
                        type="submit"
                        className="text-gray-600 bg-gray-100 p-3 rounded-xl font-semibold m-5"
                      >
                        Kaydet
                      </button>
                    </form>
                  </div>
                </div>
              )}
              {modalContent === "resim" && pageId === "informations" && (
                <div className="flex flex-col flex-wrap items-center justify-center p-5">
                  <h1 className="text-gray-700 font-semibold text-center">
                    {pageId} Sayfası Resim Düzenleme
                  </h1>
                  <div className="flex flex-col lg:flex-row items-center justify-center">
                    {informations.map((info, index) => (
                      <div
                        key={index}
                        className="flex flex-col items-center justify-center mt-5 mx-2"
                      >
                        <h2 className="text-gray-700 font-semibold">
                          {info.title}
                        </h2>
                        <div className="flex flex-col items-center justify-center">
                          <img
                            src={info.icon}
                            height={50}
                            width={50}
                            alt={`Icon ${index}`}
                          />
                          <form
                            onSubmit={(e) => handleSubmitInformations(e, index)}
                            className="flex flex-col items-center justify-center mt-3"
                          >
                            <label htmlFor={`image${index}`}>
                              Resim Seçin:
                            </label>
                            <input
                              onChange={(e) =>
                                handleImageChangeInformations(e, index)
                              }
                              type="file"
                              className="bg-gray-200 text-gray-600 font-semibold rounded-xl w-48"
                              id={`image${index}`}
                              name={`image${index}`}
                            />
                            {selectedImagesInformations[index] && (
                              <img
                                src={selectedImagesInformations[index]}
                                height={50}
                                width={50}
                                alt={`Yeni Seçilen Resim`}
                              />
                            )}
                            <button
                              type="submit"
                              className="text-gray-600 bg-gray-100 p-3 rounded-xl font-semibold mt-3"
                            >
                              Kaydet
                            </button>
                          </form>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {isChildInputModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-gray-600 bg-opacity-50">
          <div className="relative mx-auto px-auto bg-white rounded-2xl animate__animated animate__fadeInDown w-80 lg:w-auto lg:max-w-[400px] lg:min-w-[400px]">
            <div className="flex flex-col px-3 mx-auto rounded-lg bg-bgWhite">
              <div className="flex flex-col md:flex-row justify-evenly items-center gap-x-2 lg:gap-x-5 mt-3 text-xs lg:text-sm ml-auto">
                <div className="flex items-center justify-center relative w-full ml-auto">
                  <div
                    className="w-5 h-5 md:w-10 md:h-10 rounded-md p-4 cursor-pointer transition-all duration-700  bg-gray-400/50 hover:bg-red-500 group  right-2 bottom-1"
                    onClick={closeChildInputModal}
                  >
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 512 512"
                      className="text-txtRed transition-all duration-700 rotate-180 flex absolute group-hover:opacity-0 group-hover:rotate-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                      height="30"
                      width="30"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M289.94 256l95-95A24 24 0 00351 127l-95 95-95-95a24 24 0 00-34 34l95 95-95 95a24 24 0 1034 34l95-95 95 95a24 24 0 0034-34z"></path>
                    </svg>
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 24 24"
                      className="text-white rotate-0 transition-all duration-700 opacity-0 group-hover:block group-hover:rotate-180 group-hover:opacity-100 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                      height="30"
                      width="30"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M4.5 12.75a.75.75 0 0 1 .75-.75h13.5a.75.75 0 0 1 0 1.5H5.25a.75.75 0 0 1-.75-.75Z"></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div className="content flex flex-col items-center justify-center">
              {modalContent === "yazı" &&
                pageId === "navbar" &&
                selectedBigInputIndex !== null && (
                  <h1 className="text-gray-500 text-center font-semibold">
                    Alt Menüler
                  </h1>
                )}

              {modalContent === "yazı" &&
                pageId === "navbar" &&
                selectedBigInputIndex !== null && (
                  <>
                    <input
                      onChange={(event) =>
                        handleInputChange(event, selectedBigInputIndex)
                      }
                      placeholder={menus[selectedBigInputIndex].name}
                      type="text"
                      className="bg-gray-100 p-3 text-gray-600 font-semibold m-3 rounded-xl w-36 lg:w-auto"
                    />
                    {menus[selectedBigInputIndex].items.map(
                      (item, itemIndex) => (
                        <input
                          onChange={(event) =>
                            handleInputChange(
                              event,
                              selectedBigInputIndex,
                              itemIndex
                            )
                          }
                          key={itemIndex}
                          placeholder={item}
                          type="text"
                          className="bg-gray-100 p-3 text-gray-600 font-semibold m-3 rounded-xl"
                        />
                      )
                    )}
                    <button
                      onClick={() => updateNavbar(menus[selectedBigInputIndex])}
                      className="bg-gray-100 text-gray-600 px-5 py-3 rounded-xl font-semibold m-3 mt-0"
                    >
                      Kaydet
                    </button>
                  </>
                )}

              {modalContent === "buton" && pageId === "courses" && (
                <>
                  <div className="flex flex-col items-center justify-center">
                    <div className="inputArea flex flex-col items-center">
                      <div className="detailInputs flex flex-col items-center justify-center">
                        <input
                          onChange={(event) =>
                            handleCourseInputChange(
                              event,
                              selectedBigInputIndex,
                              "title"
                            )
                          }
                          type="text"
                          placeholder={courses[selectedBigInputIndex].title}
                          className="bg-gray-100 p-3 text-gray-600 font-semibold m-3 rounded-xl"
                        />
                        <input
                          onChange={(event) =>
                            handleCourseInputChange(
                              event,
                              selectedBigInputIndex,
                              "quantity"
                            )
                          }
                          type="number"
                          placeholder={
                            courses[selectedBigInputIndex].quantity ||
                            "Kurs sayısı"
                          }
                          className="bg-gray-100 p-3 text-gray-600 font-semibold m-3 rounded-xl"
                        />
                        <Image
                          src={courses[selectedBigInputIndex].icon}
                          width={50}
                          height={50}
                          alt={courses[selectedBigInputIndex].icon}
                        />
                        <input
                          onChange={(event) =>
                            handleCourseInputChange(
                              event,
                              selectedBigInputIndex,
                              "icon"
                            )
                          }
                          type="file"
                          className="bg-gray-200 text-gray-600 font-semibold rounded-xl w-60"
                        />
                        <div className="flex  bg-gray-100 px-4 rounded-xl mt-3">
                          <label
                            htmlFor="border"
                            className="text-gray-600 font-semibold mr-2 flex justify-center items-center"
                          >
                            Çerçeve Rengi:
                          </label>
                          <input
                            onChange={(event) =>
                              handleCourseInputChange(
                                event,
                                selectedBigInputIndex,
                                "border"
                              )
                            }
                            type="color"
                            className="bg-gray-100 text-gray-600 font-semibold m-3 rounded-xl"
                          />
                        </div>
                        <div className="flex  bg-gray-100 px-4 rounded-xl mt-3">
                          <label
                            htmlFor="border"
                            className="text-gray-600 font-semibold mr-2 flex justify-center items-center"
                          >
                            Arka Plan Rengi:
                          </label>
                          <input
                            onChange={(event) =>
                              handleCourseInputChange(
                                event,
                                selectedBigInputIndex,
                                "background"
                              )
                            }
                            type="color"
                            className="bg-gray-100 text-gray-600 font-semibold m-3 rounded-xl"
                          />
                        </div>

                        <input
                          onChange={(event) =>
                            handleCourseInputChange(
                              event,
                              selectedBigInputIndex,
                              "extraField"
                            )
                          }
                          placeholder="Ekstra Bilgi"
                          type="text"
                          className="bg-gray-100 p-3 text-gray-600 font-semibold m-3 rounded-xl"
                        />
                      </div>
                      <button
                        onClick={() =>
                          updateCourse(courses[selectedBigInputIndex])
                        }
                        className="bg-gray-100 text-gray-600 px-5 py-3 rounded-xl font-semibold m-3 mt-0"
                      >
                        Kaydet
                      </button>
                    </div>
                  </div>
                </>
              )}
              {modalContent === "buton" && pageId === "features" && (
                <h1 className="text-gray-500 text-center font-semibold">
                  Ders Bilgileri
                </h1>
              )}
              {modalContent === "buton" && pageId === "features" && (
                <>
                  <div className="flex flex-col items-center justify-center">
                    <div className="inputArea ">
                      <div className="detailInputs flex flex-col items-center justify-center">
                        <input
                          onChange={(event) =>
                            handleFeaturesInputChange(
                              event,
                              selectedBigInputIndex,
                              "title"
                            )
                          }
                          type="text"
                          placeholder={featured[selectedBigInputIndex].title}
                          className="bg-gray-100 p-3 text-gray-600 font-semibold m-3 rounded-xl"
                        />

                        <input
                          onChange={(event) =>
                            handleFeaturesInputChange(
                              event,
                              selectedBigInputIndex,
                              "name"
                            )
                          }
                          type="text"
                          placeholder={featured[selectedBigInputIndex].name}
                          className="bg-gray-100 p-3 text-gray-600 font-semibold m-3 rounded-xl"
                        />
                        <Image
                          src={featured[selectedBigInputIndex].image}
                          width={150}
                          height={150}
                          alt={featured[selectedBigInputIndex].image}
                        />
                        <input
                          onChange={(event) =>
                            handleFeaturesInputChange(
                              event,
                              selectedBigInputIndex,
                              "image"
                            )
                          }
                          type="file"
                          className="bg-gray-200 text-gray-600 font-semibold rounded-xl w-60"
                        />
                        <input
                          onChange={(event) =>
                            handleFeaturesInputChange(
                              event,
                              selectedBigInputIndex,
                              "price"
                            )
                          }
                          type="text"
                          placeholder={
                            featured[selectedBigInputIndex].price || "Ücret"
                          }
                          className="bg-gray-100 p-3 text-gray-600 font-semibold m-3 rounded-xl"
                        />
                        <input
                          onChange={(event) =>
                            handleFeaturesInputChange(
                              event,
                              selectedBigInputIndex,
                              "star"
                            )
                          }
                          type="text"
                          placeholder={
                            featured[selectedBigInputIndex].star || "Yıldız"
                          }
                          className="bg-gray-100 p-3 text-gray-600 font-semibold m-3 rounded-xl"
                        />
                        <select
                          onChange={(event) =>
                            handleFeaturesInputChange(
                              event,
                              selectedBigInputIndex,
                              "topDesc"
                            )
                          }
                          placeholder={
                            featured[selectedBigInputIndex].topDesc ||
                            "Kategori"
                          }
                          className="bg-gray-100 p-3 text-gray-600 font-semibold m-3 rounded-xl w-[90%]"
                        >
                          {categories.map((category, index) => (
                            <option key={index} value={category.name}>
                              {category.name}
                            </option>
                          ))}
                        </select>

                        <input
                          onChange={(event) =>
                            handleFeaturesInputChange(
                              event,
                              selectedBigInputIndex,
                              "students"
                            )
                          }
                          type="text"
                          placeholder={
                            featured[selectedBigInputIndex].students ||
                            "Öğrenci Sayısı"
                          }
                          className="bg-gray-100 p-3 text-gray-600 font-semibold m-3 rounded-xl"
                        />
                        <input
                          onChange={(event) =>
                            handleFeaturesInputChange(
                              event,
                              selectedBigInputIndex,
                              "lessons"
                            )
                          }
                          type="text"
                          placeholder={
                            featured[selectedBigInputIndex].lessons ||
                            "Ders Sayısı"
                          }
                          className="bg-gray-100 p-3 text-gray-600 font-semibold m-3 rounded-xl"
                        />
                        <button
                          onClick={() =>
                            updateFeature(featured[selectedBigInputIndex])
                          }
                          className="bg-gray-100 text-gray-600 px-5 py-3 rounded-xl font-semibold m-3 mt-0"
                        >
                          Kaydet
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
      {/* add course modal */}
      {addCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-gray-600 bg-opacity-50">
          <div className="relative mx-auto px-auto bg-white rounded-2xl animate__animated animate__fadeInDown w-80 lg:w-auto lg:max-w-[400px] lg:min-w-[400px]">
            <div className="flex flex-col px-3 mx-auto rounded-lg bg-bgWhite">
              <div className="flex flex-col md:flex-row justify-evenly items-center gap-x-2 lg:gap-x-5 mt-3 text-xs lg:text-sm ml-auto">
                <div className="flex items-center justify-center relative w-full ml-auto">
                  <div
                    className="w-5 h-5 md:w-10 md:h-10 rounded-md p-4 cursor-pointer transition-all duration-700  bg-gray-400/50 hover:bg-red-500 group  right-2 bottom-1"
                    onClick={closeAddCourseModal}
                  >
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 512 512"
                      className="text-txtRed transition-all duration-700 rotate-180 flex absolute group-hover:opacity-0 group-hover:rotate-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                      height="30"
                      width="30"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M289.94 256l95-95A24 24 0 00351 127l-95 95-95-95a24 24 0 00-34 34l95 95-95 95a24 24 0 1034 34l95-95 95 95a24 24 0 0034-34z"></path>
                    </svg>
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 24 24"
                      className="text-white rotate-0 transition-all duration-700 opacity-0 group-hover:block group-hover:rotate-180 group-hover:opacity-100 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                      height="30"
                      width="30"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M4.5 12.75a.75.75 0 0 1 .75-.75h13.5a.75.75 0 0 1 0 1.5H5.25a.75.75 0 0 1-.75-.75Z"></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div className="content flex flex-col items-center justify-center">
              <>
                <div className="flex flex-col items-center justify-center">
                  <div className="inputArea ">
                    <div className="detailInputs flex flex-col items-center justify-center">
                      <form
                        onSubmit={handleAddCourse}
                        className="flex flex-row flex-wrap items-center justify-center"
                      >
                        <input
                          onChange={(event) =>
                            handleAddCourseInputChange(event, "title")
                          }
                          type="text"
                          placeholder="Kurs Adı"
                          className="bg-gray-100 p-3 text-gray-600 font-semibold m-3 rounded-xl"
                        />
                        <input
                          onChange={(event) =>
                            handleAddCourseInputChange(event, "quantity")
                          }
                          type="text"
                          placeholder="Kurs sayısı"
                          className="bg-gray-100 p-3 text-gray-600 font-semibold m-3 rounded-xl"
                        />
                        <div className="flex  bg-gray-100 px-4 mb-3 rounded-xl">
                          <label
                            htmlFor="border"
                            className="text-gray-600 font-semibold mr-2 flex justify-center items-center"
                          >
                            Çerçeve Rengi:
                          </label>
                          <input
                            onChange={(event) =>
                              handleAddCourseInputChange(event, "border")
                            }
                            type="color"
                            className="bg-gray-100 font-semibold m-3 rounded-xl"
                          />
                        </div>
                        <input
                          onChange={(event) =>
                            handleAddCourseInputChange(event, "icon")
                          }
                          type="file"
                          accept="image/*"
                          placeholder="İkon"
                          className="bg-gray-200 text-gray-600 font-semibold rounded-xl w-60"
                        />
                        <div className="flex  bg-gray-100 px-4 rounded-xl mt-3">
                          <label
                            htmlFor="border"
                            className="text-gray-600 font-semibold mr-2 flex justify-center items-center"
                          >
                            Arka Plan Rengi:
                          </label>
                          <input
                            onChange={(event) =>
                              handleAddCourseInputChange(event, "background")
                            }
                            type="color"
                            className="bg-gray-100 font-semibold m-3 rounded-xl"
                          />
                        </div>
                        <input
                          onChange={(event) =>
                            handleAddCourseInputChange(event, "extraField")
                          }
                          placeholder="Ekstra Bilgi"
                          type="text"
                          className="bg-gray-100 p-3 text-gray-600 font-semibold m-3 rounded-xl"
                        />
                        <button
                          type="submit"
                          className="text-gray-600 bg-gray-100 py-3 px-8 rounded-xl font-semibold m-5"
                        >
                          Oluştur
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </>
            </div>
          </div>
        </div>
      )}
      {/* add lecture modal */}
      {addFeature && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-gray-600 bg-opacity-50">
          <div className="relative mx-auto px-auto bg-white rounded-2xl animate__animated animate__fadeInDown w-80 lg:w-auto lg:max-w-[400px] lg:min-w-[400px]">
            <div className="flex flex-col px-3 mx-auto rounded-lg bg-bgWhite">
              <div className="flex flex-col md:flex-row justify-evenly items-center gap-x-2 lg:gap-x-5 mt-3 text-xs lg:text-sm ml-auto">
                <div className="flex items-center justify-center relative w-full ml-auto">
                  <div
                    className="w-5 h-5 md:w-10 md:h-10 rounded-md p-4 cursor-pointer transition-all duration-700  bg-gray-400/50 hover:bg-red-500 group  right-2 bottom-1"
                    onClick={closeAddFeatureModal}
                  >
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 512 512"
                      className="text-txtRed transition-all duration-700 rotate-180 flex absolute group-hover:opacity-0 group-hover:rotate-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                      height="30"
                      width="30"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M289.94 256l95-95A24 24 0 00351 127l-95 95-95-95a24 24 0 00-34 34l95 95-95 95a24 24 0 1034 34l95-95 95 95a24 24 0 0034-34z"></path>
                    </svg>
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 24 24"
                      className="text-white rotate-0 transition-all duration-700 opacity-0 group-hover:block group-hover:rotate-180 group-hover:opacity-100 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                      height="30"
                      width="30"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M4.5 12.75a.75.75 0 0 1 .75-.75h13.5a.75.75 0 0 1 0 1.5H5.25a.75.75 0 0 1-.75-.75Z"></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div className="content flex flex-col items-center justify-center">
              <>
                <div className="flex flex-col items-center justify-center">
                  <div className="inputArea ">
                    <div className="detailInputs flex flex-col items-center justify-center">
                      <form
                        onSubmit={handleAddFeature}
                        className="flex flex-row flex-wrap items-center justify-center"
                      >
                        <input
                          onChange={(event) =>
                            handleAddFeatureInputChange(event, "title")
                          }
                          type="text"
                          placeholder={"İsim"}
                          className="bg-gray-100 p-3 text-gray-600 font-semibold m-3 rounded-xl"
                        />

                        <input
                          onChange={(event) =>
                            handleAddFeatureInputChange(event, "name")
                          }
                          type="text"
                          placeholder={"Yayıncı"}
                          className="bg-gray-100 p-3 text-gray-600 font-semibold m-3 rounded-xl"
                        />

                        <input
                          onChange={(event) =>
                            handleAddFeatureInputChange(event, "image")
                          }
                          type="file"
                          className="bg-gray-200 text-gray-600 font-semibold rounded-xl w-60"
                        />
                        <input
                          onChange={(event) =>
                            handleAddFeatureInputChange(event, "price")
                          }
                          type="number"
                          placeholder={"Ücret"}
                          className="bg-gray-100 p-3 text-gray-600 font-semibold m-3 rounded-xl"
                        />
                        <input
                          onChange={(event) =>
                            handleAddFeatureInputChange(event, "star")
                          }
                          max={5}
                          type="number"
                          placeholder={"Yıldız"}
                          className="bg-gray-100 p-3 text-gray-600 font-semibold m-3 rounded-xl"
                        />
                        <select
                          onChange={(event) =>
                            handleAddFeatureInputChange(event, "topDesc")
                          }
                          className="bg-gray-100 p-3 text-gray-600 font-semibold m-3 rounded-xl w-[60%]"
                        >
                          {categories.map((category, index) => (
                            <option key={index} value={category.name}>
                              {category.name}
                            </option>
                          ))}
                        </select>

                        <input
                          onChange={(event) =>
                            handleAddFeatureInputChange(
                              event,

                              "students"
                            )
                          }
                          type="number"
                          placeholder={"Öğrenci Sayısı"}
                          className="bg-gray-100 p-3 text-gray-600 font-semibold m-3 rounded-xl"
                        />
                        <input
                          onChange={(event) =>
                            handleAddFeatureInputChange(event, "lessons")
                          }
                          type="number"
                          placeholder={"Ders Sayısı"}
                          className="bg-gray-100 p-3 text-gray-600 font-semibold m-3 rounded-xl"
                        />
                        <button
                          type="submit"
                          className="text-gray-600 bg-gray-100 py-3 px-8 rounded-xl font-semibold m-5"
                        >
                          Oluştur
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </>
            </div>
          </div>
        </div>
      )}
      {/* add navbar modal */}
      {addNavbar && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-gray-600 bg-opacity-50">
          <div className=" bg-white rounded-2xl animate__animated animate__fadeInDown w-80 lg:w-auto lg:max-w-[400px] lg:min-w-[400px]">
            <div className="flex flex-col px-3 mx-auto rounded-lg bg-bgWhite">
              <div className="flex flex-col md:flex-row justify-evenly items-center gap-x-2 lg:gap-x-5 mt-3 text-xs lg:text-sm ml-auto">
                <div className="flex items-center justify-center relative w-full ml-auto">
                  <div
                    className="w-5 h-5 md:w-10 md:h-10 rounded-md p-4 cursor-pointer transition-all duration-700  bg-gray-400/50 hover:bg-red-500 group  right-2 bottom-1"
                    onClick={closeAddNavbarModal}
                  >
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 512 512"
                      className="text-txtRed transition-all duration-700 rotate-180 flex absolute group-hover:opacity-0 group-hover:rotate-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                      height="30"
                      width="30"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M289.94 256l95-95A24 24 0 00351 127l-95 95-95-95a24 24 0 00-34 34l95 95-95 95a24 24 0 1034 34l95-95 95 95a24 24 0 0034-34z"></path>
                    </svg>
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 24 24"
                      className="text-white rotate-0 transition-all duration-700 opacity-0 group-hover:block group-hover:rotate-180 group-hover:opacity-100 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                      height="30"
                      width="30"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M4.5 12.75a.75.75 0 0 1 .75-.75h13.5a.75.75 0 0 1 0 1.5H5.25a.75.75 0 0 1-.75-.75Z"></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div className="content flex flex-col items-center justify-center">
              <>
                <div className="flex flex-col items-center justify-center">
                  <div className="inputArea ">
                    <div className="detailInputs flex flex-col items-center justify-center">
                      <h1 className="text-gray-500 text-center font-semibold">
                        Alt Menüler
                      </h1>
                      <button
                        onClick={handleAddAnotherItem}
                        className="text-gray-600 bg-gray-100 py-3 px-8 rounded-xl font-semibold m-5"
                      >
                        Alt Menü Ekle
                      </button>
                      <form
                        onSubmit={handleAddNavbar}
                        className="flex flex-row flex-wrap items-center justify-center"
                      >
                        <input
                          onChange={(event) =>
                            handleAddNavbarInputChange(event, "name")
                          }
                          type="text"
                          placeholder="Menü ismi"
                          className="bg-gray-100 p-3 text-gray-600 font-semibold m-3 rounded-xl"
                        />
                        {[...Array(underMenuCount)].map((_, index) => (
                          <div>
                            <input
                              key={index}
                              onChange={(event) =>
                                handleAddNavbarInputChange(
                                  event,
                                  "items",
                                  index
                                )
                              }
                              type="text"
                              placeholder={`Alt Menü ${index + 1}`}
                              className="bg-gray-100 p-3 text-gray-600 font-semibold m-3 rounded-xl"
                            />
                            <button
                              onClick={() => handleDeleteAnotherItem()}
                              className="bg-gray-100 py-3 px-5 text-gray-600 font-semibold  rounded-xl"
                            >
                              X
                            </button>
                          </div>
                        ))}

                        <button
                          type="submit"
                          className="text-gray-600 bg-gray-100 py-3 px-8 rounded-xl font-semibold m-5"
                        >
                          Oluştur
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </>
            </div>
          </div>
        </div>
      )}
      {/* add category modal */}
      {addFeatureCategory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-gray-600 bg-opacity-50">
          <div className="relative mx-auto px-auto bg-white rounded-2xl animate__animated animate__fadeInDown w-80 lg:w-auto lg:max-w-[400px] lg:min-w-[400px]">
            <div className="flex flex-col px-3 mx-auto rounded-lg bg-bgWhite">
              <div className="flex flex-col md:flex-row justify-evenly items-center gap-x-2 lg:gap-x-5 mt-3 text-xs lg:text-sm ml-auto">
                <div className="flex items-center justify-center relative w-full ml-auto">
                  <div
                    className="w-5 h-5 md:w-10 md:h-10 rounded-md p-4 cursor-pointer transition-all duration-700  bg-gray-400/50 hover:bg-red-500 group  right-2 bottom-1"
                    onClick={closeAddFeatureCategoryModal}
                  >
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 512 512"
                      className="text-txtRed transition-all duration-700 rotate-180 flex absolute group-hover:opacity-0 group-hover:rotate-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                      height="30"
                      width="30"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M289.94 256l95-95A24 24 0 00351 127l-95 95-95-95a24 24 0 00-34 34l95 95-95 95a24 24 0 1034 34l95-95 95 95a24 24 0 0034-34z"></path>
                    </svg>
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 24 24"
                      className="text-white rotate-0 transition-all duration-700 opacity-0 group-hover:block group-hover:rotate-180 group-hover:opacity-100 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                      height="30"
                      width="30"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M4.5 12.75a.75.75 0 0 1 .75-.75h13.5a.75.75 0 0 1 0 1.5H5.25a.75.75 0 0 1-.75-.75Z"></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div className="content flex flex-col items-center justify-center">
              <>
                <div className="flex flex-col items-center justify-center">
                  <div className="inputArea ">
                    <div className="detailInputs flex flex-col items-center justify-center">
                      <form
                        onSubmit={handleAddFeatureCategory}
                        className="flex flex-row flex-wrap items-center justify-center"
                      >
                        <input
                          onChange={(event) =>
                            handleAddFeatureCategoryInputChange(event, "name")
                          }
                          type="text"
                          placeholder={"Kategori İsmi"}
                          className="bg-gray-100 p-3 text-gray-600 font-semibold m-3 rounded-xl"
                        />

                        <button
                          type="submit"
                          className="text-gray-600 bg-gray-100 py-3 px-8 rounded-xl font-semibold m-5"
                        >
                          Oluştur
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditModal;
