import {
  getAllData,
  createNewDataMany,
  createNewData,
  deleteDataAll,
  updateDataByAny,
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
          data.students = parseInt(data.students);
          data.star = parseInt(data.star);
          data.lessons = parseInt(data.lessons);
          console.log(data);
          const response = await createNewData("HomeFeatured", data);
          console.log(response);
          return res.status(200).json({ message: "test", data: data });
        case "addCourse":
          data.quantity = parseInt(data.quantity);
          const responseForCourse = await createNewData(
            "HomeCoursesCard",
            data
          );
          console.log(responseForCourse);
          return res.status(200).json({ message: "test", data: data });
        case "addMenu":
          console.log(data);
          const responseForMenu = await createNewData("HomeMenus", data);
          console.log(responseForMenu);
          return res.status(200).json({ message: "test", data: data });
        case "addCategory":
          const responseForCategory = await createNewData(
            "HomeCategories",
            data
          );
          console.log(responseForCategory);
          return res.status(200).json({ message: "test", data: data });
        case "updateInfo":
          const idNumberForInfo = data[0]["id"];
          delete data[0]["id"];
          const responseForInfo = await updateDataByAny(
            "HomeInfo",
            { id: idNumberForInfo },
            data[0]
          );
          return res.status(200).json({ message: "test", data: data });
        case "addInfo":
          const responseForInfoo = await createNewData("HomeInfo", data);
          console.log(responseForInfoo);
          return res.status(200).json({ message: "test", data: data });
        case "addInformations":
          const responseForInfoformations = await createNewData(
            "HomeInformation",
            data
          );
          console.log(responseForInfoformations);
          return res.status(200).json({ message: "test", data: data });
        case "addFooterCourses":
          const responseForFooterCourses = await createNewData(
            "HomeFooterCourses",
            data
          );
          console.log(responseForFooterCourses);
          return res.status(200).json({ message: "test", data: data });
        case "addContact":
          const responseContact = await createNewData("HomeContact", data);
          console.log(responseContact);
          return res.status(200).json({ message: "test", data: data });
        case "addFooterResources":
          const responseForFooterResources = await createNewData(
            "HomeResources",
            data
          );
          console.log(responseForFooterResources);
          return res.status(200).json({ message: "test", data: data });
        case "addFooterContact":
          const responseForFooterContact = await createNewData(
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
          const responseImage = await createNewData("HomeImage", data);
          console.log(responseImage);
          return res.status(200).json({ message: "test", data: data });
        case "updateMenu":
          const idNumber = data["id"];
          delete data["id"];
          const responseUpdateMenu = await updateDataByAny(
            "HomeMenus",
            { id: idNumber },
            data
          );
          return res.status(200).json({ message: "test", data: data });
        case "updateCourse":
          data.quantity = parseInt(data.quantity);
          const idNumberCourse = data["id"];
          delete data["id"];
          const responseUpdateCourse = await updateDataByAny(
            "HomeCoursesCard",
            { id: idNumberCourse },
            data
          );
          console.log(responseUpdateCourse);
          return res.status(200).json({ message: "test", data: data });
        case "updateFeature":
          const idNumberFeature = data["id"];
          data.students = parseInt(data.students);
          data.star = parseInt(data.star);
          data.lessons = parseInt(data.lessons);
          delete data["id"];
          const responseUpdateFeature = await updateDataByAny(
            "HomeFeatured",
            { id: idNumberFeature },
            data
          );
          return res.status(200).json({ message: "test", data: data });
        case "updateLogoBanner":
          const idNumberLogoBanner = data["id"];
          delete data["id"];
          const responseUpdateLogoBanner = await updateDataByAny(
            "addLogoBanner",
            { id: idNumber },
            data
          );
          return res.status(200).json({ message: "test", data: data });
        case "updateFooterCourses":
          const deleteForUpdate = await deleteDataAll("HomeFooterCourses");
          const responseUpdateFooterCourses = await createNewDataMany(
            "HomeFooterCourses",
            data
          );
          console.log(responseUpdateFooterCourses);
          return res.status(200).json({ message: "test", data: data });
        case "updateFooterResources":
          console.log(data);
          const deleteForUpdate1 = await deleteDataAll("HomeResources");
          const responseUpdateFooterResources = await createNewDataMany(
            "HomeResources",
            data
          );
          console.log(responseUpdateFooterResources);
          return res.status(200).json({ message: "test", data: data });
        case "updateFooterContact":
          const idNumberFooterContact = data[0]["id"];
          delete data[0]["id"];
          const responseUpdateFooterContact = await updateDataByAny(
            "HomeContact",
            { id: idNumberFooterContact },
            data[0]
          );
          console.log(responseUpdateFooterContact);
          return res.status(200).json({ message: "test", data: data });
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "POST", "DELETE"]);
      return res.status(405).end(`Method ${requestMethod} Not Allowed`);
  }
}

export default homeHandler;
