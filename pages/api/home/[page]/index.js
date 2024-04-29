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
            console.log(data);
            const response = await deleteDataByAny("HomeFeatured", data);
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
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "POST", "DELETE"]);
      return res.status(405).end(`Method ${requestMethod} Not Allowed`);
  }
}

export default homeHandler;
