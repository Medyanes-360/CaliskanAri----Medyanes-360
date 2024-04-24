import { getSession } from "next-auth/client";
import prisma from "../../../lib/prisma";
import { updateDataByAny } from "@/services/serviceOperations";

export async function PostHomeInfo(params) {
  const { section, req, res } = params;
  const session = await getSession({ req });
  const id = req.query.id;

  // Kullanıcı oturumu yoksa, 401 Unauthorized hatası gönder
  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (!req.body) {
    return res.status(400).json({ error: "Gerekli parametreler eksik." });
  }

  if (req.method === "PUT") {
    try {
      const {
        title,
        desc1,
        desc2,
        classCoursesTitle1,
        classCoursesTitle2,
        classCoursesDesc1,
        classCoursesDesc2,
        learnersStudentsTitle1,
        learnersStudentsTitle2,
        learnersStudentsDesc,
        featuredTitle1,
        featuredTitle2,
        video,
        videoTitle1,
        videoTitle2,
        videoTitle3,
        videoTitle4,
        videoDesc1,
        videoDesc2,
        videoDesc3,
        instructorsTitle1,
        instructorsTitle2,
        instructorsDesc,
        clientTitle1,
        clientTitle2,
        clientDesc,
        bannerTitle1,
        bannerTitle2,
        beInstractorTitle1,
        beInstractorTitle2,
        beInstractorDesc,
        blogTitle1,
        blogTitle2,
        blogDesc,
      } = req.body;

      // Gelen verilerin doğruluğunu kontrol et
      if (
        !title &&
        !desc1 &&
        !desc2 &&
        !classCoursesTitle1 &&
        !classCoursesTitle2 &&
        !classCoursesDesc1 &&
        !classCoursesDesc2 &&
        !learnersStudentsTitle1 &&
        !learnersStudentsTitle2 &&
        !learnersStudentsDesc &&
        !featuredTitle1 &&
        !featuredTitle2 &&
        !video &&
        !videoTitle1 &&
        !videoTitle2 &&
        !videoTitle3 &&
        !videoTitle4 &&
        !videoDesc1 &&
        !videoDesc2 &&
        !videoDesc3 &&
        !instructorsTitle1 &&
        !instructorsTitle2 &&
        !instructorsDesc &&
        !clientTitle1 &&
        !clientTitle2 &&
        !clientDesc &&
        !bannerTitle1 &&
        !bannerTitle2 &&
        !beInstractorTitle1 &&
        !beInstractorTitle2 &&
        !beInstractorDesc &&
        !blogTitle1 &&
        !blogTitle2 &&
        !blogDesc
      ) {
        return res.status(400).json({ error: "Missing required fields." });
      }

      // Yeni HomeInfo oluştur
      const createdHomeInfo = await updateDataByAny(
        "HomeInfo",
        { id: id },
        {
          title,
          desc1,
          desc2,
          classCoursesTitle1,
          classCoursesTitle2,
          classCoursesDesc1,
          classCoursesDesc2,
          learnersStudentsTitle1,
          learnersStudentsTitle2,
          learnersStudentsDesc,
          featuredTitle1,
          featuredTitle2,
          video,
          videoTitle1,
          videoTitle2,
          videoTitle3,
          videoTitle4,
          videoDesc1,
          videoDesc2,
          videoDesc3,
          instructorsTitle1,
          instructorsTitle2,
          instructorsDesc,
          clientTitle1,
          clientTitle2,
          clientDesc,
          bannerTitle1,
          bannerTitle2,
          beInstractorTitle1,
          beInstractorTitle2,
          beInstractorDesc,
          blogTitle1,
          blogTitle2,
          blogDesc,
        }
      );

      return res.status(201).json(createdHomeInfo);
    } catch (error) {
      console.error("Error creating HomeInfo:", error);
      return res.status(500).json({ error: "Error creating HomeInfo" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}
