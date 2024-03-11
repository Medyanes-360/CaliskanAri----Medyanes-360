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
        capacity,
        grade,
        section,
      },
    });
    res.status(201).json(newClass);
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
