import {
  getAllData,
  createNewDataMany,
  deleteDataByAny,
} from "@/services/serviceOperations";

async function homeHandler(req, res) {
  const section = req.url.split("/")[3];
  const requestMethod = req.method;
  const data = req.body;
  switch (requestMethod) {
    case "GET":
      try {
        const data = await getAllData(section);
        return res.status(200).json(data);
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    case "DELETE":
      switch (section) {
        case "deleteFeature":
          try {
            const response = await deleteDataByAny("HomeFeatured", {
              id: data,
            });
            return res.status(200).json(response);
          } catch (error) {
            return res.status(500).json({ error: error.message });
          }
        case "deleteCourse":
          try {
            const response = await deleteDataByAny("HomeCoursesCard", {
              id: data,
            });
            return res.status(200).json(response);
          } catch (error) {
            return res.status(500).json({ error: error.message });
          }
        case "deleteMenu":
          try {
            const response = await deleteDataByAny("HomeMenus", {
              id: data,
            });
            console.log(response);
            return res.status(200).json(response);
          } catch (error) {
            return res.status(500).json({ error: error.message });
          }
        case "deleteCategory":
          try {
            const response = await deleteDataByAny("HomeCategories", {
              id: data,
            });
            return res.status(200).json(response);
          } catch (error) {
            return res.status(500).json({ error: error.message });
          }
      }
    case "POST":
      switch (section) {
        case "HomeInfo":
          return;
        case "addFeature":
          data.forEach((course) => {
            course.students = parseInt(course.students);
            course.lessons = parseInt(course.lessons);
          });
          const response = await createNewDataMany("HomeFeatured", data);
          console.log(response);
          return res.status(200).json({ message: "test", data: data });
        case "addCourse":
          const responseForCourse = await createNewDataMany(
            "HomeCoursesCard",
            data
          );
          console.log(responseForCourse);
          return res.status(200).json({ message: "test", data: data });
        case "addMenu":
          const responseForMenu = await createNewDataMany("HomeMenus", data);

          console.log(responseForMenu);
          return res.status(200).json({ message: "test", data: data });
        case "addCategory":
          const responseForCategory = await createNewDataMany(
            "HomeCategories",
            data
          );
          console.log(responseForCategory);
          return res.status(200).json({ message: "test", data: data });
        case "addInfo":
          const responseForInfo = await createNewDataMany("HomeInfo", data);
          console.log(responseForInfo);
          return res.status(200).json({ message: "test", data: data });
        case "addInformations":
          const responseForInfoformations = await createNewDataMany(
            "HomeInformation",
            data
          );
          console.log(responseForInfoformations);
          return res.status(200).json({ message: "test", data: data });
        case "addFooterCourses":
          const responseForFooterCourses = await createNewDataMany(
            "HomeFooterCourses",
            data
          );
          console.log(responseForFooterCourses);
          return res.status(200).json({ message: "test", data: data });
        case "addFooterResources":
          const responseForFooterResources = await createNewDataMany(
            "HomeResources",
            data
          );
          console.log(responseForFooterResources);
          return res.status(200).json({ message: "test", data: data });
        case "addFooterContact":
          const responseForFooterContact = await createNewDataMany(
            "HomeContact",
            data
          );
          console.log(responseForFooterContact);
          return res.status(200).json({ message: "test", data: data });
        case "addLogoBanner":
          const responseForLogoBanner = await createNewDataMany(
            "HomeLogoBanner",
            data
          );
          console.log(responseForLogoBanner);
          return res.status(200).json({ message: "test", data: data });
        case "addImage":
          const responseImage = await createNewDataMany("HomeImage", data);
          console.log(responseImage);
          return res.status(200).json({ message: "test", data: data });
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "POST", "DELETE"]);
      return res.status(405).end(`Method ${requestMethod} Not Allowed`);
  }
}

export default homeHandler;
