import { getAllData } from "@/services/serviceOperations";

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
    case "POST":
      switch (section) {
        case "HomeInfo":
          
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      return res.status(405).end(`Method ${requestMethod} Not Allowed`);
  }
}

export default homeHandler;
