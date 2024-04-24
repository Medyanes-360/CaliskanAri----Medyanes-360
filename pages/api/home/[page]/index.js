import { getAllData } from "@/services/serviceOperations";
import { PostHomeInfo } from "./posts";

async function homeHandler(req, res) {
  const section = req.url.split("/")[3];
  const requestMethod = req.method;

  switch (requestMethod) {
    case "GET":
      try {
        const data = await getAllData(section);
        return res.status(200).json(data);
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    case "PUT":
      switch (section) {
        case "HomeInfo":
          return PostHomeInfo({ section, req, res });
        default:
          return res
            .status(405)
            .end(`Bad request: ${section} is not a valid section`);
      }
    default:
      res.setHeader("Allow", ["GET", "PUT"]);
      return res.status(405).end(`Method ${requestMethod} Not Allowed`);
  }
}

export default homeHandler;
