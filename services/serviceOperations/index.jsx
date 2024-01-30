// tableName: eşleşecek tablonun ismi
// where:     eşleşecek tablodaki verinin anahtar değeri örn: {email: "enes.gulcu@hotmail.com"} (mail) değeri oluyor.
// newData:   yeni eklenecek veya güncellenecek veri

import prisma from "@/lib/prisma/index";

// GET ALL
export async function getAllData(tableName) {
  try {
    const data = await prisma[tableName].findMany();
    return data;
  } catch (error) {
   return { error: error.message};
  }
}

// POST
export async function createNewData(tableName, newData) {
  try {
    const data = await prisma[tableName].create({ data: newData });
    return data;
  } catch (error) {
   return { error: error.message};
  }
}

// GET BY UNIQUE ONE VALUE
export async function getDataByUnique(tableName, where) {
  try {
    const data = await prisma[tableName].findUnique({ where:  where });
    return data;
  } catch (error) {
    return { error: error.message};
  }
}

// GET BY UNIQUE MANY VALUE
export async function getDataByMany(tableName, where) {
  try {
    const data = await prisma[tableName].findMany({ where:  where });
    return data;
  } catch (error) {
    return { error: error.message};
  }
}


// UPDATE
export async function updateDataByAny(tableName, where, newData) {
  try {
    const data = await prisma[tableName].update({
      where: where,
      data: newData,
    });
    return data;
  } catch (error) {
   return { error: error.message};
  }
}


//DELETE
export async function deleteDataByAny(tableName, where) {
  try {
    const data = await prisma[tableName].delete({ where: where });
    return data;
  } catch (error) {
   return  { error: error.message};
  }
}

//DELETE MANY
export async function deleteDataByMany(tableName, where) {
  try {
    const data = await prisma[tableName].deleteMany({where: where})
    return data;
  } catch (error) {
    return  { error: error.message};
  }
}

//DELETE ALL
export async function deleteDataAll(tableName) {
  try {
    const data = await prisma[tableName].deleteMany({})
    return data;
  } catch (error) {
    return  { error: error.message};
  }
}

export default {
  getAllData,

  createNewData,

  getDataByUnique,

  updateDataByAny,
  
  deleteDataByAny,

  deleteDataByMany,

  deleteDataAll
  
};