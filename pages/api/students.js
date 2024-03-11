import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { classId } = req.query;

    if (!classId) {
      return res.status(400).json({ message: "Missing classId parameter" });
    }

    // Belirli bir sınıfa ait öğrencileri getirme işlemi
    const students = await prisma.student.findMany({
      where: {
        classId: parseInt(classId), // Eğer classId bir sayı değilse parseInt kullanabilirsiniz.
      },
    });
    res.status(200).json(students);
  } else if (req.method === "POST") {
    // Yeni öğrenci oluşturma işlemi
    const { name, email, classId } = req.body;
    const newStudent = await prisma.student.create({
      data: {
        name,
        email,
        classId,
      },
    });
    res.status(201).json(newStudent);
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
