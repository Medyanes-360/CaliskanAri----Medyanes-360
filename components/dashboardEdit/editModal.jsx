import React, { useState, useEffect } from "react";
import { SketchPicker } from "react-color";
import Image from "next/image";
import { postAPI } from "@/services/fetchAPI";

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
  const [categories, setCategories] = useState([
    { name: "All" },
    { name: "Art & Design" },
    { name: "Business" },
    { name: "Data Science" },
    { name: "Development" },
    { name: "Finance" },
    { name: "Health & Fitness" },
    { name: "Technology" },
  ]); //DERSLER KATEGORİLER
  const [menus, setMenus] = useState([
    {
      name: "Home",
      items: ["Home 01", "Home 02", "Home 03", "Home 04"],
    },
    {
      name: "Aktif Kurs",
      items: ["Course Layout", "Course Category"],
    },
    {
      name: "Events",
      items: ["All Events", "Events Details", "All Speaker", "Speaker Details"],
    },
    {
      name: "Shop",
      items: ["Shop", "Shop Details", "Cart", "Checkout"],
    },
    {
      name: "Pages",
      items: [
        "Elements",
        "About",
        "Instructor",
        "Instructor Profile",
        "Zoom Meeting",
        "Zoom Live Lesson",
        "Pricing Table",
        "FAQ Page",
        "404 Page",
      ],
    },
    {
      name: "Blogs",
      items: [
        "Blog Grid",
        "Blog List",
        "Post Standard",
        "Post Gallery",
        "Post Video",
      ],
    },
  ]); //SABİT OLAN VERİLERR BUNU DB DEN ÇEKECEĞİZ

  const [courses, setCourses] = useState([
    {
      title: "1. Sınıf",
      quantity: "1 Course",
      icon: "/one.png",
      border: "border-lightpurple",
      background: "linear-gradient(130deg,#7A66FF 0%,#EBDFFF 115%)",
    },
    {
      title: "2. Sınıf",
      quantity: "3 Aktif Kurs",
      icon: "/two.png",
      border: "border-cst_orange",
      background: "linear-gradient(130deg, #F57064 0%, #FFD0CC 115%)",
    },
    {
      title: "3. Sınıf",
      quantity: "2 Aktif Kurs",
      icon: "/three.png",
      border: "border-bluegreen",
      background: "linear-gradient(130deg, #45C8C2 0%, #B6F7F4 115%)",
    },
    {
      title: "4. Sınıf",
      quantity: "2 Aktif Kurs",
      icon: "/four.png",
      border: "border-cst_pink",
      background: "linear-gradient(130deg, #F480D4 0%, #FFD3F3 115%)",
    },
    {
      title: "5. Sınıf",
      quantity: "2 Aktif Kurs",
      icon: "/five.png",
      border: "border-lightgreen",
      background: "linear-gradient(130deg, #6ADE33 0%, #C8EFB6 115%)",
    },
    {
      title: "6. Sınıf",
      quantity: "2 Aktif Kurs",
      icon: "/six.png",
      border: "border-blue",
      background: "linear-gradient(130deg, #3FC6FF 0%, #D7F3FF 115%)",
    },
    {
      title: "7. Sınıf",
      quantity: "2 Aktif Kurs",
      icon: "/seven.png",
      border: "border-cst_yellow",
      background: " linear-gradient(130deg, #FFA41F 0%, #FFE3BB 115%)",
    },
    {
      title: "8. Sınıf",
      quantity: "3 Aktif Kurs",
      icon: "/eight.png",
      border: "border-lightpink",
      background: "linear-gradient(130deg, #E69E9E 0%, #F5D9E0 115%)",
    },
  ]); //SABİT OLAN KURSLAR

  const [info, setInfo] = useState({
    title: "Start Learning From Our Top Experts",
    desc1: "ÖĞRENİRKEN EĞLENİN",
    desc2:
      "Okul dönemlerinde her gün binlerce öğrencimiz, %100 MEB uyumlu Çalışkan Arı Akademi ile öğrendiklerini pekiştiriyor ve geliştiriyor.",
    classCoursesTitle1: "EĞLENDİRİRKEN ÖĞRETEN UYGULAMA",
    classCoursesTitle2: "Şimdi Eğitici Alıştırmaları Keşfet!",
    classCoursesDesc1:
      "Sınıf seviyenize ve müfredat ilerleyişine uygun ilerleyiş ve",
    classCoursesDesc2: "%100 MEB uyumlu alıştırmalar",
    learnersStudentsTitle1: "LEARNERS AND STUDENTS",
    learnersStudentsTitle2:
      "Evde, Okulda ve Nerede İstersen Orada, Alıştırmalar İle Pekiştirebilir ve Öğrenebilirsiniz.",
    learnersStudentsDesc:
      "Bilgiler okulda öğrenildiğinde, evde tekrar edildiğinde farklı akıllı alıştırmalar ile pekiştirildiğinde çok daha kalıcı olduğu ve unutulmadığı bilimsel olarak kanıtlanmıştır!",
    featuredTitle1: "ALIŞTIRMALAR",
    featuredTitle2: "Etkileşimli İçerikleri İncele",
    video: "https://www.youtube.com/watch?v=BwKLNfZhy3g",
    videoTitle1: "Çalışkan Arı 1. Sınıf 2. Dönem Seti Çıktı!",
    videoTitle2: "Kazanım Odaklı",
    videoTitle3: "Haftalık Tekrar",
    videoTitle4: "Serbest Etkinlik",
    videoDesc1:
      "Kazanım odaklı yeni nesil etkinlikler ile hem eğlenicek hem de öğrenicekler. Örnek çözümler ile konuyu anlama ve değerlendirme aşamaları ile verimli öğrenme yöntemleri.",
    videoDesc2:
      "Haftalık tekrar çalışmaları ile öğrendiklerini pekiştirecek ve alıştırmalar ile öğrencilerin bilgileri hep güncel tutulacak.",
    videoDesc3:
      "Serbest Etkinlik ile 'BiLabel, Bul, Çöz ve Eğlen' teması ile öğrenciler araştıracak, bulacak ve keşfedecekler.",
    instructorsTitle1: "OUR INSTRUCTORS",
    instructorsTitle2: "Greatest Teachers Inspire",
    instructorsDesc:
      "When An Unknown Printer Took A Galley Offer Area Type Scrambled To Make A Type Specimen Book.",
    clientTitle1: "OUR CLIENTS",
    clientTitle2: "What's Our Real Client Strories About Our Work & Passion",
    clientDesc:
      "When An Unknown Printer Took A Galley Of Type And Scrambled It To Make A Type SpecimenBook It Has Survived Not Only Five Centuries",
    bannerTitle1: "Dijital ve akıllı tahta içerikleri için ve",
    bannerTitle2: "Hizmetlerimiz hakkında daha fazla bilgi almak için",
    beInstractorTitle1: "BECOME AN INSTRUCTOR",
    beInstractorTitle2: "Let's Join Us & Spread Your Knowledge",
    beInstractorDesc:
      "When An Unknown Printer Took A Galley Offer Area Type And Scrambled To Make A Type Specimen Bookan Unknown Printer Took Alley Ffer Area Typey And Scrambled To Make A Type Specimen Book Hass",
    blogTitle1: "TOP ARTICLES",
    blogTitle2: "Want To Learn More? Read Blog",
    blogDesc:
      "When An Unknown Printer Took A Galley Of Type And Scrambled It To Make A Type Specimen Book It Has Survived Not Only Five Centuries",
  }); // SABİT BİLGİLERİ ALIDIĞIMIZ DEĞİŞKEN

  const [informations, setInformations] = useState([
    {
      icon: "/success.png",
      title: "Etkileşimli Öğrenme",
      description:
        "Öğrencilerin aktivite ve oyunlar ile deneyerek hem eğlendikleri hem de öğrendikleri eğitim sistemi.",
      color: "text-cst_green",
    },
    {
      icon: "/light.png",
      title: "İstatistikler ve Analizler",
      description:
        "Öğrencilerin etkileşimlerdeki başarı oranları, istatistikleri veren ve takip eden öğretmenlere özel altyapı.",
      color: "text-cst_yellow",
    },
    {
      icon: "/cup.png",
      title: "Öğretmenlere Özel Altyapı",
      description:
        "Öğretmenlerin kendi sınıflarını oluşturup öğrenciler ile sınıf süreçlerini yönetebildiği altyapı.",
      color: "text-cst_red",
    },
  ]); //İNFORMATİONS ALANI İÇİN SABİT VERİLER
  const [contact, setContact] = useState({
    phone: "(0212) 639 39 12",
    mapUrl: "https://maps.app.goo.gl/H4pa8u1oWw6HkHUe6",
    address: "463 7th Ave, NY 10018, USA",
  }); //FOOTER İLETİŞİM BİLGİLERİ

  const [resources, setResources] = useState([
    {
      label: "About",
    },
    {
      label: "Contact",
    },
    {
      label: "Refund",
    },
    {
      label: "Help Center",
    },
    {
      label: "Returns Policy",
    },
    {
      label: "Term Conditions",
    },
  ]); //FOOTER KAYNAKLAR DEĞİŞKENİ

  const [logobanner, setLogoBanner] = useState([
    {
      logo: "/main-logo-01.png",
      link: "https://www.meb.gov.tr/",
    },
    {
      logo: "/main-logo-02.png",
      link: "https://caliskanari.com.tr/",
    },
    {
      logo: "/main-logo-03.png",
      link: "https://kucukarilarakademisi.com/",
    },
    {
      logo: "/main-logo-04.png",
      link: "https://heydayenglish.com/",
    },
    {
      logo: "/main-logo-05.png",
      link: "https://caliskanari.com.tr/",
    },
  ]); //LOGO BANNER SAYFASINDAKİ RESİMLER
  const [image, setImage] = useState({
    logo: "https://www.radiustheme.com/demo/wordpress/themes/quiklearn/wp-content/uploads/2023/08/logo-dark.svg",
    mainSection: "/mainImage.png",
    underline:
      "https://www.radiustheme.com/demo/wordpress/themes/quiklearn/wp-content/uploads/2023/08/underline-shape.svg",
    pencil:
      "https://www.radiustheme.com/demo/wordpress/themes/quiklearn/wp-content/uploads/2023/08/hero-shape-4.svg",
    wave: "https://www.radiustheme.com/demo/wordpress/themes/quiklearn/wp-content/uploads/2023/08/hero-shape-3.svg",
    star: "https://www.radiustheme.com/demo/wordpress/themes/quiklearn/wp-content/uploads/2023/08/hero-shape-2.svg",
    book: "https://www.radiustheme.com/demo/wordpress/themes/quiklearn/wp-content/uploads/2023/08/hero-shape-1.svg",
    redCrown:
      "https://www.radiustheme.com/demo/wordpress/themes/quiklearn/wp-content/uploads/2023/08/shape2.svg",
    purpleCrown:
      "https://www.radiustheme.com/demo/wordpress/themes/quiklearn/wp-content/uploads/2023/08/shape3.svg",
    halfCricle:
      "https://www.radiustheme.com/demo/wordpress/themes/quiklearn/wp-content/uploads/2023/08/shape1.svg",
    dots: "https://www.radiustheme.com/demo/wordpress/themes/quiklearn/wp-content/themes/quiklearn/assets/element/course-cat-1.svg",
    greyWave:
      "https://www.radiustheme.com/demo/wordpress/themes/quiklearn/wp-content/themes/quiklearn/assets/element/course-cat.svg",
    studentPhoto: "/studentFinger.png",
    crown:
      "https://www.radiustheme.com/demo/wordpress/themes/quiklearn/wp-content/uploads/2023/08/about-shape-1.svg",
    moreDots:
      "https://www.radiustheme.com/demo/wordpress/themes/quiklearn/wp-content/uploads/2023/08/about-shape-1.svg",
    videoCover:
      "https://www.radiustheme.com/demo/wordpress/themes/quiklearn/wp-content/uploads/2023/08/video_banner_03.png",
    beInstractor:
      "https://www.radiustheme.com/demo/wordpress/themes/quiklearn/wp-content/uploads/2023/08/become-instructor.png",
    graduation:
      "https://www.radiustheme.com/demo/wordpress/themes/quiklearn/wp-content/uploads/2023/08/call-action-img1.png",
    banner:
      "https://www.radiustheme.com/demo/wordpress/themes/quiklearn/wp-content/uploads/2023/08/banner-shape1.svg",
    bannerShape:
      "https://www.radiustheme.com/demo/wordpress/themes/quiklearn/wp-content/uploads/2023/08/banner-shape1.svg",
    beinstractor:
      "https://www.radiustheme.com/demo/wordpress/themes/quiklearn/wp-content/uploads/2023/08/become-instructor.png",
  });
  const [footercourses, setFootercourses] = useState([
    {
      label: "Life Coach",
    },
    {
      label: "Business Coach",
    },
    {
      label: "Health Coach",
    },
    {
      label: "Development",
    },
    {
      label: "Web Design",
    },
    {
      label: "SEO Optimize",
    },
  ]); //FOOTER KURSLAR DEĞİŞKENİ
  const [featured, setFeatured] = useState([
    {
      title: "The Complete Android Development Course",
      name: "- Floyd Miles",
      image:
        "https://www.radiustheme.com/demo/wordpress/themes/quiklearn/wp-content/uploads/2023/07/crs_img_1-380x277.jpg",
      price: "",
      star: 0,
      topDesc: "Business",
    },
    {
      title: "The Complete Android Java Developer Course",
      name: "-  Millar Richard",
      image:
        "https://www.radiustheme.com/demo/wordpress/themes/quiklearn/wp-content/uploads/2023/07/crs_img_2-380x277.jpg",
      price: "",
      discount: "",
      star: 4,
      topDesc: "Technology",
      students: 11,
      lessons: 8,
    },
    {
      title: "The Complete WordPress Plugin Development Course",
      name: "-  Jenny Wilson",
      image:
        "https://www.radiustheme.com/demo/wordpress/themes/quiklearn/wp-content/uploads/2023/07/crs_img_3-380x277.jpg",
      price: "",
      star: 4,
      topDesc: "Development",
      students: 5,
      lessons: 6,
    },
    {
      title: "The Complete React Native Course",
      name: "- Floyd Miles",
      image:
        "https://www.radiustheme.com/demo/wordpress/themes/quiklearn/wp-content/uploads/2023/07/crs_img_5-380x277.jpg",
      price: "Free",
      star: 0,
      topDesc: "Finance",
      students: 7,
      lessons: 5,
    },
    {
      title: "JQuery and JavaScript Fundamental Course",
      name: "- Jenny Wilson",
      image:
        "https://www.radiustheme.com/demo/wordpress/themes/quiklearn/wp-content/uploads/2023/07/crs_img_4-380x277.jpg",
      price: "",
      star: 0,
      topDesc: "Business",
      students: 1,
      lessons: 5,
    },
    {
      title: "The Complete Cyber Security Course",
      name: "- Kristin Watson",
      image:
        "https://www.radiustheme.com/demo/wordpress/themes/quiklearn/wp-content/uploads/2023/07/crs_img_9-380x277.jpg",
      price: "",
      star: 0,
      topDesc: "Technology",
      students: 1,
      lessons: 0,
    },
    {
      title: "The Complete SEO & Digital Marketing Course",
      name: "- Millar Richard",
      image:
        "https://www.radiustheme.com/demo/wordpress/themes/quiklearn/wp-content/uploads/2023/07/crs_img_11-768x557.jpg",
      price: "",
      star: 5,
      topDesc: "Technology",
      students: 3,
      lessons: 0,
    },
    {
      title: "The Complete C and C++ Course for Beginners",
      name: "- Eleanor Pena",
      image:
        "https://www.radiustheme.com/demo/wordpress/themes/quiklearn/wp-content/uploads/2023/07/crs_img_8jpg-768x557.jpg",
      price: "",
      star: 0,
      topDesc: "Development",
      students: 0,
      lessons: 0,
    },
  ]); //FEATURED DEĞİŞKENİ
  const [newCourse, setNewCourse] = useState({
    title: "",
    quantity: "",
    icon: "",
    border: "",
    background: "",
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
      setNewCourse((prevCourse) => ({
        ...prevCourse,
        [field]: URL.createObjectURL(imageFile),
      }));
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
      setNewFeature((prevFeature) => ({
        ...prevFeature,
        [field]: URL.createObjectURL(imageFile),
      }));
    } else {
      setNewFeature((prevFeature) => ({
        ...prevFeature,
        [field]: value,
      }));
    }
  }; //YENİ DERS EKLEME

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

  const handleAddCourse = (event) => {
    event.preventDefault();
    setCourses((prevCourses) => [...prevCourses, newCourse]);
    setNewCourse({
      title: "",
      quantity: "",
      icon: "",
      border: "",
      background: "",
    });
    closeAddCourseModal();
  }; //YENİ KURS EKLEME

  const handleAddFeature = (event) => {
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
  const deleteNavbarMenu = (indexToDelete) => {
    setMenus((prevMenus) =>
      prevMenus.filter((menu, index) => index !== indexToDelete)
    );
  }; //NAVBAR DAN MENÜ SİLME

  const deleteCourse = (indexToDelete) => {
    setCourses((prevCourses) =>
      prevCourses.filter((menu, index) => index !== indexToDelete)
    );
  }; //KURS SİLME
  const deleteFeature = (indexToDelete) => {
    setFeatured((prevFeature) =>
      prevFeature.filter((menu, index) => index !== indexToDelete)
    );
  }; //DERS SİLME
  const deleteFeatureCategory = (indexToDelete) => {
    setCategories((prevFeatureCategories) =>
      prevFeatureCategories.filter((menu, index) => index !== indexToDelete)
    );
  }; //KATEGORİ SİLME
  const handleAddNavbar = (event) => {
    event.preventDefault();
    setMenus((prevMenus) => [...prevMenus, newNavbar]);
    setNewNavbar({
      name: "",
      items: [],
    });
    closeAddNavbarModal();
  }; // YENİ MENU EKLEME
  const handleAddFeatureCategory = (event) => {
    event.preventDefault();
    setCategories((prevFeatureCategories) => [
      ...prevFeatureCategories,
      newFeatureCategory,
    ]);
    setNewFeatureCategory({
      name: "",
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

  const handleSubmitBackgroundColor = (event, pageId) => {
    event.preventDefault();
    console.log(
      pageId + " sayfası" + " Seçilen arka plan rengi:" + selectedColor
    );
  }; //HER KISIM İÇİN PAGEID ALIP ONA GÖRE DB YE GÖNDERECEĞİZ ARKA PLAN RENGİNİ
  const handleSubmitTextColor = (event, pageId) => {
    event.preventDefault();
    console.log(
      pageId + " sayfası" + " Seçilen yazı rengi:" + selectedTextColor
    );
  }; //HER KISIM İÇİN PAGEID ALIP ONA GÖRE DB YE GÖNDERECEĞİZ YAZI RENGİNİ
  const handleSubmitNavbar = (event) => {
    event.preventDefault();
    console.log("Menüler:", menus);
    closeAddNavbarModal();
  }; //NAVBAR YAPTIĞIMIZ EKLEME DEĞİŞTİRME İŞLEMLERNİ KAYDEDEN FONKSİYON
  const handleSubmitCourses = (event) => {
    event.preventDefault();
    console.log("Kurslar:", courses);
    closeAddCourseModal();
  }; //KURSLARDA YAPTIĞIMIZ EKLEME DEĞİŞTİRME İŞLEMLERNİ KAYDEDEN FONKSİYON
  const handleSubmitFeature = async (event) => {
    event.preventDefault();
    console.log("Dersler:", featured);

    const response = await postAPI("/home/addFeature", featured);
    console.log("response: ", response);
    closeAddFeatureModal();
  }; //DERSELERE YAPTIĞIMIZ EKLEME DEĞİŞTİRME İŞLEMLERNİ KAYDEDEN FONKSİYON
  const handleSubmitFeatureCategory = (event) => {
    event.preventDefault();
    console.log("Kategoriler:", categories);
    closeAddFeatureCategoryModal();
  }; //DERSELERE YAPTIĞIMIZ EKLEME DEĞİŞTİRME İŞLEMLERNİ KAYDEDEN FONKSİYON
  const handleSubmitMainText = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const updatedTitle = formData.get("title") || info.title;
    const updatedDesc1 = formData.get("desc1") || info.desc1;
    const updatedDesc2 = formData.get("desc2") || info.desc2;

    const newInfo = {
      ...info,
      title: updatedTitle,
      desc1: updatedDesc1,
      desc2: updatedDesc2,
    };

    setInfo(newInfo);
    console.log(newInfo);
    onClose();
  }; // MAİN KISIMDAKİ YAZILARI GÜNCELLEYEN FONKSİYON
  const handleSubmitCourseText = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const updatedclassCoursesTitle1 =
      formData.get("classCoursesTitle1") || info.classCoursesTitle1;
    const updatedclassCoursesTitle2 =
      formData.get("classCoursesTitle2") || info.classCoursesTitle2;
    const updatedclassCoursesDesc1 =
      formData.get("classCoursesDesc1") || info.classCoursesDesc1;
    const updatedclassCoursesDesc2 =
      formData.get("classCoursesDesc2") || info.classCoursesDesc2;
    const newInfo = {
      ...info,
      classCoursesTitle1: updatedclassCoursesTitle1,
      classCoursesTitle2: updatedclassCoursesTitle2,
      classCoursesDesc1: updatedclassCoursesDesc1,
      classCoursesDesc2: updatedclassCoursesDesc2,
    };

    setInfo(newInfo);
    console.log(newInfo);
    onClose();
  }; // COURSES KISIMDAKİ YAZILARI GÜNCELLEYEN FONKSİYON

  const handleSubmitStudentsText = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const updatedlearnersStudentsTitle1 =
      formData.get("learnersStudentsTitle1") || info.learnersStudentsTitle1;
    const updatedlearnersStudentsTitle2 =
      formData.get("learnersStudentsTitle2") || info.learnersStudentsTitle2;
    const updatedlearnersStudentsDesc =
      formData.get("learnersStudentsDesc") || info.learnersStudentsDesc;
    const newInfo = {
      ...info,
      learnersStudentsTitle1: updatedlearnersStudentsTitle1,
      learnersStudentsTitle2: updatedlearnersStudentsTitle2,
      learnersStudentsDesc: updatedlearnersStudentsDesc,
    };

    setInfo(newInfo);
    console.log(newInfo);
    onClose();
  }; // STUDENTS KISIMDAKİ YAZILARI GÜNCELLEYEN FONKSİYON

  const handleSubmitFeaturesText = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const updatedfeaturedTitle1 =
      formData.get("featuredTitle1") || info.featuredTitle1;
    const updatedfeaturedTitle2 =
      formData.get("featuredTitle2") || info.featuredTitle2;
    const newInfo = {
      ...info,
      featuredTitle1: updatedfeaturedTitle1,
      featuredTitle2: updatedfeaturedTitle2,
    };

    setInfo(newInfo);
    console.log(newInfo);
    onClose();
  }; // STUDENTS KISIMDAKİ YAZILARI GÜNCELLEYEN FONKSİYON

  const handleSubmitVideoText = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const updatedvideo = formData.get("video") || info.video;
    const updatedvideoTitle1 = formData.get("videoTitle1") || info.videoTitle1;
    const updatedvideoTitle2 = formData.get("videoTitle2") || info.videoTitle2;
    const updatedvideoTitle3 = formData.get("videoTitle3") || info.videoTitle3;
    const updatedvideoTitle4 = formData.get("videoTitle4") || info.videoTitle4;
    const updatedvideoDesc1 = formData.get("videoDesc1") || info.videoDesc1;
    const updatedvideoDesc2 = formData.get("videoDesc2") || info.videoDesc2;
    const updatedvideoDesc3 = formData.get("videoDesc3") || info.videoDesc3;
    const newInfo = {
      ...info,
      video: updatedvideo,
      videoTitle1: updatedvideoTitle1,
      videoTitle2: updatedvideoTitle2,
      videoTitle3: updatedvideoTitle3,
      videoTitle4: updatedvideoTitle4,
      videoDesc1: updatedvideoDesc1,
      videoDesc2: updatedvideoDesc2,
      videoDesc3: updatedvideoDesc3,
    };

    setInfo(newInfo);
    console.log(newInfo);
    onClose();
  }; // VİDEO KISIMDAKİ YAZILARI GÜNCELLEYEN FONKSİYON

  const handleSubmitLogoBannerText = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const updatedclientTitle1 =
      formData.get("clientTitle1") || info.clientTitle1;
    const updatedclientTitle2 =
      formData.get("clientTitle2") || info.clientTitle2;
    const updatedclientDesc = formData.get("clientDesc") || info.clientDesc;
    const newInfo = {
      ...info,
      clientTitle1: updatedclientTitle1,
      clientTitle2: updatedclientTitle2,
      clientDesc: updatedclientDesc,
    };

    setInfo(newInfo);
    console.log(newInfo);
    onClose();
  }; // LOGO-BANNER KISIMDAKİ YAZILARI GÜNCELLEYEN FONKSİYON

  const handleSubmitBannerText = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const updatedbannerTitle1 =
      formData.get("bannerTitle1") || info.bannerTitle1;
    const updatedbannerTitle2 =
      formData.get("bannerTitle2") || info.bannerTitle2;
    const newInfo = {
      ...info,
      bannerTitle1: updatedbannerTitle1,
      bannerTitle2: updatedbannerTitle2,
    };

    setInfo(newInfo);
    console.log(newInfo);
    onClose();
  }; // BANNER KISIMDAKİ YAZILARI GÜNCELLEYEN FONKSİYON

  const handleSubmitInformationsText = (event) => {
    event.preventDefault();

    const updatedInformations = informations.map((info) => ({
      ...info,
      title: info.title !== "" ? info.title : info.title,
      description:
        info.description !== "" ? info.description : info.description,
      color: info.color !== "" ? info.color : info.color,
    }));

    setInformations(updatedInformations);
    console.log(informations);
    onClose();
  }; // INFORMATİONS KISIMDAKİ YAZILARI GÜNCELLEYEN FONKSİYON

  const handleSubmitFooterText = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const updatedphone = formData.get("phone") || info.phone;
    const updatedmapUrl = formData.get("mapUrl") || info.mapUrl;
    const updatedaddress = formData.get("address") || info.address;

    const newInfo = {
      phone: updatedphone,
      mapUrl: updatedmapUrl,
      address: updatedaddress,
    };
    const updatedResources = resources.map((resource) => ({
      ...resource,
      label: resource.label !== "" ? resource.label : resource.label,
    }));

    const updatedCourses = footercourses.map((footercourse) => ({
      ...footercourse,
      label:
        footercourse.label !== "" ? footercourse.label : footercourse.label,
    }));

    setFootercourses(updatedCourses);
    console.log(footercourses);

    setResources(updatedResources);
    console.log(resources);

    setContact(newInfo);
    console.log(newInfo);
    onClose();
  }; // FOOTER KISIMDAKİ YAZILARI GÜNCELLEYEN FONKSİYON

  const handleMainTextInputChange = (event, field) => {
    const { value } = event.target;
    setInfo((prevInfo) => ({
      ...prevInfo,
      [field]: value,
    }));
  };
  const handleCourseTextInputChange = (event, field) => {
    const { value } = event.target;
    setInfo((prevInfo) => ({
      ...prevInfo,
      [field]: value,
    }));
  };
  const handleStudentsTextInputChange = (event, field) => {
    const { value } = event.target;
    setInfo((prevInfo) => ({
      ...prevInfo,
      [field]: value,
    }));
  };
  const handleFeaturesTextInputChange = (event, field) => {
    const { value } = event.target;
    setInfo((prevInfo) => ({
      ...prevInfo,
      [field]: value,
    }));
  };
  const handleVideoTextInputChange = (event, field) => {
    const { value } = event.target;
    setInfo((prevInfo) => ({
      ...prevInfo,
      [field]: value,
    }));
  };
  const handleLogoBannerTextInputChange = (event, field) => {
    const { value } = event.target;
    setInfo((prevInfo) => ({
      ...prevInfo,
      [field]: value,
    }));
  };
  const handleBannerTextInputChange = (event, field) => {
    const { value } = event.target;
    setInfo((prevInfo) => ({
      ...prevInfo,
      [field]: value,
    }));
  };
  const handleInformationsTextInputChange = (event, field, index) => {
    const { value } = event.target;
    const updatedInformations = [...informations];
    updatedInformations[index] = {
      ...updatedInformations[index],
      [field]: value,
    };
    setInformations(updatedInformations);
  };
  const handleFooterTextInputChange = (event, field) => {
    const { value } = event.target;
    setInfo((prevInfo) => ({
      ...prevInfo,
      [field]: value,
    }));
  };
  const handleFooterResourcesTextInputChange = (event, field, index) => {
    const { value } = event.target;
    const updatedInformations = [...resources];
    updatedInformations[index] = {
      ...updatedInformations[index],
      [field]: value,
    };
    setResources(updatedInformations);
  };
  const handleFooterCoursesTextInputChange = (event, field, index) => {
    const { value } = event.target;
    const updatedInformations = [...footercourses];
    updatedInformations[index] = {
      ...updatedInformations[index],
      [field]: value,
    };
    setFootercourses(updatedInformations);
  };
  const handleImageChangeLogoBanner = (event, index) => {
    const imageFile = event.target.files[0];
    setSelectedImage(imageFile);
    setSelectedImageIndex(index);
  }; //LOGOBANNER RESİM DEĞİŞTİRME

  const handleSubmitImageLogoBanner = (event) => {
    event.preventDefault();
    if (selectedImage !== null && selectedImageIndex !== null) {
      setLogoBanner((prevLogobanner) => {
        const newLogobanner = [...prevLogobanner];
        newLogobanner[selectedImageIndex].logo =
          URL.createObjectURL(selectedImage);
        return newLogobanner;
      });
      console.log(logobanner);
      setSelectedImage(null);
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
    console.log(image);
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
    console.log(image);
  }; //VİDEO RESİM DEĞİŞTİRME
  const handleImageChangeMain = (event) => {
    const imageFile = event.target.files[0];
    setSelectedImageMain(imageFile);
    setImage((prevImage) => ({
      ...prevImage,
      mainSection: URL.createObjectURL(imageFile),
    }));
  }; //MAİN RESİM DEĞİŞTİRME

  const handleSubmitMain = (event) => {
    event.preventDefault();
    console.log(image);
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
  const handleSubmitInformations = (event, index) => {
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

    console.log("Updated Informations:", informations);
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
                            onClick={() => deleteNavbarMenu(menuIndex)}
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
                            onClick={() => deleteFeature(index)}
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
                            onClick={() => deleteFeatureCategory(index)}
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
                            onClick={() => deleteCourse(index)}
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
                  <form
                    onSubmit={handleSubmitMainText}
                    className="flex flex-col flex-wrap items-center justify-center"
                  >
                    <textarea
                      onChange={(event) =>
                        handleMainTextInputChange(event, "title")
                      }
                      placeholder={info.title}
                      type="text"
                      className="bg-gray-100 p-3 text-gray-600 font-semibold m-3 rounded-xl lg:w-96 h-36"
                    />
                    <textarea
                      onChange={(event) =>
                        handleMainTextInputChange(event, "desc1")
                      }
                      placeholder={info.desc1}
                      type="text"
                      className="bg-gray-100 p-3 text-gray-600 font-semibold m-3 rounded-xl lg:w-96 h-36"
                    />
                    <textarea
                      onChange={(event) =>
                        handleMainTextInputChange(event, "desc2")
                      }
                      placeholder={info.desc2}
                      type="text"
                      className="bg-gray-100 p-3 text-gray-600 font-semibold m-3 rounded-xl lg:w-96 h-36"
                    />
                    <button
                      type="submit"
                      className="text-gray-600 bg-gray-100 py-3 px-8 rounded-xl font-semibold m-5"
                    >
                      Kaydet
                    </button>
                  </form>
                </div>
              )}
              {modalContent === "yazı" && pageId === "courses" && (
                <div className="flex flex-col items-center justify-center">
                  <form
                    onSubmit={handleSubmitCourseText}
                    className="flex flex-col flex-wrap items-center justify-center"
                  >
                    <div className="inputArea flex items-center justify-center lg:flex-row flex-col">
                      <textarea
                        onChange={(event) =>
                          handleCourseTextInputChange(
                            event,
                            "classCoursesTitle1"
                          )
                        }
                        placeholder={info.classCoursesTitle1}
                        type="text"
                        className="bg-gray-100 p-3 text-gray-600 font-semibold m-3 rounded-xl w-48 lg:h-48 h-24"
                      />
                      <textarea
                        onChange={(event) =>
                          handleCourseTextInputChange(
                            event,
                            "classCoursesTitle2"
                          )
                        }
                        placeholder={info.classCoursesTitle2}
                        type="text"
                        className="bg-gray-100 p-3 text-gray-600 font-semibold m-3 rounded-xl w-48 lg:h-48 h-24"
                      />
                    </div>
                    <div className="flex items-center justify-center lg:flex-row flex-col">
                      <textarea
                        onChange={(event) =>
                          handleCourseTextInputChange(
                            event,
                            "classCoursesDesc1"
                          )
                        }
                        placeholder={info.classCoursesDesc1}
                        type="text"
                        className="bg-gray-100 p-3 text-gray-600 font-semibold m-3 rounded-xl w-48  lg:h-48 h-24"
                      />
                      <textarea
                        onChange={(event) =>
                          handleCourseTextInputChange(
                            event,
                            "classCoursesDesc2"
                          )
                        }
                        placeholder={info.classCoursesDesc2}
                        type="text"
                        className="bg-gray-100 p-3 text-gray-600 font-semibold m-3 rounded-xl w-48 lg:h-48 h-24"
                      />
                    </div>
                    <button
                      type="submit"
                      className="text-gray-600 bg-gray-100 py-3 px-8 rounded-xl font-semibold m-5"
                    >
                      Kaydet
                    </button>
                  </form>
                </div>
              )}
              {modalContent === "yazı" && pageId === "students" && (
                <div className="flex flex-col items-center justify-center">
                  <form
                    onSubmit={handleSubmitStudentsText}
                    className="flex flex-col flex-wrap items-center justify-center"
                  >
                    <textarea
                      onChange={(event) =>
                        handleStudentsTextInputChange(
                          event,
                          "learnersStudentsTitle1"
                        )
                      }
                      placeholder={info.learnersStudentsTitle1}
                      type="text"
                      className="bg-gray-100 p-3 text-gray-600 font-semibold m-3 rounded-xl w-[90%] lg:w-96 lg:h-36 h-24"
                    />
                    <textarea
                      onChange={(event) =>
                        handleStudentsTextInputChange(
                          event,
                          "learnersStudentsTitle2"
                        )
                      }
                      placeholder={info.learnersStudentsTitle2}
                      type="text"
                      className="bg-gray-100 p-3 text-gray-600 font-semibold m-3 rounded-xl w-[90%] lg:w-96 lg:h-36 h-24"
                    />
                    <textarea
                      onChange={(event) =>
                        handleStudentsTextInputChange(
                          event,
                          "learnersStudentsDesc"
                        )
                      }
                      placeholder={info.learnersStudentsDesc}
                      type="text"
                      className="bg-gray-100 p-3 text-gray-600 font-semibold m-3 rounded-xl w-[90%] lg:w-96 lg:h-36 h-24"
                    />

                    <button
                      type="submit"
                      className="text-gray-600 bg-gray-100 py-3 px-8 rounded-xl font-semibold m-5"
                    >
                      Kaydet
                    </button>
                  </form>
                </div>
              )}
              {modalContent === "yazı" && pageId === "features" && (
                <div className="flex flex-col items-center justify-center">
                  <form
                    onSubmit={handleSubmitFeaturesText}
                    className="flex flex-col flex-wrap items-center justify-center"
                  >
                    <div className="inputArea">
                      <input
                        onChange={(event) =>
                          handleFeaturesTextInputChange(event, "featuredTitle1")
                        }
                        placeholder={info.featuredTitle1}
                        type="text"
                        className="bg-gray-100 p-3 text-gray-600 font-semibold m-3 rounded-xl"
                      />
                      <input
                        onChange={(event) =>
                          handleFeaturesTextInputChange(event, "featuredTitle2")
                        }
                        placeholder={info.featuredTitle2}
                        type="text"
                        className="bg-gray-100 p-3 text-gray-600 font-semibold m-3 rounded-xl"
                      />
                    </div>

                    <button
                      type="submit"
                      className="text-gray-600 bg-gray-100 py-3 px-8 rounded-xl font-semibold m-5"
                    >
                      Kaydet
                    </button>
                  </form>
                </div>
              )}
              {modalContent === "yazı" && pageId === "video" && (
                <div className="flex flex-col items-center justify-center">
                  <form
                    onSubmit={handleSubmitVideoText}
                    className="flex lg:flex-row flex-wrap items-center justify-center max-h-[500px] overflow-scroll"
                  >
                    <input
                      onChange={(event) =>
                        handleVideoTextInputChange(event, "video")
                      }
                      placeholder={info.video}
                      type="text"
                      className="bg-gray-100 p-3 text-gray-600 font-semibold m-3 rounded-xl"
                    />
                    <input
                      onChange={(event) =>
                        handleVideoTextInputChange(event, "videoTitle1")
                      }
                      placeholder={info.videoTitle1}
                      type="text"
                      className="bg-gray-100 p-3 text-gray-600 font-semibold m-3 rounded-xl"
                    />
                    <div className="inputArea lg:flex">
                      <div className="flex flex-col items-center justify-center">
                        <input
                          onChange={(event) =>
                            handleVideoTextInputChange(event, "videoTitle2")
                          }
                          placeholder={info.videoTitle2}
                          type="text"
                          className="bg-gray-100 p-3 text-gray-600 font-semibold m-3 rounded-xl lg:w-44"
                        />
                        <textarea
                          onChange={(event) =>
                            handleVideoTextInputChange(event, "videoDesc1")
                          }
                          placeholder={info.videoDesc1}
                          type="text"
                          className="bg-gray-100 p-3 text-gray-600 font-semibold m-3 rounded-xl w-[92%] lg:h-48 h-24 lg:w-44"
                        />
                      </div>
                      <div className="flex flex-col items-center justify-center">
                        <input
                          onChange={(event) =>
                            handleVideoTextInputChange(event, "videoTitle3")
                          }
                          placeholder={info.videoTitle3}
                          type="text"
                          className="bg-gray-100 p-3 text-gray-600 font-semibold m-3 rounded-xl lg:w-44"
                        />
                        <textarea
                          onChange={(event) =>
                            handleVideoTextInputChange(event, "videoDesc2")
                          }
                          placeholder={info.videoDesc2}
                          type="text"
                          className="bg-gray-100 p-3 text-gray-600 font-semibold m-3 rounded-xl w-[92%]  lg:h-48 h-24 lg:w-44"
                        />
                      </div>
                      <div className="flex flex-col items-center justify-center">
                        <input
                          onChange={(event) =>
                            handleVideoTextInputChange(event, "videoTitle4")
                          }
                          placeholder={info.videoTitle4}
                          type="text"
                          className="bg-gray-100 p-3 text-gray-600 font-semibold m-3 rounded-xl lg:w-44"
                        />

                        <textarea
                          onChange={(event) =>
                            handleVideoTextInputChange(event, "videoDesc3")
                          }
                          placeholder={info.videoDesc3}
                          type="text"
                          className="bg-gray-100 p-3 text-gray-600 font-semibold m-3 rounded-xl w-[92%] lg:h-48 h-24 lg:w-44"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="text-gray-600 bg-gray-100 py-3 px-8 rounded-xl font-semibold m-5"
                    >
                      Kaydet
                    </button>
                  </form>
                </div>
              )}
              {modalContent === "yazı" && pageId === "logoBanner" && (
                <div className="flex flex-col items-center justify-center">
                  <form
                    onSubmit={handleSubmitLogoBannerText}
                    className="flex flex-col flex-wrap items-center justify-center"
                  >
                    <div className="inputArea flex flex-wrap items-center justify-center">
                      <input
                        onChange={(event) =>
                          handleLogoBannerTextInputChange(event, "clientTitle1")
                        }
                        placeholder={info.clientTitle1}
                        type="text"
                        className="bg-gray-100 p-3 text-gray-600 font-semibold m-3 rounded-xl"
                      />

                      <input
                        onChange={(event) =>
                          handleLogoBannerTextInputChange(event, "clientTitle2")
                        }
                        placeholder={info.clientTitle2}
                        type="text"
                        className="bg-gray-100 p-3 text-gray-600 font-semibold m-3 rounded-xl"
                      />
                      <textarea
                        onChange={(event) =>
                          handleLogoBannerTextInputChange(event, "clientDesc")
                        }
                        placeholder={info.clientDesc}
                        type="text"
                        className="bg-gray-100 p-3 text-gray-600 font-semibold m-3 rounded-xl w-[90%] h-48"
                      />
                    </div>

                    <button
                      type="submit"
                      className="text-gray-600 bg-gray-100 py-3 px-8 rounded-xl font-semibold m-5"
                    >
                      Kaydet
                    </button>
                  </form>
                </div>
              )}
              {modalContent === "yazı" && pageId === "banner" && (
                <div className="flex flex-col items-center justify-center">
                  <form
                    onSubmit={handleSubmitBannerText}
                    className="flex flex-col flex-wrap items-center justify-center"
                  >
                    <div className="inputArea">
                      <input
                        onChange={(event) =>
                          handleBannerTextInputChange(event, "bannerTitle1")
                        }
                        placeholder={info.bannerTitle1}
                        type="text"
                        className="bg-gray-100 p-3 text-gray-600 font-semibold m-3 rounded-xl"
                      />

                      <input
                        onChange={(event) =>
                          handleBannerTextInputChange(event, "bannerTitle2")
                        }
                        placeholder={info.bannerTitle2}
                        type="text"
                        className="bg-gray-100 p-3 text-gray-600 font-semibold m-3 rounded-xl"
                      />
                    </div>

                    <button
                      type="submit"
                      className="text-gray-600 bg-gray-100 py-3 px-8 rounded-xl font-semibold m-5"
                    >
                      Kaydet
                    </button>
                  </form>
                </div>
              )}
              {modalContent === "yazı" && pageId === "informations" && (
                <div className="flex flex-col items-center justify-center">
                  <form
                    onSubmit={handleSubmitInformationsText}
                    className="flex flex-col flex-wrap items-center justify-center"
                  >
                    <div className="inputArea lg:flex">
                      {informations.map((info, index) => (
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
                              placeholder={info.title}
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
                              placeholder={info.description}
                              className="bg-gray-100 p-3 text-gray-600 font-semibold m-3 rounded-xl w-48 lg:h-48 h-24"
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    <button
                      type="submit"
                      className="text-gray-600 bg-gray-100 py-3 px-8 rounded-xl font-semibold m-5"
                    >
                      Kaydet
                    </button>
                  </form>
                </div>
              )}
              {modalContent === "yazı" && pageId === "footer" && (
                <div className="flex flex-col items-center justify-center ">
                  <form
                    onSubmit={handleSubmitFooterText}
                    className="flex  flex-wrap items-center justify-center max-h-[800px] overflow-scroll"
                  >
                    <h1 className="text-left text-sm text-gray-600 font-semibold m-5 mb-0">
                      İletişim Bilgileri
                    </h1>
                    <div className="inputArea flex items-center justify-center flex-wrap">
                      <input
                        onChange={(event) =>
                          handleFooterTextInputChange(event, "phone")
                        }
                        placeholder={contact.phone}
                        type="text"
                        className="bg-gray-100 p-3 text-gray-600 font-semibold m-3 rounded-xl"
                      />

                      <input
                        onChange={(event) =>
                          handleFooterTextInputChange(event, "mapUrl")
                        }
                        placeholder={contact.mapUrl}
                        type="text"
                        className="bg-gray-100 p-3 text-gray-600 font-semibold m-3 rounded-xl"
                      />
                      <input
                        onChange={(event) =>
                          handleFooterTextInputChange(event, "address")
                        }
                        placeholder={contact.address}
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
                                handleFooterResourcesTextInputChange(
                                  event,
                                  "label",
                                  index
                                )
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
                                handleFooterCoursesTextInputChange(
                                  event,
                                  "label",
                                  index
                                )
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
                      type="submit"
                      className="text-gray-600 bg-gray-100 py-3 px-8 rounded-xl font-semibold m-5"
                    >
                      Kaydet
                    </button>
                  </form>
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
                        onSubmit={(event) =>
                          handleSubmitImageLogoBanner(event, index)
                        }
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
                selectedBigInputIndex !== null &&
                menus[selectedBigInputIndex].items.map((item, itemIndex) => (
                  <input
                    onChange={(event) =>
                      handleInputChange(event, selectedBigInputIndex, itemIndex)
                    }
                    key={itemIndex}
                    placeholder={item}
                    type="text"
                    className="bg-gray-100 p-3 text-gray-600 font-semibold m-3 rounded-xl"
                  />
                ))}
              {modalContent === "buton" && pageId === "courses" && (
                <>
                  <div className="flex flex-col items-center justify-center">
                    <div className="inputArea ">
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
                          type="text"
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
                          type="text"
                          placeholder={"Ücret"}
                          className="bg-gray-100 p-3 text-gray-600 font-semibold m-3 rounded-xl"
                        />
                        <input
                          onChange={(event) =>
                            handleAddFeatureInputChange(event, "star")
                          }
                          type="text"
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
                          type="text"
                          placeholder={"Öğrenci Sayısı"}
                          className="bg-gray-100 p-3 text-gray-600 font-semibold m-3 rounded-xl"
                        />
                        <input
                          onChange={(event) =>
                            handleAddFeatureInputChange(event, "lessons")
                          }
                          type="text"
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
