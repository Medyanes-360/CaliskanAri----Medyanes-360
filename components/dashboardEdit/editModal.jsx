import React, { useState, useEffect } from "react";
import { SketchPicker } from "react-color";
import Image from "next/image";
import { postAPI, getAPI } from "@/services/fetchAPI";
import Swal from "sweetalert2";
import AWS from "aws-sdk";
import { BsMenuButtonWideFill } from "react-icons/bs";
const EditModal = ({ isOpen, onClose, modalContent, pageId }) => {
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedTextColor, setSelectedTextColor] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageStudents, setSelectedImageStudents] = useState(null);
  const [selectedImageLogo, setSelectedImageLogo] = useState(null);
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
  const [mainButtons, setMainButtons] = useState([]); //BUTTONS DEĞİŞKENİ
  const [studentsButtons, setStudentsButtons] = useState([]); //BUTTONS DEĞİŞKENİ
  const [bannerButtons, setBannerButtons] = useState([]); //BUTTONS DEĞİŞKENİ
  const [addButton, setAddButton] = useState(false);
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

    try {
      const data = await s3.putObject(params).promise();
      setNewCourse((prevCourse) => {
        const newIconUrl = `https://caliskanari.s3.amazonaws.com/images/${imageFile.name}`;
        const updatedCourse = {
          ...prevCourse,
          icon: newIconUrl,
        };
        return updatedCourse;
      });
    } catch (error) {
      console.error("Error uploading image to S3:", error);
    }
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
        setImage(result[0]);
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

    const buttonData = getAPI("/home/HomeButton");
    buttonData
      .then(function (result) {
        const mainButtonInfo = result.filter((item) => item.pageId === "main");
        if (mainButtonInfo.length > 0) {
          setMainButtons(mainButtonInfo);
        } else {
          console.log("Main page için bgColor bulunamadı.");
        }
      })
      .catch(function (error) {
        console.error("Hata oluştu:", error);
      });

    const bannerbuttonData = getAPI("/home/HomeButton");
    bannerbuttonData
      .then(function (result) {
        const mainButtonInfo = result.filter(
          (item) => item.pageId === "banner"
        );
        if (mainButtonInfo.length > 0) {
          setBannerButtons(mainButtonInfo);
        } else {
          console.log("Main page için bgColor bulunamadı.");
        }
      })
      .catch(function (error) {
        console.error("Hata oluştu:", error);
      });

    const studentsbuttonData = getAPI("/home/HomeButton");
    studentsbuttonData
      .then(function (result) {
        const mainButtonInfo = result.filter(
          (item) => item.pageId === "students"
        );
        if (mainButtonInfo.length > 0) {
          setStudentsButtons(mainButtonInfo);
        } else {
          console.log("Main page için bgColor bulunamadı.");
        }
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
    boxBorder: "",
    background: "",
    boxBackground: "",
    extraField: "",
  }); //YENİ KURS EKLEME DEĞİŞKENİ
  const [newButton, setNewButton] = useState({
    title: "",
    color: "",
    textColor: "",
    hoverColor: "",
    addressLink: "",
    pageId: "",
  }); //YENİ KURS EKLEME DEĞİŞKENİ

  const handleAddButtonInputChange = (event, field, pageId) => {
    const { value } = event.target;

    setNewButton((prevButtons) => ({
      ...prevButtons,
      [field]: value,
      pageId: pageId,
    }));
  };
  const handleAddButton = async (event, pageId) => {
    event.preventDefault();
    setNewButton({
      title: "",
      color: "",
      textColor: "",
      hoverColor: "",
      addressLink: "",
      pageId: pageId,
    });
    if (
      !newButton.title ||
      !newButton.color ||
      !newButton.addressLink ||
      !newButton.textColor ||
      !newButton.hoverColor
    ) {
      Swal.fire({
        title: "Hata",
        text: "Lütfen tüm alanları doldurun.",
        icon: "error",
      });
    } else {
      if (pageId === "main") {
        setMainButtons((prevButtons) => [...prevButtons, newButton]);
      } else if (pageId === "students") {
        setStudentsButtons((prevButtons) => [...prevButtons, newButton]);
      } else if (pageId === "banner") {
        setMainButtons((prevButtons) => [...prevButtons, newButton]);
      }
      const response = await postAPI("/home/addButton", newButton);
      Swal.fire({
        title: "Başarılı",
        text: "Buton başarılı bir şekilde eklendi.",
        icon: "success",
      });
      closeAddButtonModal();
    }
  }; //YENİ KURS EKLEME
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
    address: "",
    items: [{ name: "", address: "" }],
  }); //YENİ MENU EKLEME DEĞİŞKENİ
  const [newFeatureCategory, setNewFeatureCategory] = useState({
    name: "",
  }); //YENİ KATEGORİ EKLEME DEĞİŞKENİ

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
      .on("httpUploadProgress", (evt) => {})
      .promise();

    await upload.then((err, data) => {
      setNewFeature((prevFeature) => ({
        ...prevFeature,
        [field]: `https://caliskanari.s3.amazonaws.com/images/${imageFile.name}`,
      }));
      console.log(err);
    });
  };

  const handleAddCourseInputChange = (event, field) => {
    const { value, files } = event.target;
    if (field === "icon" && files && files.length > 0) {
      const imageFile = files[0];
      uploadImageToS3Course(imageFile, field);
    } else if (field === "icon" && files.length < 0) {
      Swal.fire({
        title: "Hata",
        text: "Lütfen bir resim seçiniz.",
        icon: "error",
      });
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
    } else if (field === "image" && files.length < 0) {
      Swal.fire({
        title: "Hata",
        text: "Lütfen bir resim seçiniz.",
        icon: "error",
      });
    } else {
      setNewFeature((prevFeature) => ({
        ...prevFeature,
        [field]: value,
      }));
    }
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

    setNewCourse({
      title: "",
      quantity: null,
      icon: "",
      border: "",
      boxBorder: "",
      background: "",
      boxBackground: "",
      extraField: "",
    });
    if (
      !newCourse.title ||
      !newCourse.quantity === null ||
      !newCourse.icon ||
      !newCourse.border ||
      !newCourse.background ||
      !newCourse.extraField ||
      !newCourse.boxBackground ||
      !newCourse.boxBorder
    ) {
      Swal.fire({
        title: "Hata",
        text: "Lütfen tüm alanları doldurun.",
        icon: "error",
      });
    } else {
      setCourses((prevCourses) => [...prevCourses, newCourse]);
      const response = await postAPI("/home/addCourse", newCourse);
      Swal.fire({
        title: "Başarılı",
        text: "Kurs başarılı bir şekilde eklendi.",
        icon: "success",
      });
      closeAddCourseModal();
    }
  }; //YENİ KURS EKLEME

  const handleAddFeature = async (event) => {
    event.preventDefault();
    if (
      !newFeature.title ||
      !newFeature.name ||
      !newFeature.image ||
      !newFeature.price ||
      !newFeature.topDesc ||
      !newFeature.star === null ||
      !newFeature.students === null ||
      !newFeature.lessons === null
    ) {
      Swal.fire({
        title: "Hata",
        text: "Lütfen tüm alanları doldurun.",
        icon: "error",
      });
    } else {
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
    }
  }; //YENİ KURS EKLEME
  const handleAddNavbarInputChange = (event, field, index) => {
    const { value } = event.target;
    if (field === "itemsName" || field === "itemsAddress") {
      setNewNavbar((prevNavbar) => {
        const updatedItems = [...prevNavbar.items]; // Create a copy of the items array
        updatedItems[index] = {
          ...updatedItems[index],
          [field === "itemsName" ? "name" : "address"]: value,
        }; // Update the value at the specified index
        return {
          ...prevNavbar,
          items: updatedItems,
        };
      });
    } else {
      setNewNavbar((prevNavbar) => ({
        ...prevNavbar,
        [field]: value,
      }));
    }
  };

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

  const deleteButton = async (deleteObject) => {
    Swal.fire({
      title: "Butonu Sil",
      text: "Butonu gerçekten silmek istiyor musunuz ?",
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
          "/home/deleteButton",
          deleteObject.id,
          "DELETE"
        );
        if (deleteObject.pageId === "main") {
          const updatedButton = mainButtons.filter(
            (button) => button.id !== deleteObject.id
          );
          setMainButtons(updatedButton);
        } else if (deleteObject.pageId === "banner") {
          const updatedButton = bannerButtons.filter(
            (button) => button.id !== deleteObject.id
          );
          setBannerButtons(updatedButton);
        } else if (deleteObject.pageId === "students") {
          const updatedButton = studentsButtons.filter(
            (button) => button.id !== deleteObject.id
          );
          setStudentsButtons(updatedButton);
        }

        Swal.fire("Silindi !", "", "success");
      } else if (result.isDenied) {
        Swal.fire("İşlem iptal edildi !", "", "info");
      }
    });
  }; //BUTTON SİLME

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
    if (!newNavbar.name || !newNavbar.items || !newNavbar.address) {
      Swal.fire({
        title: "Hata",
        text: "Lütfen tüm alanları doldurun.",
        icon: "error",
      });
    } else {
      setNewNavbar({
        name: "",
        address: "",
        items: [{ name: "", address: "" }],
      });
      setMenus((preMenus) => [...preMenus, newNavbar]);
      const response = await postAPI("/home/addMenu", newNavbar);
      Swal.fire({
        title: "Başarılı",
        text: "Menü başarılı bir şekilde eklendi.",
        icon: "success",
      });
      closeAddNavbarModal();
    }
  }; // YENİ MENU EKLEME
  const handleAddFeatureCategory = async (event) => {
    event.preventDefault();
    if (!newFeatureCategory.name) {
      Swal.fire({
        title: "Hata",
        text: "Lütfen tüm alanları doldurun.",
        icon: "error",
      });
    } else {
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
    }
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
    const { value, id } = event.target;
    if (itemIndex === null) {
      const newMenus = [...menus];
      newMenus[menuIndex] = {
        ...newMenus[menuIndex],
        name: value,
      };
      setMenus(newMenus);
    } else {
      const newMenus = menus.map((menu, i) =>
        i === menuIndex
          ? {
              ...menu,
              items: menu.items.map((item, j) =>
                j === itemIndex
                  ? {
                      ...item,
                      name: id === "itemName" ? value : item.name,
                      address: id === "itemAddress" ? value : item.address,
                    }
                  : item
              ),
            }
          : menu
      );
      setMenus(newMenus);
    }
  }; // NAVBAR YAZI DEĞİŞTİREN FONKSİYON

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

  const handleButtonInputChange = (event, index, field, pageId) => {
    if (pageId === "main") {
      const { value } = event.target;
      const newButton = [...mainButtons];
      newButton[index] = {
        ...newButton[index],
        [field]: value,
        pageId: pageId,
      };
      setMainButtons(newButton);
    } else if (pageId === "students") {
      const { value } = event.target;
      const newButton = [...studentsButtons];
      newButton[index] = {
        ...newButton[index],
        [field]: value,
        pageId: pageId,
      };
      setStudentsButtons(newButton);
    } else if (pageId === "banner") {
      const { value } = event.target;
      const newButton = [...bannerButtons];
      newButton[index] = {
        ...newButton[index],
        [field]: value,
        pageId: pageId,
      };
      setBannerButtons(newButton);
    }
  }; //BUTON ALANI KURS BİLGİLERİNİ DEĞİŞİTREN FONKSİYON

  const handleCourseInputChange = async (event, index, field) => {
    if (field === "icon") {
      const file = event.target.files[0];
      if (!file) {
        Swal.fire({
          title: "Hata",
          text: "Lütfen bir resim seçiniz.",
          icon: "error",
        });
        return;
      }
      await uploadImageToS3Course(file, field);
      const newCourses = [...courses];
      newCourses[index] = {
        ...newCourses[index],
        icon: `https://caliskanari.s3.amazonaws.com/images/${file.name}`,
      };
      setCourses(newCourses);
    } else {
      const { value } = event.target;
      const newCourses = [...courses];
      newCourses[index] = {
        ...newCourses[index],
        [field]: value,
      };
      setCourses(newCourses);
    }
  }; //KURS ALANI KURS BİLGİLERİNİ DEĞİŞTREN FONKSİYON

  const handleFeaturesInputChange = async (event, index, field) => {
    if (field === "image") {
      const file = event.target.files[0];
      if (!file) {
        Swal.fire({
          title: "Hata",
          text: "Lütfen bir resim seçiniz.",
          icon: "error",
        });
        return;
      }
      await uploadImageToS3(file, field);
      const newFeature = [...featured];
      newFeature[index] = {
        ...newFeature[index],
        icon: `https://caliskanari.s3.amazonaws.com/images/${file.name}`,
      };
      setFeatured(newFeature);
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
  const closeAddButtonModal = () => {
    setAddButton(false);
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
    console.log(updatedCourse);
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

  const updateButton = async (updatedButton) => {
    const response = await postAPI("/home/updateButton", updatedButton);
    Swal.fire({
      title: "Başarılı",
      text: "Buton verileri başarılı bir şekilde güncellendi.",
      icon: "success",
    });
    closeChildInputModal();
  };
  const handleSubmitBackgroundColor = async (event, pageId) => {
    event.preventDefault();
    if (selectedColor === "") {
      Swal.fire({
        title: "Hata",
        text: "Lütfen bir renk seçiniz.",
        icon: "error",
      });
    } else {
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
    }
  }; //HER KISIM İÇİN PAGEID ALIP ONA GÖRE DB YE GÖNDERECEĞİZ ARKA PLAN RENGİNİ

  const handleSubmitTextColor = async (event, pageId) => {
    event.preventDefault();
    if (selectedTextColor === "") {
      Swal.fire({
        title: "Hata",
        text: "Lütfen bir renk seçiniz.",
        icon: "error",
      });
    } else {
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
    }
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
      .on("httpUploadProgress", (evt) => {})
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
    if (selectedImageIndex === null) {
      Swal.fire({
        title: "Hata",
        text: "Lütfen bir resim seçiniz.",
        icon: "error",
      });
    } else if (selectedImageIndex !== null) {
      uploadImageToS3LogoBanner(selectedImage);
      setSelectedImage(null);
      const response = await postAPI(
        "/home/updateLogoBanner",
        logobanner[selectedImageIndex]
      );
      Swal.fire({
        title: "Başarılı",
        text: "Yazılar başarılı bir şekilde eklendi.",
        icon: "success",
      });
      setSelectedImageIndex(null);
    }
  }; //LOGOBANNER RESİM DEĞİŞTİRME
  const uploadImageToS3Students = async (imageFile) => {
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
      .on("httpUploadProgress", (evt) => {})
      .promise();

    await upload.then((err, data) => {
      setSelectedImageMain(imageFile);
      setImage((prevImage) => ({
        ...prevImage,
        studentPhoto: `https://caliskanari.s3.amazonaws.com/images/${imageFile.name}`,
      }));

      console.log(err);
    });
  };
  const handleImageChangeStudents = (event) => {
    const imageFile = event.target.files[0];
    setSelectedImageStudents(imageFile);
    uploadImageToS3Students(imageFile);
  }; //STUDENTS RESİM DEĞİŞTİRME

  const uploadImageToS3Logo = async (imageFile) => {
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
      .on("httpUploadProgress", (evt) => {})
      .promise();

    await upload.then((err, data) => {
      setSelectedImageMain(imageFile);
      setImage((prevImage) => ({
        ...prevImage,
        logo: `https://caliskanari.s3.amazonaws.com/images/${imageFile.name}`,
      }));

      console.log(err);
    });
  };

  const handleImageChangeLogo = (event) => {
    const imageFile = event.target.files[0];
    setSelectedImageLogo(imageFile);
    uploadImageToS3Logo(imageFile);
  }; //STUDENTS RESİM DEĞİŞTİRME

  const handleSubmitStudents = async (event) => {
    event.preventDefault();
    if (selectedImageStudents === null) {
      Swal.fire({
        title: "Hata",
        text: "Lütfen bir resim seçiniz.",
        icon: "error",
      });
    } else {
      const response = await postAPI("/home/updateImage", image);
      Swal.fire({
        title: "Başarılı",
        text: "Resim başarılı bir şekilde değiştirildi.",
        icon: "success",
      });
    }
  }; //STUDENTS RESİM DEĞİŞTİRME

  const handleSubmitLogo = async (event) => {
    event.preventDefault();
    if (selectedImageLogo === null) {
      Swal.fire({
        title: "Hata",
        text: "Lütfen bir resim seçiniz.",
        icon: "error",
      });
    } else {
      const response = await postAPI("/home/updateImage", image);
      Swal.fire({
        title: "Başarılı",
        text: "Resim başarılı bir şekilde değiştirildi.",
        icon: "success",
      });
    }
  }; //NAVBAR LOGO RESİM DEĞİŞTİRME
  const uploadImageToS3Video = async (imageFile) => {
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
      .on("httpUploadProgress", (evt) => {})
      .promise();

    await upload.then((err, data) => {
      setSelectedImageMain(imageFile);
      setImage((prevImage) => ({
        ...prevImage,
        videoCover: `https://caliskanari.s3.amazonaws.com/images/${imageFile.name}`,
      }));

      console.log(err);
    });
  };
  const handleImageChangeVideo = (event) => {
    const imageFile = event.target.files[0];
    setSelectedImageVideo(imageFile);
    uploadImageToS3Video(imageFile);
  }; //VİDEO RESİM DEĞİŞTİRME

  const handleSubmitVideo = async (event) => {
    event.preventDefault();
    if (selectedImageVideo === null) {
      Swal.fire({
        title: "Hata",
        text: "Lütfen bir resim seçiniz.",
        icon: "error",
      });
    } else {
      const response = await postAPI("/home/updateImage", image);
      Swal.fire({
        title: "Başarılı",
        text: "Resim başarılı bir şekilde değiştirildi.",
        icon: "success",
      });
    }
  }; //VİDEO RESİM DEĞİŞTİRME
  const uploadImageToS3Main = async (imageFile) => {
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
      .on("httpUploadProgress", (evt) => {})
      .promise();

    await upload.then((err, data) => {
      setSelectedImageMain(imageFile);
      setImage((prevImage) => ({
        ...prevImage,
        mainSection: `https://caliskanari.s3.amazonaws.com/images/${imageFile.name}`,
      }));

      console.log(err);
    });
  };
  const handleImageChangeMain = (event) => {
    const imageFile = event.target.files[0];
    uploadImageToS3Main(imageFile);
  }; //MAİN RESİM DEĞİŞTİRME

  const handleSubmitMain = async (event) => {
    event.preventDefault();
    if (selectedImageMain === null) {
      Swal.fire({
        title: "Hata",
        text: "Lütfen bir resim seçiniz.",
        icon: "error",
      });
    } else {
      const response = await postAPI("/home/updateImage", image);
      Swal.fire({
        title: "Başarılı",
        text: "Resim başarılı bir şekilde değiştirildi.",
        icon: "success",
      });
    }
  }; //MAİN RESİM DEĞİŞTİRME
  const uploadImageToS3Informations = async (imageFile, index) => {
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
      .on("httpUploadProgress", (evt) => {})
      .promise();

    await upload.then((err, data) => {
      setSelectedImagesInformations((prevImages) => {
        const updatedImages = [...prevImages];
        updatedImages[
          index
        ] = `https://caliskanari.s3.amazonaws.com/images/${imageFile.name}`;
        return updatedImages;
      });

      setInformations((prevInformations) => {
        const updatedInformations = [...prevInformations];
        updatedInformations[index] = {
          ...updatedInformations[index],
          icon: `https://caliskanari.s3.amazonaws.com/images/${imageFile.name}`,
        };
        return updatedInformations;
      });

      console.log(err);
    });
  };
  const handleImageChangeInformations = (event, index) => {
    const imageFile = event.target.files[0];
    uploadImageToS3Informations(imageFile, index);
  };
  const handleSubmitInformations = async (event, index) => {
    event.preventDefault();
    const response = await postAPI(
      "/home/updateInformations",
      informations[index]
    );
    Swal.fire({
      title: "Başarılı",
      text: "Resim başarılı bir şekilde değiştirildi.",
      icon: "success",
    });
  };

  const openChildInputModal = (index) => {
    setSelectedBigInputIndex(index);
    setChildInputModalOpen(true);
  };

  const closeChildInputModal = () => {
    setSelectedBigInputIndex(null);
    setChildInputModalOpen(false);
  };

  const [selectedOption, setSelectedOption] = useState(null);

  const handleSubmit = async (event, pageId) => {
    event.preventDefault();
    const data = {
      pageId: pageId,
      position: selectedOption,
    };
    const response = await postAPI("/home/updatePosition", data);
    Swal.fire({
      title: "Başarılı",
      text: "Pozisyon başarılı bir şekilde güncellendi.",
      icon: "success",
    });
  };

  const [underMenuCount, setUnderMenuCount] = useState(1);
  const modalClass = isOpen
    ? "fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-gray-600 bg-opacity-50"
    : "hidden";

  const addMainButtonFunction = () => {
    if (mainButtons.length >= 3) {
      Swal.fire({
        title: "Hata",
        text: "Maksimum 3 tane buton ekleyebilirsiniz. Yeni bir buton eklemek için var olanı silin!",
        icon: "error",
      });
    } else {
      setAddButton(true);
    }
  };

  const addStudentsButtonFunction = () => {
    if (studentsButtons.length >= 3) {
      Swal.fire({
        title: "Hata",
        text: "Maksimum 3 tane buton ekleyebilirsiniz. Yeni bir buton eklemek için var olanı silin!",
        icon: "error",
      });
    } else {
      setAddButton(true);
    }
  };

  const addBannerButtonFunction = () => {
    if (bannerButtons.length >= 3) {
      Swal.fire({
        title: "Hata",
        text: "Maksimum 3 tane buton ekleyebilirsiniz. Yeni bir buton eklemek için var olanı silin!",
        icon: "error",
      });
    } else {
      setAddButton(true);
    }
  };

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
                  <h1 className="text-gray-700 font-semibold mb-3 flex justify-center items-center flex-wrap">
                    {pageId === "navbar"
                      ? "Gezinme Çubuğu Sayfası"
                      : pageId === "banner"
                      ? "Afiş Sayfası"
                      : pageId === "courses"
                      ? "Kurslar Sayfası"
                      : pageId === "features"
                      ? "Dersler Sayfası"
                      : pageId === "footer"
                      ? "Altbilgi Sayfası"
                      : pageId === "informations"
                      ? "Bilgiler Sayfası"
                      : pageId === "logoBanner"
                      ? "Logo ve Afiş Sayfası"
                      : pageId === "main"
                      ? "Ana Sayfa"
                      : pageId === "students"
                      ? "Öğrenciler Sayfası"
                      : pageId === "video"
                      ? "Video Sayfası"
                      : ""}{" "}
                    Arka Plan Renk Seçici
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
                      className="text-gray-100 bg-[#2b536c] hover:bg-gray-200 hover:text-[#2b536c] transition-all duration-700 w-[85%] p-3 rounded-xl font-semibold m-5"
                    >
                      Kaydet
                    </button>
                  </form>
                </div>
              )}
              {modalContent === "renk" && (
                <div className="flex flex-col items-center justify-center p-5">
                  <h1 className="text-gray-700 font-semibold mb-3 flex justify-center items-center flex-wrap">
                    {pageId === "navbar"
                      ? "Gezinme Çubuğu Sayfası"
                      : pageId === "banner"
                      ? "Afiş Sayfası"
                      : pageId === "courses"
                      ? "Kurslar Sayfası"
                      : pageId === "features"
                      ? "Dersler Sayfası"
                      : pageId === "footer"
                      ? "Altbilgi Sayfası"
                      : pageId === "informations"
                      ? "Bilgiler Sayfası"
                      : pageId === "logoBanner"
                      ? "Logo ve Afiş Sayfası"
                      : pageId === "main"
                      ? "Ana Sayfa"
                      : pageId === "students"
                      ? "Öğrenciler Sayfası"
                      : pageId === "video"
                      ? "Video Sayfası"
                      : ""}{" "}
                    Yazı Renkleri
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
                      className="text-gray-100 bg-[#2b536c] hover:bg-gray-200 hover:text-[#2b536c] transition-all duration-700 w-[85%] p-3 rounded-xl font-semibold m-5"
                    >
                      Kaydet
                    </button>
                  </form>
                </div>
              )}
              {modalContent === "yazı" && pageId === "navbar" && (
                <div className="flex flex-col items-center justify-center mx-5">
                  <h1 className="text-center font-semibold text-gray-600 my-3">
                    Gezinme Çubuğu Menü Ekleme
                  </h1>
                  <button
                    onClick={() => setAddNavbar(true)}
                    className="text-gray-100 bg-[#855da3] hover:text-[#855da3] hover:bg-gray-100 transition-all duration-700 py-3 px-8 rounded-xl font-semibold w-full"
                  >
                    Menü Ekle +
                  </button>
                  <form
                    onSubmit={handleSubmitNavbar}
                    className="flex flex-col mt-3 flex-wrap items-center justify-center max-[768px]:max-h-[500px] overflow-scroll"
                  >
                    {menus.map((menu, menuIndex) => (
                      <div key={menuIndex} className="inputArea">
                        <div className="bigInput flex items-center justify-center">
                          <input
                            onChange={(event) =>
                              handleInputChange(event, menuIndex)
                            }
                            placeholder={menu.name}
                            type="text"
                            className="bg-gray-100 p-3 text-gray-600 font-semibold my-3 rounded-l-xl w-full focus:border-0 focus:outline-none"
                          />
                          <button
                            type="button"
                            onClick={() => openChildInputModal(menuIndex)}
                            className="text-gray-600 bg-gray-100 lg:py-3 lg:px-5 px-4 h-12 font-semibold my-auto"
                          >
                            <BsMenuButtonWideFill className="my-auto w-5 h-5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => deleteNavbarMenu(menu)}
                            className="text-gray-600 bg-gray-100 lg:py-3 lg:px-5 py-1 px-4 h-12 my-auto font-semibold rounded-r-xl"
                          >
                            <i className="fa-solid fa-trash text-red-600 w-5 h-5"></i>
                          </button>
                        </div>
                      </div>
                    ))}
                    <button
                      type="submit"
                      className="text-gray-100 bg-[#2b536c] hover:bg-gray-200 hover:text-[#2b536c] transition-all duration-700 py-3 w-full rounded-xl font-semibold my-5"
                    >
                      Kaydet
                    </button>
                  </form>
                </div>
              )}
              {modalContent === "buton" && pageId === "features" && (
                <div className="flex flex-col items-center justify-center mx-5">
                  <h1 className="text-gray-700 font-semibold">Dersler</h1>
                  <button
                    onClick={() => setAddFeature(true)}
                    className="text-gray-100 bg-[#855da3] hover:text-[#855da3] hover:bg-gray-100 transition-all duration-700 py-3 px-8 rounded-xl font-semibold my-5 mb-0 w-full"
                  >
                    Ders Ekle +
                  </button>
                  <form
                    onSubmit={handleSubmitFeature}
                    className=" mx-auto max-h-[500px] my-5"
                  >
                    {featured.map((feature, index) => (
                      <div key={index} className="inputArea ">
                        <div className="bigInput flex items-center justify-center">
                          <input
                            onChange={(event) =>
                              handleFeaturesInputChange(event, index, "title")
                            }
                            placeholder="Ders Adı"
                            type="text"
                            value={feature.title}
                            className="bg-gray-100 p-3 text-gray-600 font-semibold my-3 mr-0 rounded-l-xl w-full focus:border-0 focus:outline-none"
                          />
                          <button
                            type="button"
                            onClick={() => openChildInputModal(index)}
                            className="text-gray-600 bg-gray-100 lg:py-3 lg:px-5 px-4 h-12 font-semibold my-auto"
                          >
                            <BsMenuButtonWideFill className="my-auto w-5 h-5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => deleteFeature(feature)}
                            className="text-gray-600 bg-gray-100 lg:py-3 lg:px-5 py-1 px-4 h-12 my-auto font-semibold rounded-r-xl"
                          >
                            <i class="fa-solid fa-trash text-red-600"></i>
                          </button>
                        </div>
                      </div>
                    ))}
                    <button
                      type="submit"
                      className="text-gray-100 bg-[#2b536c] hover:bg-gray-200 hover:text-[#2b536c] transition-all duration-700 py-3 px-8 rounded-xl w-full font-semibold my-5 mx-auto"
                    >
                      Kaydet
                    </button>
                  </form>
                </div>
              )}
              {modalContent === "butonCategory" && pageId === "features" && (
                <div className="flex flex-col items-center justify-center mx-5">
                  <h1 className="text-gray-700 font-semibold">Kategoriler</h1>
                  <button
                    onClick={() => setAddFeatureCategory(true)}
                    className="text-gray-100 bg-[#855da3] hover:text-[#855da3] hover:bg-gray-100 transition-all duration-700 py-3 px-8 rounded-xl font-semibold m-5 mb-0 w-[100%]"
                  >
                    Kategori Ekle +
                  </button>
                  <div className="flex flex-col flex-wrap items-center justify-center max-h-[500px] overflow-scroll mt-3">
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
                            className="bg-gray-100 p-3 text-gray-600 font-semibold my-3 mr-0 rounded-l-xl w-full focus:border-0 focus:outline-none"
                          />

                          <button
                            type="button"
                            onClick={() => deleteFeatureCategory(category)}
                            className="text-gray-600 bg-gray-100 py-3 px-5 my-auto font-semibold rounded-r-xl h-12"
                          >
                            <i class="fa-solid fa-trash text-red-600"></i>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={handleSubmitFeatureCategory}
                    className="text-gray-100 bg-[#2b536c] hover:bg-gray-200 hover:text-[#2b536c] transition-all duration-700 w-full py-3 px-8 rounded-xl font-semibold my-5 mt-0"
                  >
                    Kaydet
                  </button>
                </div>
              )}
              {modalContent === "buton" && pageId === "courses" && (
                <div className="flex flex-col items-center justify-center max-w-[600px] mx-5">
                  <h1 className="text-gray-700 font-semibold">Kurslar</h1>
                  <button
                    onClick={() => setAddCourse(true)}
                    className="text-gray-100 bg-[#855da3] hover:text-[#855da3] hover:bg-gray-100 transition-all duration-700 w-full py-3 px-8 rounded-xl font-semibold my-5 mb-0"
                  >
                    Kurs Ekle +
                  </button>
                  <form
                    onSubmit={handleSubmitCourses}
                    className="flex flex-row flex-wrap items-center justify-center max-h-[500px] overflow-scroll"
                  >
                    {courses.map((course, index) => (
                      <div key={index} className="inputArea">
                        <div className="bigInput flex items-center justify-center">
                          <input
                            onChange={(event) =>
                              handleCourseInputChange(event, index, "title")
                            }
                            placeholder="Kurs Adı"
                            type="text"
                            value={course.title}
                            className="bg-gray-100 p-3 text-gray-600 font-semibold m-3 mr-0 rounded-l-xl w-40 focus:border-0 lg:w-40  focus:outline-none"
                          />
                          <button
                            type="button"
                            onClick={() => openChildInputModal(index)}
                            className="text-gray-600 bg-gray-100 lg:py-3 lg:px-5 px-4 h-12 font-semibold my-auto"
                          >
                            <BsMenuButtonWideFill className="my-auto w-5 h-5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => deleteCourse(course)}
                            className="text-gray-600 bg-gray-100 py-3 px-5  my-auto font-semibold rounded-r-xl h-12"
                          >
                            <i class="fa-solid fa-trash text-red-600"></i>
                          </button>
                        </div>
                      </div>
                    ))}
                    <button
                      type="submit"
                      className="text-gray-100 bg-[#2b536c] hover:bg-gray-200 hover:text-[#2b536c] transition-all duration-700 w-full py-3 px-8 rounded-xl font-semibold my-5"
                    >
                      Kaydet
                    </button>
                  </form>
                </div>
              )}
              {modalContent === "buton" && pageId === "main" && (
                <div className="flex flex-col items-center justify-center max-w-[250px] mx-5">
                  <h1 className="text-gray-700 font-semibold">
                    Anasayfa Butonları
                  </h1>
                  <button
                    onClick={addMainButtonFunction}
                    className="text-gray-100 bg-[#855da3] hover:text-[#855da3] hover:bg-gray-100 transition-all duration-700 py-3 px-8 rounded-xl font-semibold my-5 mb-0 w-full"
                  >
                    Buton Ekle +
                  </button>
                  <form
                    onSubmit={(event) => handleAddButton(event, pageId)}
                    className="flex flex-row flex-wrap items-center justify-center max-h-[500px] overflow-scroll"
                  >
                    {mainButtons.map((button, index) => (
                      <div key={index} className="inputArea ">
                        <div className="bigInput flex items-center justify-center">
                          <input
                            onChange={(event) =>
                              handleButtonInputChange(
                                event,
                                index,
                                "title",
                                pageId
                              )
                            }
                            placeholder={button.title}
                            type="text"
                            className="bg-gray-100 p-3 text-gray-600 font-semibold my-3 mr-0 rounded-l-xl w-full focus:border-0  focus:outline-none"
                          />
                          <button
                            type="button"
                            onClick={() => openChildInputModal(index)}
                            className="text-gray-600 bg-gray-100 lg:py-3 lg:px-5 px-4 h-12 font-semibold my-auto"
                          >
                            <BsMenuButtonWideFill className="my-auto w-5 h-5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => deleteButton(button)}
                            className="text-gray-600 bg-gray-100 lg:py-3 lg:px-5 py-1 px-4 h-12 my-auto font-semibold rounded-r-xl"
                          >
                            <i className="fa-solid fa-trash text-red-600 w-5 h-5"></i>
                          </button>
                        </div>
                      </div>
                    ))}
                    <button
                      type="submit"
                      className="text-gray-100 bg-[#2b536c] hover:bg-gray-200 hover:text-[#2b536c] transition-all duration-700 w-full py-3 px-8 rounded-xl font-semibold my-5"
                    >
                      Kaydet
                    </button>
                  </form>
                </div>
              )}
              {modalContent === "buton" && pageId === "students" && (
                <div className="flex flex-col items-center justify-center max-w-[250px] mx-5">
                  <h1 className="text-gray-700 font-semibold">
                    Öğrenciler Sayfası Butonları
                  </h1>
                  <button
                    onClick={addStudentsButtonFunction}
                    className="text-gray-100 bg-[#855da3] hover:text-[#855da3] hover:bg-gray-100 transition-all duration-700 py-3 px-8 rounded-xl font-semibold my-5 mb-0 w-full"
                  >
                    Buton Ekle +
                  </button>
                  <form
                    onSubmit={(event) => handleAddButton(event, pageId)}
                    className="flex flex-row flex-wrap items-center justify-center max-h-[500px] overflow-scroll"
                  >
                    {studentsButtons.map((button, index) => (
                      <div key={index} className="inputArea ">
                        <div className="bigInput flex items-center justify-center">
                          <input
                            onChange={(event) =>
                              handleButtonInputChange(
                                event,
                                index,
                                "title",
                                pageId
                              )
                            }
                            placeholder={button.title}
                            type="text"
                            className="bg-gray-100 p-3 text-gray-600 font-semibold my-3 mr-0 rounded-l-xl w-full focus:border-0  focus:outline-none"
                          />
                          <button
                            type="button"
                            onClick={() => openChildInputModal(index)}
                            className="text-gray-600 bg-gray-100 lg:py-3 lg:px-5 px-4 h-12 font-semibold my-auto"
                          >
                            <BsMenuButtonWideFill className="my-auto w-5 h-5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => deleteButton(button)}
                            className="text-gray-600 bg-gray-100 lg:py-3 lg:px-5 py-1 px-4 h-12 my-auto font-semibold rounded-r-xl"
                          >
                            <i className="fa-solid fa-trash text-red-600 w-5 h-5"></i>
                          </button>
                        </div>
                      </div>
                    ))}
                    <button
                      type="submit"
                      className="text-gray-100 bg-[#2b536c] hover:bg-gray-200 hover:text-[#2b536c] transition-all duration-700 w-full py-3 px-8 rounded-xl font-semibold my-5"
                    >
                      Kaydet
                    </button>
                  </form>
                </div>
              )}
              {modalContent === "buton" && pageId === "banner" && (
                <div className="flex flex-col items-center justify-center max-w-[250px] mx-5">
                  <h1 className="text-gray-700 font-semibold">
                    Afiş Sayfası Butonları
                  </h1>
                  <button
                    onClick={addBannerButtonFunction}
                    className="text-gray-100 bg-[#855da3] hover:text-[#855da3] hover:bg-gray-100 transition-all duration-700 py-3 px-8 rounded-xl font-semibold my-5 mb-0 w-full"
                  >
                    Buton Ekle +
                  </button>
                  <form
                    onSubmit={(event) => handleAddButton(event, pageId)}
                    className="flex flex-row flex-wrap items-center justify-center max-h-[500px] overflow-scroll"
                  >
                    {bannerButtons.map((button, index) => (
                      <div key={index} className="inputArea ">
                        <div className="bigInput flex items-center justify-center">
                          <input
                            onChange={(event) =>
                              handleButtonInputChange(
                                event,
                                index,
                                "title",
                                pageId
                              )
                            }
                            placeholder={button.title}
                            type="text"
                            className="bg-gray-100 p-3 text-gray-600 font-semibold my-3 mr-0 rounded-l-xl w-full focus:border-0  focus:outline-none"
                          />
                          <button
                            type="button"
                            onClick={() => openChildInputModal(index)}
                            className="text-gray-600 bg-gray-100 lg:py-3 lg:px-5 px-4 h-12 font-semibold my-auto"
                          >
                            <BsMenuButtonWideFill className="my-auto w-5 h-5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => deleteButton(button)}
                            className="text-gray-600 bg-gray-100 lg:py-3 lg:px-5 py-1 px-4 h-12 my-auto font-semibold rounded-r-xl"
                          >
                            <i className="fa-solid fa-trash text-red-600 w-5 h-5"></i>
                          </button>
                        </div>
                      </div>
                    ))}
                    <button
                      type="submit"
                      className="text-gray-100 bg-[#2b536c] hover:bg-gray-200 hover:text-[#2b536c] transition-all duration-700 w-full py-3 px-8 rounded-xl font-semibold my-5"
                    >
                      Kaydet
                    </button>
                  </form>
                </div>
              )}
              {modalContent === "yazı" && pageId === "main" && (
                <>
                  <h1 className="text-center font-semibold text-gray-600 my-3">
                    Anasayfa Yazı Değiştirme
                  </h1>
                  <div className="flex flex-col items-center justify-center lg:p-2">
                    <textarea
                      onChange={(event) =>
                        handleInputChangeInfo(event, "title")
                      }
                      placeholder={info[0].title}
                      type="text"
                      className="bg-gray-100 p-3 text-gray-600 font-semibold m-3 rounded-xl lg:w-96 h-36"
                    />
                    <textarea
                      onChange={(event) =>
                        handleInputChangeInfo(event, "desc1")
                      }
                      placeholder={info[0].desc1}
                      type="text"
                      className="bg-gray-100 p-3 text-gray-600 font-semibold m-3 rounded-xl lg:w-96 h-36"
                    />
                    <textarea
                      onChange={(event) =>
                        handleInputChangeInfo(event, "desc2")
                      }
                      placeholder={info[0].desc2}
                      type="text"
                      className="bg-gray-100 p-3 text-gray-600 font-semibold m-3 rounded-xl lg:w-96 h-36"
                    />
                    <button
                      onClick={() => updateInfo(info)}
                      className="text-gray-100 bg-[#2b536c] hover:bg-gray-200 hover:text-[#2b536c] transition-all duration-700 w-[85%] py-3 px-8 rounded-xl font-semibold m-5"
                    >
                      Kaydet
                    </button>
                  </div>
                </>
              )}
              {modalContent === "yazı" && pageId === "courses" && (
                <>
                  <h1 className="text-center font-semibold text-gray-600 my-3">
                    Kurslar Sayfası Yazı Değiştirme
                  </h1>
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
                      className="text-gray-100 bg-[#2b536c] hover:bg-gray-200 hover:text-[#2b536c] transition-all duration-700 w-[85%] py-3 px-8 rounded-xl font-semibold m-5"
                    >
                      Kaydet
                    </button>
                  </div>
                </>
              )}
              {modalContent === "yazı" && pageId === "students" && (
                <>
                  <h1 className="text-center font-semibold text-gray-600 my-3">
                    Öğrenciler Sayfası Yazı Değiştirme
                  </h1>
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
                      className="text-gray-100 bg-[#2b536c] hover:bg-gray-200 hover:text-[#2b536c] transition-all duration-700 w-[85%] py-3 px-8 rounded-xl font-semibold m-5"
                    >
                      Kaydet
                    </button>
                  </div>
                </>
              )}
              {modalContent === "yazı" && pageId === "features" && (
                <>
                  <h1 className="text-center font-semibold text-gray-600 my-3">
                    Dersler Sayfası Yazı Değiştirme
                  </h1>
                  <div className="flex flex-col items-center justify-center">
                    <div className="inputArea px-5">
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
                      className="text-gray-100 bg-[#2b536c] hover:bg-gray-200 hover:text-[#2b536c] transition-all duration-700 w-[85%] py-3 px-8 rounded-xl font-semibold m-5"
                    >
                      Kaydet
                    </button>
                  </div>
                </>
              )}
              {modalContent === "yazı" && pageId === "video" && (
                <>
                  <h1 className="text-center font-semibold text-gray-600 my-3">
                    Video Sayfası Yazı Değiştirme
                  </h1>
                  <div className="flex flex-col items-center justify-center">
                    <input
                      onChange={(event) =>
                        handleInputChangeInfo(event, "video")
                      }
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
                      className="text-gray-100 bg-[#2b536c] hover:bg-gray-200 hover:text-[#2b536c] transition-all duration-700 w-[85%] py-3 px-8 rounded-xl font-semibold m-5"
                    >
                      Kaydet
                    </button>
                  </div>
                </>
              )}
              {modalContent === "yazı" && pageId === "logoBanner" && (
                <>
                  <h1 className="text-center font-semibold text-gray-600 my-3">
                    Logo-Afiş Sayfası Yazı Değiştirme
                  </h1>
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
                      className="text-gray-100 bg-[#2b536c] hover:bg-gray-200 hover:text-[#2b536c] transition-all duration-700 w-[85%] py-3 px-8 rounded-xl font-semibold m-5"
                    >
                      Kaydet
                    </button>
                  </div>
                </>
              )}
              {modalContent === "yazı" && pageId === "banner" && (
                <>
                  <h1 className="text-center font-semibold text-gray-600 my-3">
                    Afiş Sayfası Yazı Değiştirme
                  </h1>
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
                      className="text-gray-100 bg-[#2b536c] hover:bg-gray-200 hover:text-[#2b536c] transition-all duration-700 w-[85%] py-3 px-8 rounded-xl font-semibold m-5"
                    >
                      Kaydet
                    </button>
                  </div>
                </>
              )}
              {modalContent === "yazı" && pageId === "informations" && (
                <>
                  <h1 className="text-center font-semibold text-gray-600 my-3">
                    Bilgiler Sayfası Yazı Değiştirme
                  </h1>
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
                      className="text-gray-100 bg-[#2b536c] hover:bg-gray-200 hover:text-[#2b536c] transition-all duration-700 w-[85%] py-3 px-8 rounded-xl font-semibold m-5"
                    >
                      Kaydet
                    </button>
                  </div>
                </>
              )}
              {modalContent === "yazı" && pageId === "footer" && (
                <div className="max-[768px]:max-h-[500px] overflow-scroll">
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
                      className="text-gray-100 bg-[#2b536c] hover:bg-gray-200 hover:text-[#2b536c] transition-all duration-700 w-[85%] py-3 px-8 rounded-xl font-semibold m-5"
                    >
                      Kaydet
                    </button>
                  </div>
                </div>
              )}
              {modalContent === "resim" && pageId === "logoBanner" && (
                <div className="flex flex-row flex-wrap items-center justify-center max-h-[600px] overflow-scroll">
                  <h1 className="text-gray-700 font-semibold">
                    Logo ve Afiş Sayfası Resim Düzenleme
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
                          className="text-gray-100 bg-[#2b536c] hover:bg-gray-200 hover:text-[#2b536c] transition-all duration-700 w-[85%] p-3 rounded-xl font-semibold m-5"
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
                    Öğrenciler Sayfası Resim Düzenleme
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
                      <button
                        type="submit"
                        className="text-gray-100 bg-[#2b536c] hover:bg-gray-200 hover:text-[#2b536c] transition-all duration-700 w-[85%] p-3 rounded-xl font-semibold m-5"
                      >
                        Kaydet
                      </button>
                    </form>
                  </div>
                </div>
              )}
              {modalContent === "resim" && pageId === "navbar" && (
                <div className="flex flex-col flex-wrap items-center justify-center p-5">
                  <h1 className="text-gray-700 font-semibold">
                    Gezinme Çubuğu Resim Düzenleme
                  </h1>
                  <div className="flex flex-col items-center justify-center">
                    <img
                      src={image.logo}
                      height={100}
                      width={200}
                      alt={`Logo`}
                    />
                    <form
                      onSubmit={handleSubmitLogo}
                      className="flex flex-col items-center justify-center"
                    >
                      <label htmlFor={`students`}>Resim Seçin:</label>
                      <input
                        onChange={handleImageChangeLogo}
                        type="file"
                        className="bg-gray-200 text-gray-600 font-semibold rounded-xl w-60"
                        id={`logo`}
                        name={`logo`}
                      />
                      <button
                        type="submit"
                        className="text-gray-100 bg-[#2b536c] hover:bg-gray-200 hover:text-[#2b536c] transition-all duration-700 w-[85%] p-3 rounded-xl font-semibold m-5"
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
                    Video Sayfası Resim Düzenleme
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
                      <button
                        type="submit"
                        className="text-gray-100 bg-[#2b536c] hover:bg-gray-200 hover:text-[#2b536c] transition-all duration-700 w-[85%] p-3 rounded-xl font-semibold m-5"
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
                    Anasayfa Resim Düzenleme
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
                      <button
                        type="submit"
                        className="text-gray-100 bg-[#2b536c] hover:bg-gray-200 hover:text-[#2b536c] transition-all duration-700 w-[85%] p-3 rounded-xl font-semibold m-5"
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
                    Bilgiler Sayfası Resim Düzenleme
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
                          <input
                            onChange={(e) =>
                              handleImageChangeInformations(e, index)
                            }
                            type="file"
                            className="bg-gray-200 text-gray-600 font-semibold rounded-xl w-48 mt-3"
                            id={`image${index}`}
                            name={`image${index}`}
                          />
                        </div>
                        <button
                          onClick={(e) => handleSubmitInformations(e, index)}
                          className="text-gray-100 bg-[#2b536c] hover:bg-gray-200 hover:text-[#2b536c] transition-all duration-700 w-[85%] p-3 rounded-xl font-semibold mt-3"
                        >
                          Kaydet
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {modalContent === "yer" && pageId === "main" && (
                <div className="flex flex-col flex-wrap items-center justify-center p-5">
                  <h1 className="text-gray-700 font-semibold text-center">
                    Anasayfa Yer Düzenleme
                  </h1>
                  <div className="flex flex-col lg:flex-row items-center justify-center">
                    <form
                      onSubmit={() => handleSubmit(event, pageId)}
                      className="imageSelectionForm"
                    >
                      <div className="imageAreaForPosition flex flex-col md:flex-row items-center justify-center mt-3">
                        <div className="img1 md:mr-3 mb-3 relative">
                          <label>
                            <input
                              className="absolute top-2 left-2 w-5 h-5"
                              type="radio"
                              name="imageSelection"
                              value="1"
                              onChange={(e) =>
                                setSelectedOption(e.target.value)
                              }
                            />
                            <Image
                              src={require("../../assets/image/dashboardImages/main1.png")}
                              width={300}
                              height={150}
                              className="w-96"
                            />
                            <h1 className=" bg-red-600 rounded-full w-7 h-7 flex items-center justify-center absolute top-2 right-2 font-semibold">
                              1
                            </h1>
                          </label>
                        </div>
                        <div className="img2 relative">
                          <label>
                            <input
                              className="absolute top-2 left-2 w-5 h-5"
                              type="radio"
                              name="imageSelection"
                              value="2"
                              onChange={(e) =>
                                setSelectedOption(e.target.value)
                              }
                            />
                            <Image
                              src={require("../../assets/image/dashboardImages/main2.png")}
                              width={300}
                              height={150}
                              className="w-96"
                            />
                            <h1 className=" bg-red-600 rounded-full w-7 h-7 flex items-center justify-center absolute top-2 right-2 font-semibold">
                              2
                            </h1>
                          </label>
                        </div>
                      </div>
                      <h1 className="selectedPosition text-gray-600 font-semibold text-center mt-3">
                        Seçilen Pozisyon: {selectedOption}
                      </h1>
                      <div className="w-full flex items-center justify-center">
                        <button
                          type="submit"
                          className="text-gray-100 bg-[#2b536c] hover:bg-gray-200 hover:text-[#2b536c] transition-all duration-700 w-[85%] font-bold py-2 px-4 rounded mt-3 object-center "
                        >
                          Kaydet
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
              {modalContent === "yer" && pageId === "students" && (
                <div className="flex flex-col flex-wrap items-center justify-center p-5">
                  <h1 className="text-gray-700 font-semibold text-center">
                    Öğrenciler Sayfası Yer Düzenleme
                  </h1>
                  <div className="flex flex-col lg:flex-row items-center justify-center">
                    <form
                      onSubmit={() => handleSubmit(event, pageId)}
                      className="imageSelectionForm"
                    >
                      <div className="imageAreaForPosition flex flex-col md:flex-row items-center justify-center mt-3">
                        <div className="img1 md:mr-3 mb-3 relative">
                          <label>
                            <input
                              className="absolute top-2 left-2 w-5 h-5"
                              type="radio"
                              name="imageSelection"
                              value="1"
                              onChange={(e) =>
                                setSelectedOption(e.target.value)
                              }
                            />
                            <Image
                              src={require("../../assets/image/dashboardImages/students1.png")}
                              width={300}
                              height={150}
                              className="w-96"
                            />
                            <h1 className=" bg-red-600 rounded-full w-7 h-7 flex items-center justify-center absolute top-2 right-2 font-semibold">
                              1
                            </h1>
                          </label>
                        </div>
                        <div className="img2 relative">
                          <label>
                            <input
                              className="absolute top-2 left-2 w-5 h-5"
                              type="radio"
                              name="imageSelection"
                              value="2"
                              onChange={(e) =>
                                setSelectedOption(e.target.value)
                              }
                            />
                            <Image
                              src={require("../../assets/image/dashboardImages/students2.png")}
                              width={300}
                              height={150}
                              className="w-96"
                            />
                            <h1 className=" bg-red-600 rounded-full w-7 h-7 flex items-center justify-center absolute top-2 right-2 font-semibold">
                              2
                            </h1>
                          </label>
                        </div>
                      </div>
                      <h1 className="selectedPosition text-gray-600 font-semibold text-center mt-3">
                        Seçilen Pozisyon: {selectedOption}
                      </h1>
                      <div className="w-full flex items-center justify-center">
                        <button
                          type="submit"
                          className="text-gray-100 bg-[#2b536c] hover:bg-gray-200 hover:text-[#2b536c] transition-all duration-700 w-[85%] font-bold py-2 px-4 rounded mt-3 object-center "
                        >
                          Kaydet
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
              {modalContent === "yer" && pageId === "video" && (
                <div className="flex flex-col flex-wrap items-center justify-center p-5">
                  <h1 className="text-gray-700 font-semibold text-center">
                    Video Sayfası Yer Düzenleme
                  </h1>
                  <div className="flex flex-col lg:flex-row items-center justify-center">
                    <form
                      onSubmit={() => handleSubmit(event, pageId)}
                      className="imageSelectionForm"
                    >
                      <div className="imageAreaForPosition flex flex-col md:flex-row items-center justify-center mt-3">
                        <div className="img1 md:mr-3 mb-3 relative">
                          <label>
                            <input
                              className="absolute top-2 left-2 w-5 h-5"
                              type="radio"
                              name="imageSelection"
                              value="1"
                              onChange={(e) =>
                                setSelectedOption(e.target.value)
                              }
                            />
                            <Image
                              src={require("../../assets/image/dashboardImages/video1.png")}
                              width={300}
                              height={150}
                              className="w-96"
                            />
                            <h1 className=" bg-red-600 rounded-full w-7 h-7 flex items-center justify-center absolute top-2 right-2 font-semibold">
                              1
                            </h1>
                          </label>
                        </div>
                        <div className="img2 relative">
                          <label>
                            <input
                              className="absolute top-2 left-2 w-5 h-5"
                              type="radio"
                              name="imageSelection"
                              value="2"
                              onChange={(e) =>
                                setSelectedOption(e.target.value)
                              }
                            />
                            <Image
                              src={require("../../assets/image/dashboardImages/video2.png")}
                              width={300}
                              height={150}
                              className="w-96"
                            />
                            <h1 className=" bg-red-600 rounded-full w-7 h-7 flex items-center justify-center absolute top-2 right-2 font-semibold">
                              2
                            </h1>
                          </label>
                        </div>
                      </div>
                      <h1 className="selectedPosition text-gray-600 font-semibold text-center mt-3">
                        Seçilen Pozisyon: {selectedOption}
                      </h1>
                      <div className="w-full flex items-center justify-center">
                        <button
                          type="submit"
                          className="text-gray-100 bg-[#2b536c] hover:bg-gray-200 hover:text-[#2b536c] transition-all duration-700 w-[85%] font-bold py-2 px-4 rounded mt-3 object-center "
                        >
                          Kaydet
                        </button>
                      </div>
                    </form>
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
            <div className="content flex flex-col items-center justify-center mx-5">
              {modalContent === "yazı" &&
                pageId === "navbar" &&
                selectedBigInputIndex !== null && (
                  <h1 className="text-gray-500 text-center font-semibold">
                    Alt Menüler
                  </h1>
                )}
              {modalContent === "buton" &&
                pageId === "courses" &&
                selectedBigInputIndex !== null && (
                  <h1 className="text-gray-500 text-center font-semibold">
                    Kurs Bilgileri
                  </h1>
                )}
              {modalContent === "buton" &&
                pageId === "main" &&
                selectedBigInputIndex !== null && (
                  <h1 className="text-gray-500 text-center font-semibold">
                    Anasayfa Buton Düzenleme
                  </h1>
                )}
              {modalContent === "buton" &&
                pageId === "students" &&
                selectedBigInputIndex !== null && (
                  <h1 className="text-gray-500 text-center font-semibold">
                    Öğrenciler Sayfası Buton Düzenleme
                  </h1>
                )}
              {modalContent === "buton" &&
                pageId === "banner" &&
                selectedBigInputIndex !== null && (
                  <h1 className="text-gray-500 text-center font-semibold">
                    Afiş Sayfası Buton Düzenleme
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
                      className="bg-gray-100 p-3 text-gray-600 font-semibold my-3 rounded-xl  w-full"
                    />
                    {menus[selectedBigInputIndex].items.map(
                      (item, itemIndex) => (
                        <div key={itemIndex} className="flex justify-between">
                          <input
                            onChange={(event) =>
                              handleInputChange(
                                event,
                                selectedBigInputIndex,
                                itemIndex
                              )
                            }
                            placeholder={item.name}
                            id="itemName"
                            type="text"
                            className="bg-gray-100 p-3 text-gray-600 font-semibold my-3 w-1/2 rounded-xl mr-2"
                          />
                          <input
                            onChange={(event) =>
                              handleInputChange(
                                event,
                                selectedBigInputIndex,
                                itemIndex
                              )
                            }
                            placeholder={item.address}
                            id="itemAddress"
                            type="text"
                            className="bg-gray-100 p-3 text-gray-600 font-semibold my-3 w-1/2 rounded-xl ml-2"
                          />
                        </div>
                      )
                    )}

                    <button
                      onClick={() => updateNavbar(menus[selectedBigInputIndex])}
                      className="text-gray-100 bg-[#2b536c] hover:bg-gray-200 hover:text-[#2b536c] transition-all duration-700 px-5 py-3 rounded-xl font-semibold my-3 w-full mt-0"
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
                          className="bg-gray-100 p-3 text-gray-600 font-semibold m-3 rounded-xl w-full"
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
                          className="bg-gray-100 p-3 text-gray-600 font-semibold m-3 rounded-xl w-full"
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
                          className="bg-gray-200 text-gray-600 font-semibold rounded-xl w-full"
                        />
                        <div className="flex  bg-gray-100 px-4 rounded-xl mt-3  w-full">
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
                        <div className="flex  bg-gray-100 px-4 rounded-xl mt-3  w-full">
                          <label
                            htmlFor="boxBorder"
                            className="text-gray-600 font-semibold mr-2 flex justify-center items-center"
                          >
                            Kutu Çerçeve Rengi:
                          </label>
                          <input
                            onChange={(event) =>
                              handleCourseInputChange(
                                event,
                                selectedBigInputIndex,
                                "boxBorder"
                              )
                            }
                            type="color"
                            className="bg-gray-100 text-gray-600 font-semibold m-3 rounded-xl"
                          />
                        </div>
                        <div className="flex  bg-gray-100 px-4 rounded-xl mt-3  w-full">
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
                        <div className="flex  bg-gray-100 px-4 rounded-xl mt-3  w-full">
                          <label
                            htmlFor="border"
                            className="text-gray-600 font-semibold mr-2 flex justify-center items-center"
                          >
                            Kutu Arka Plan Rengi:
                          </label>
                          <input
                            onChange={(event) =>
                              handleCourseInputChange(
                                event,
                                selectedBigInputIndex,
                                "boxBackground"
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
                          className="bg-gray-100 p-3 text-gray-600 font-semibold m-3 rounded-xl w-full"
                        />
                      </div>
                      <button
                        onClick={() =>
                          updateCourse(courses[selectedBigInputIndex])
                        }
                        className="text-gray-100 bg-[#2b536c] hover:bg-gray-200 hover:text-[#2b536c] transition-all duration-700 px-5 py-3 rounded-xl font-semibold my-3 mt-0 w-full"
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
                      <div className="detailInputs flex flex-col items-center justify-center mx-8">
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
                          className="bg-gray-100 p-3 text-gray-600 font-semibold my-3 w-full rounded-xl"
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
                          className="bg-gray-100 p-3 text-gray-600 font-semibold my-3 w-full rounded-xl"
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
                          className="bg-gray-200 text-gray-600 font-semibold rounded-xl w-full"
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
                          className="bg-gray-100 p-3 text-gray-600 font-semibold my-3 w-full rounded-xl"
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
                          className="bg-gray-100 p-3 text-gray-600 font-semibold my-3 w-full rounded-xl"
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
                          className="bg-gray-100 p-3 text-gray-600 font-semibold my-3 w-full rounded-xl"
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
                          className="bg-gray-100 p-3 text-gray-600 font-semibold my-3 w-full rounded-xl"
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
                          className="bg-gray-100 p-3 text-gray-600 font-semibold my-3 rounded-xl w-full"
                        />
                        <button
                          onClick={() =>
                            updateFeature(featured[selectedBigInputIndex])
                          }
                          className="text-gray-100 bg-[#2b536c] hover:bg-gray-200 hover:text-[#2b536c] transition-all duration-700  w-full px-5 py-3 rounded-xl font-semibold my-3 mt-0"
                        >
                          Kaydet
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}
              {modalContent === "buton" && pageId === "main" && (
                <div className="flex flex-col items-center justify-center">
                  <div className="inputArea ">
                    <div className="detailInputs flex flex-col items-center justify-center mx-8">
                      <input
                        onChange={(event) =>
                          handleButtonInputChange(
                            event,
                            selectedBigInputIndex,
                            "title",
                            pageId
                          )
                        }
                        placeholder={mainButtons[selectedBigInputIndex].title}
                        type="text"
                        className="bg-gray-100 p-3 text-gray-600 font-semibold my-3 mr-0 rounded-xl w-full focus:border-0  focus:outline-none"
                      />
                      <div className="flex  bg-gray-100 px-4 rounded-xl  w-full my-3">
                        <label
                          htmlFor="boxBorder"
                          className="text-gray-600 font-semibold mr-2 flex justify-center items-center"
                        >
                          Buton Rengi:
                        </label>
                        <input
                          onChange={(event) =>
                            handleButtonInputChange(
                              event,
                              selectedBigInputIndex,
                              "color",
                              pageId
                            )
                          }
                          type="color"
                          className="bg-gray-100 text-gray-600 font-semibold my-3 rounded-xl"
                        />
                      </div>
                      <div className="flex  bg-gray-100 px-4 rounded-xl  w-full my-3">
                        <label
                          htmlFor="boxBorder"
                          className="text-gray-600 font-semibold mr-2 flex justify-center items-center"
                        >
                          Yazı Rengi:
                        </label>
                        <input
                          onChange={(event) =>
                            handleButtonInputChange(
                              event,
                              selectedBigInputIndex,
                              "textColor",
                              pageId
                            )
                          }
                          type="color"
                          className="bg-gray-100 text-gray-600 font-semibold my-3 rounded-xl"
                        />
                      </div>
                      <div className="flex  bg-gray-100 px-4 rounded-xl  w-full my-3">
                        <label
                          htmlFor="boxBorder"
                          className="text-gray-600 font-semibold mr-2 flex justify-center items-center"
                        >
                          Hover Rengi:
                        </label>
                        <input
                          onChange={(event) =>
                            handleButtonInputChange(
                              event,
                              selectedBigInputIndex,
                              "hoverColor",
                              pageId
                            )
                          }
                          type="color"
                          className="bg-gray-100 text-gray-600 font-semibold my-3 rounded-xl"
                        />
                      </div>
                      <input
                        onChange={(event) =>
                          handleButtonInputChange(
                            event,
                            selectedBigInputIndex,
                            "addressLink",
                            pageId
                          )
                        }
                        placeholder={
                          mainButtons[selectedBigInputIndex].addressLink
                        }
                        type="text"
                        className="bg-gray-100 p-3 text-gray-600 font-semibold my-3 mr-0 rounded-xl w-full focus:border-0  focus:outline-none"
                      />
                      <button
                        onClick={() =>
                          updateButton(mainButtons[selectedBigInputIndex])
                        }
                        className="text-gray-100 bg-[#2b536c] hover:bg-gray-200 hover:text-[#2b536c] transition-all duration-700  w-full px-5 py-3 rounded-xl font-semibold my-3 mt-0"
                      >
                        Kaydet
                      </button>
                    </div>
                  </div>
                </div>
              )}
              {modalContent === "buton" && pageId === "students" && (
                <div className="flex flex-col items-center justify-center">
                  <div className="inputArea ">
                    <div className="detailInputs flex flex-col items-center justify-center mx-8">
                      <input
                        onChange={(event) =>
                          handleButtonInputChange(
                            event,
                            selectedBigInputIndex,
                            "title",
                            pageId
                          )
                        }
                        placeholder={
                          studentsButtons[selectedBigInputIndex].title
                        }
                        type="text"
                        className="bg-gray-100 p-3 text-gray-600 font-semibold my-3 mr-0 rounded-xl w-full focus:border-0  focus:outline-none"
                      />
                      <div className="flex  bg-gray-100 px-4 rounded-xl  w-full my-3">
                        <label
                          htmlFor="boxBorder"
                          className="text-gray-600 font-semibold mr-2 flex justify-center items-center"
                        >
                          Buton Rengi:
                        </label>
                        <input
                          onChange={(event) =>
                            handleButtonInputChange(
                              event,
                              selectedBigInputIndex,
                              "color",
                              pageId
                            )
                          }
                          type="color"
                          className="bg-gray-100 text-gray-600 font-semibold my-3 rounded-xl"
                        />
                      </div>
                      <div className="flex  bg-gray-100 px-4 rounded-xl  w-full my-3">
                        <label
                          htmlFor="boxBorder"
                          className="text-gray-600 font-semibold mr-2 flex justify-center items-center"
                        >
                          Yazı Rengi:
                        </label>
                        <input
                          onChange={(event) =>
                            handleButtonInputChange(
                              event,
                              selectedBigInputIndex,
                              "textColor",
                              pageId
                            )
                          }
                          type="color"
                          className="bg-gray-100 text-gray-600 font-semibold my-3 rounded-xl"
                        />
                      </div>
                      <div className="flex  bg-gray-100 px-4 rounded-xl  w-full my-3">
                        <label
                          htmlFor="boxBorder"
                          className="text-gray-600 font-semibold mr-2 flex justify-center items-center"
                        >
                          Hover Rengi:
                        </label>
                        <input
                          onChange={(event) =>
                            handleButtonInputChange(
                              event,
                              selectedBigInputIndex,
                              "hoverColor",
                              pageId
                            )
                          }
                          type="color"
                          className="bg-gray-100 text-gray-600 font-semibold my-3 rounded-xl"
                        />
                      </div>
                      <input
                        onChange={(event) =>
                          handleButtonInputChange(
                            event,
                            selectedBigInputIndex,
                            "addressLink",
                            pageId
                          )
                        }
                        placeholder={
                          studentsButtons[selectedBigInputIndex].addressLink
                        }
                        type="text"
                        className="bg-gray-100 p-3 text-gray-600 font-semibold my-3 mr-0 rounded-xl w-full focus:border-0  focus:outline-none"
                      />
                      <button
                        onClick={() =>
                          updateButton(studentsButtons[selectedBigInputIndex])
                        }
                        className="text-gray-100 bg-[#2b536c] hover:bg-gray-200 hover:text-[#2b536c] transition-all duration-700  w-full px-5 py-3 rounded-xl font-semibold my-3 mt-0"
                      >
                        Kaydet
                      </button>
                    </div>
                  </div>
                </div>
              )}
              {modalContent === "buton" && pageId === "banner" && (
                <div className="flex flex-col items-center justify-center">
                  <div className="inputArea ">
                    <div className="detailInputs flex flex-col items-center justify-center mx-8">
                      <input
                        onChange={(event) =>
                          handleButtonInputChange(
                            event,
                            selectedBigInputIndex,
                            "title",
                            pageId
                          )
                        }
                        placeholder={bannerButtons[selectedBigInputIndex].title}
                        type="text"
                        className="bg-gray-100 p-3 text-gray-600 font-semibold my-3 mr-0 rounded-xl w-full focus:border-0  focus:outline-none"
                      />
                      <div className="flex  bg-gray-100 px-4 rounded-xl  w-full my-3">
                        <label
                          htmlFor="boxBorder"
                          className="text-gray-600 font-semibold mr-2 flex justify-center items-center"
                        >
                          Buton Rengi:
                        </label>
                        <input
                          onChange={(event) =>
                            handleButtonInputChange(
                              event,
                              selectedBigInputIndex,
                              "color",
                              pageId
                            )
                          }
                          type="color"
                          className="bg-gray-100 text-gray-600 font-semibold my-3 rounded-xl"
                        />
                      </div>
                      <div className="flex  bg-gray-100 px-4 rounded-xl  w-full my-3">
                        <label
                          htmlFor="boxBorder"
                          className="text-gray-600 font-semibold mr-2 flex justify-center items-center"
                        >
                          Yazı Rengi:
                        </label>
                        <input
                          onChange={(event) =>
                            handleButtonInputChange(
                              event,
                              selectedBigInputIndex,
                              "textColor",
                              pageId
                            )
                          }
                          type="color"
                          className="bg-gray-100 text-gray-600 font-semibold my-3 rounded-xl"
                        />
                      </div>
                      <div className="flex  bg-gray-100 px-4 rounded-xl  w-full my-3">
                        <label
                          htmlFor="boxBorder"
                          className="text-gray-600 font-semibold mr-2 flex justify-center items-center"
                        >
                          Hover Rengi:
                        </label>
                        <input
                          onChange={(event) =>
                            handleButtonInputChange(
                              event,
                              selectedBigInputIndex,
                              "hoverColor",
                              pageId
                            )
                          }
                          type="color"
                          className="bg-gray-100 text-gray-600 font-semibold my-3 rounded-xl"
                        />
                      </div>
                      <input
                        onChange={(event) =>
                          handleButtonInputChange(
                            event,
                            selectedBigInputIndex,
                            "addressLink",
                            pageId
                          )
                        }
                        placeholder={
                          bannerButtons[selectedBigInputIndex].addressLink
                        }
                        type="text"
                        className="bg-gray-100 p-3 text-gray-600 font-semibold my-3 mr-0 rounded-xl w-full focus:border-0  focus:outline-none"
                      />
                      <button
                        onClick={() =>
                          updateButton(bannerButtons[selectedBigInputIndex])
                        }
                        className="text-gray-100 bg-[#2b536c] hover:bg-gray-200 hover:text-[#2b536c] transition-all duration-700  w-full px-5 py-3 rounded-xl font-semibold my-3 mt-0"
                      >
                        Kaydet
                      </button>
                    </div>
                  </div>
                </div>
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
                <h1 className="text-gray-600 text-center font-semibold ">
                  Kurs Ekle
                </h1>
                <div className="flex flex-col items-center justify-center">
                  <div className="inputArea ">
                    <div className="detailInputs flex flex-col items-center justify-center px-8">
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
                          className="bg-gray-100 p-3 text-gray-600 font-semibold my-3 rounded-xl w-full"
                        />
                        <input
                          onChange={(event) =>
                            handleAddCourseInputChange(event, "quantity")
                          }
                          type="text"
                          placeholder="Kurs sayısı"
                          className="bg-gray-100 p-3 text-gray-600 font-semibold my-3 rounded-xl w-full"
                        />
                        <div className="flex  bg-gray-100 px-4 mb-3 rounded-xl w-full">
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
                        <div className="flex  bg-gray-100 px-4 mb-3 rounded-xl w-full">
                          <label
                            htmlFor="border"
                            className="text-gray-600 font-semibold mr-2 flex justify-center items-center"
                          >
                            Kutu Çerçeve Rengi:
                          </label>
                          <input
                            onChange={(event) =>
                              handleAddCourseInputChange(event, "boxBorder")
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
                          className="bg-gray-200 text-gray-600 font-semibold rounded-xl w-full"
                        />
                        <div className="flex  bg-gray-100 px-4 rounded-xl mt-3 w-full">
                          <label
                            htmlFor="border"
                            className="text-gray-600 font-semibold mr-2 flex justify-center items-center"
                          >
                            İkon Arka Plan Rengi:
                          </label>
                          <input
                            onChange={(event) =>
                              handleAddCourseInputChange(event, "background")
                            }
                            type="color"
                            className="bg-gray-100 font-semibold m-3 rounded-xl"
                          />
                        </div>
                        <div className="flex  bg-gray-100 px-4 rounded-xl mt-3 w-full">
                          <label
                            htmlFor="border"
                            className="text-gray-600 font-semibold mr-2 flex justify-center items-center"
                          >
                            Kutu Arka Plan Rengi:
                          </label>
                          <input
                            onChange={(event) =>
                              handleAddCourseInputChange(event, "boxBackground")
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
                          className="bg-gray-100 p-3 text-gray-600 font-semibold my-3 rounded-xl w-full"
                        />
                        <button
                          type="submit"
                          className="text-gray-100 bg-[#2b536c] hover:bg-gray-200 hover:text-[#2b536c] transition-all duration-700 py-3 px-8 rounded-xl font-semibold mb-5 w-full"
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
                <h1 className="text-gray-600 text-center font-semibold ">
                  Ders Ekle
                </h1>
                <div className="flex flex-col items-center justify-center">
                  <div className="inputArea ">
                    <div className="detailInputs flex flex-col items-center justify-center mx-8">
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
                          className="bg-gray-100 p-3 text-gray-600 font-semibold my-3 rounded-xl w-full"
                        />

                        <input
                          onChange={(event) =>
                            handleAddFeatureInputChange(event, "name")
                          }
                          type="text"
                          placeholder={"Yayıncı"}
                          className="bg-gray-100 p-3 text-gray-600 font-semibold my-3 rounded-xl w-full"
                        />

                        <input
                          onChange={(event) =>
                            handleAddFeatureInputChange(event, "image")
                          }
                          type="file"
                          className="bg-gray-200 text-gray-600 font-semibold rounded-xl w-full"
                        />
                        <input
                          onChange={(event) =>
                            handleAddFeatureInputChange(event, "price")
                          }
                          type="number"
                          placeholder={"Ücret"}
                          className="bg-gray-100 p-3 text-gray-600 font-semibold my-3 rounded-xl w-full"
                        />
                        <input
                          onChange={(event) =>
                            handleAddFeatureInputChange(event, "star")
                          }
                          max={5}
                          type="number"
                          placeholder={"Yıldız"}
                          className="bg-gray-100 p-3 text-gray-600 font-semibold my-3 rounded-xl w-full"
                        />
                        <select
                          onChange={(event) =>
                            handleAddFeatureInputChange(event, "topDesc")
                          }
                          className="bg-gray-100 p-3 text-gray-600 font-semibold my-3 rounded-xl w-full"
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
                          className="bg-gray-100 p-3 text-gray-600 font-semibold my-3 rounded-xl w-full"
                        />
                        <input
                          onChange={(event) =>
                            handleAddFeatureInputChange(event, "lessons")
                          }
                          type="number"
                          placeholder={"Ders Sayısı"}
                          className="bg-gray-100 p-3 text-gray-600 font-semibold my-3 rounded-xl w-full"
                        />
                        <button
                          type="submit"
                          className="text-gray-100 bg-[#2b536c] hover:bg-gray-200 hover:text-[#2b536c] transition-all duration-700 py-3 px-8 rounded-xl font-semibold my-5 w-full"
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
                <h1 className="text-gray-600 text-center font-semibold ">
                  Menü Ekle
                </h1>
                <div className="flex flex-col items-center justify-center">
                  <div className="inputArea ">
                    <div className="detailInputs flex flex-col items-center justify-center mx-8">
                      <button
                        onClick={handleAddAnotherItem}
                        className="text-gray-100 bg-[#855da3] hover:text-[#855da3] hover:bg-gray-100 transition-all duration-700 w-full py-3 px-8 rounded-xl font-semibold my-5"
                      >
                        Alt Menü Ekle +
                      </button>
                      <form
                        onSubmit={handleAddNavbar}
                        className="flex flex-col items-center justify-center"
                      >
                        <input
                          onChange={(event) =>
                            handleAddNavbarInputChange(event, "name")
                          }
                          type="text"
                          placeholder="Menü ismi"
                          className="bg-gray-100 p-3 text-gray-600 font-semibold my-3 focus:outline-none rounded-xl w-full"
                        />
                        <input
                          onChange={(event) =>
                            handleAddNavbarInputChange(event, "address")
                          }
                          type="text"
                          placeholder="Menü Adresi"
                          className="bg-gray-100 p-3 text-gray-600 font-semibold my-3 focus:outline-none rounded-xl w-full"
                        />
                        {[...Array(underMenuCount)].map((_, index) => (
                          <div className="flex w-full" key={index}>
                            <input
                              onChange={(event) =>
                                handleAddNavbarInputChange(
                                  event,
                                  "itemsName",
                                  index
                                )
                              }
                              type="text"
                              placeholder={`Alt Menü ${index + 1}`}
                              className="bg-gray-100 p-3 text-gray-600 font-semibold my-3 focus:outline-none rounded-l-xl w-full"
                            />
                            <input
                              onChange={(event) =>
                                handleAddNavbarInputChange(
                                  event,
                                  "itemsAddress",
                                  index
                                )
                              }
                              type="text"
                              placeholder={`Alt Menü Adres ${index + 1}`}
                              className="bg-gray-100 p-3 text-gray-600 font-semibold my-3 focus:outline-none w-full"
                            />
                            <button
                              onClick={() => handleDeleteAnotherItem()}
                              className="bg-gray-100 py-3 px-5 text-red-600 font-semibold h-12 my-auto rounded-r-xl"
                            >
                              X
                            </button>
                          </div>
                        ))}

                        <button
                          type="submit"
                          className="text-gray-100 bg-[#2b536c] hover:bg-gray-200 hover:text-[#2b536c] transition-all duration-700 py-3 px-8 rounded-xl font-semibold my-5 w-full"
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
                <h1 className="text-gray-600 text-center font-semibold ">
                  Kategori Ekle
                </h1>
                <div className="flex flex-col items-center justify-center">
                  <div className="inputArea ">
                    <div className="detailInputs flex flex-col items-center justify-center mx-8">
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
                          className="bg-gray-100 p-3 text-gray-600 font-semibold my-3 rounded-xl w-full"
                        />

                        <button
                          type="submit"
                          className="text-gray-100 bg-[#2b536c] hover:bg-gray-200 hover:text-[#2b536c] transition-all duration-700 py-3 px-8 rounded-xl font-semibold my-5 w-full"
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
      {/* add button modal */}

      {addButton && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-gray-600 bg-opacity-50">
          <div className="relative mx-auto px-auto bg-white rounded-2xl animate__animated animate__fadeInDown w-80 lg:w-auto lg:max-w-[400px] lg:min-w-[400px]">
            <div className="flex flex-col px-3 mx-auto rounded-lg bg-bgWhite">
              <div className="flex flex-col md:flex-row justify-evenly items-center gap-x-2 lg:gap-x-5 mt-3 text-xs lg:text-sm ml-auto">
                <div className="flex items-center justify-center relative w-full ml-auto">
                  <div
                    className="w-5 h-5 md:w-10 md:h-10 rounded-md p-4 cursor-pointer transition-all duration-700  bg-gray-400/50 hover:bg-red-500 group  right-2 bottom-1"
                    onClick={closeAddButtonModal}
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
                <div className="flex flex-col items-center justify-center max-w-[250px] mx-5">
                  <h1 className="text-gray-700 font-semibold">Buton Ekle</h1>
                  <form
                    onSubmit={(event) => handleAddButton(event, pageId)}
                    className="flex flex-row flex-wrap items-center justify-center max-h-[500px] overflow-scroll"
                  >
                    <div className="inputArea">
                      <div className="bigInput flex flex-col items-center justify-center">
                        <input
                          onChange={(event) =>
                            handleAddButtonInputChange(event, "title", pageId)
                          }
                          placeholder="Buton Yazısı"
                          type="text"
                          className="bg-gray-100 p-3 text-gray-600 font-semibold my-3 mr-0 rounded-xl w-full focus:border-0  focus:outline-none"
                        />
                        <div className="flex  bg-gray-100 px-4 rounded-xl  w-full my-3">
                          <label
                            htmlFor="boxBorder"
                            className="text-gray-600 font-semibold mr-2 flex justify-center items-center"
                          >
                            Buton Rengi:
                          </label>
                          <input
                            onChange={(event) =>
                              handleAddButtonInputChange(event, "color", pageId)
                            }
                            type="color"
                            className="bg-gray-100 text-gray-600 font-semibold my-3 rounded-xl"
                          />
                        </div>
                        <div className="flex  bg-gray-100 px-4 rounded-xl  w-full my-3">
                          <label
                            htmlFor="boxBorder"
                            className="text-gray-600 font-semibold mr-2 flex justify-center items-center"
                          >
                            Yazı Rengi:
                          </label>
                          <input
                            onChange={(event) =>
                              handleAddButtonInputChange(
                                event,
                                "textColor",
                                pageId
                              )
                            }
                            type="color"
                            className="bg-gray-100 text-gray-600 font-semibold my-3 rounded-xl"
                          />
                        </div>
                        <div className="flex  bg-gray-100 px-4 rounded-xl  w-full my-3">
                          <label
                            htmlFor="boxBorder"
                            className="text-gray-600 font-semibold mr-2 flex justify-center items-center"
                          >
                            Hover Rengi:
                          </label>
                          <input
                            onChange={(event) =>
                              handleAddButtonInputChange(
                                event,
                                "hoverColor",
                                pageId
                              )
                            }
                            type="color"
                            className="bg-gray-100 text-gray-600 font-semibold my-3 rounded-xl"
                          />
                        </div>
                        <input
                          onChange={(event) =>
                            handleAddButtonInputChange(
                              event,
                              "addressLink",
                              pageId
                            )
                          }
                          placeholder="Buton Adresi"
                          type="text"
                          className="bg-gray-100 p-3 text-gray-600 font-semibold my-3 mr-0 rounded-xl w-full focus:border-0  focus:outline-none"
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="text-gray-100 bg-[#2b536c] hover:bg-gray-200 hover:text-[#2b536c] transition-all duration-700 w-full py-3 px-8 rounded-xl font-semibold my-5"
                    >
                      Kaydet
                    </button>
                  </form>
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
