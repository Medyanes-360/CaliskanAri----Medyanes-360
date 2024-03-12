import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  if (req.method === "GET") {
    // Sınıfları getirme işlemi
    const classes = await prisma.class.findMany({
      include: {
        students: true,
      },
    });
    res.status(200).json(classes);
  } else if (req.method === "POST") {
    // Yeni sınıf oluşturma işlemi
    const { name, capacity, grade, section } = req.body;
    const newClass = await prisma.class.create({
      data: {
        name,
        grade,
        section,
      },
    });
    res.status(201).json(newClass);
  } else if (req.method === "DELETE") {
    const { classId } = req.query;

    try {
      // Sınıfın var olup olmadığını kontrol edin
      const existingClass = await prisma.class.findUnique({
        where: { id: classId },
      });

      if (!existingClass) {
        // Eğer sınıf mevcut değilse, 404 Bulunamadı sonucunu döndürün
        return res.status(404).json({ error: 'Class not found' });
      }

      // Sınıf mevcutsa silin
      await prisma.class.delete({
        where: { id: classId },
      });

      res.status(204).end(); // 204 İçerik Yok, yanıt gövdesi olmadan başarılı bir silme işlemini gösterir
    } catch (error) {
      console.error('Error deleting class:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
