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
  } else if (req.method === "DELETE") {
    const { studentId } = req.query;

    try {
      // Sınıfın var olup olmadığını kontrol edin
      const existingStudent = await prisma.student.findUnique({
        where: { id: studentId },
      });

      if (!existingStudent) {
        // Eğer sınıf mevcut değilse, 404 Bulunamadı sonucunu döndürün
        return res.status(404).json({ error: "Student not found" });
      }

      // Sınıf mevcutsa silin
      await prisma.student.delete({
        where: { id: studentId },
      });

      res.status(204).end(); // 204 İçerik Yok, yanıt gövdesi olmadan başarılı bir silme işlemini gösterir
    } catch (error) {
      console.error("Error deleting stundent:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
