'use client';
import ConstantFormArrayField from '@/components/dashboard/panels/admin/edit/ConstantFormArrayField';
import './edit.css';
import { useEffect, useState } from 'react';
import ConstantFormField from '@/components/dashboard/panels/admin/edit/ConstantFormField';

function EditPage() {
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    // TODO: database'e tasinacak
    const json = localStorage.getItem('constants');
    if (json) {
      const jsonData = JSON.parse(json);
      setFormData(jsonData);
    }
  }, []);

  // Formda değiştirilen alan string ise bu çalışır
  const handleChange = (e) => {
    const { id, value } = e.target;
    const [formSection, field] = id.split('-');
    setFormData((prevState) => ({
      ...prevState,
      [formSection]: {
        ...prevState[formSection],
        [field]: value,
      },
    }));
  };

  // Eğer form alanı bir string dizisine karşılık geliyorsa stringify edip textbox'ta göster, kaydederken tekrar arraye dönüştür.
  const isArrayOfStrings = (string) => {
    const array = string.split(',');
    if (array.length > 1) {
      return array;
    }
    return null;
  };

  // Formda değiştirilen alan bir array ise bu çalışır
  const handleChangeArray = (e) => {
    const { id, value } = e.target;
    const [formSection, index, field] = id.split('-');
    setFormData((prevState) => ({
      ...prevState,
      [formSection]: prevState[formSection].map((item, itemIndex) => {
        if (parseInt(itemIndex) === parseInt(index)) {
          return {
            ...item,
            [field]: isArrayOfStrings(value) || value,
          };
        }
        return item;
      }),
    }));
  };

  return (
    <>
      <h1>Edit Home Page</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();

          // TODO: database'e tasinacak
          if (typeof window === 'undefined') return;
          localStorage.setItem('constants', JSON.stringify(formData));
          alert('form has been submitted');
        }}
      >
        <ConstantFormArrayField
          name="blogcard"
          fields={['by', 'date', 'image', 'role', 'title']}
          formData={formData}
          handleChangeArray={handleChangeArray}
        />

        <ConstantFormArrayField
          name="categories"
          fields={['name']}
          formData={formData}
          handleChangeArray={handleChangeArray}
        />

        <ConstantFormArrayField
          name="clients"
          fields={['comment', 'image', 'name', 'star']}
          formData={formData}
          handleChangeArray={handleChangeArray}
        />

        <ConstantFormField
          name="contact"
          fields={['address', 'mapUrl', 'phone']}
          formData={formData}
          handleChange={handleChange}
        />

        <ConstantFormArrayField
          name="coursesCard"
          fields={['quantity', 'title']}
          formData={formData}
          handleChangeArray={handleChangeArray}
        />

        <ConstantFormArrayField
          name="featured"
          fields={['image', 'name', 'price', 'star', 'title', 'topDesc']}
          formData={formData}
          handleChangeArray={handleChangeArray}
        />

        <ConstantFormArrayField
          name="footercourses"
          fields={['label']}
          formData={formData}
          handleChangeArray={handleChangeArray}
        />

        <ConstantFormField
          name="image"
          fields={[
            'banner',
            'bannerShape',
            'beInstractor',
            'beinstractor',
            'book',
            'crown',
            'dots',
            'graduation',
            'greyWave',
            'halfCricle',
            'logo',
            'mainSection',
            'moreDots',
            'pencil',
            'purpleCrown',
            'redCrown',
            'star',
            'studentPhoto',
            'underline',
            'videoCover',
            'wave',
          ]}
          formData={formData}
          handleChange={handleChange}
        />

        <ConstantFormField
          name="info"
          fields={[
            'bannerTitle1',
            'bannerTitle2',
            'beInstractorDesc',
            'beInstractorTitle1',
            'beInstractorTitle2',
            'blogDesc',
            'blogTitle1',
            'blogTitle2',
            'classCoursesDesc1',
            'classCoursesDesc2',
            'classCoursesTitle1',
            'classCoursesTitle2',
            'clientDesc',
            'clientTitle1',
            'clientTitle2',
            'desc1',
            'desc2',
            'featuredTitle1',
            'featuredTitle2',
            'instructorsDesc',
            'instructorsTitle1',
            'instructorsTitle2',
            'learnersStudentsDesc',
            'learnersStudentsTitle1',
            'learnersStudentsTitle2',
            'title',
            'video',
            'videoDesc1',
            'videoDesc2',
            'videoDesc3',
            'videoTitle1',
            'videoTitle2',
            'videoTitle3',
            'videoTitle4',
          ]}
          formData={formData}
          handleChange={handleChange}
        />

        <ConstantFormArrayField
          name="informations"
          fields={['description', 'title']}
          formData={formData}
          handleChangeArray={handleChangeArray}
        />

        <ConstantFormArrayField
          name="instructors"
          fields={['course', 'image', 'job', 'name', 'student']}
          formData={formData}
          handleChangeArray={handleChangeArray}
        />

        <ConstantFormArrayField
          name="logobanner"
          fields={['link', 'logo']}
          formData={formData}
          handleChangeArray={handleChangeArray}
        />

        <ConstantFormArrayField
          name="menus"
          fields={['name', 'items']}
          formData={formData}
          handleChangeArray={handleChangeArray}
        />

        <ConstantFormArrayField
          name="resources"
          fields={['label']}
          formData={formData}
          handleChangeArray={handleChangeArray}
        />

        <button className="submitButton" type="submit">
          Save
        </button>
      </form>
    </>
  );
}

export default EditPage;
