import { create } from "zustand";

const useStore = create((set) => ({
  classes: [
    {
      id: 1,
      name: "Class 1",
      capacity: 30,
      grade: 4,
      section: "D",
      students: [
        { id: 1, name: "Student 1", email: "student1@example.com" },
        { id: 2, name: "Student 2", email: "student2@example.com" },
      ],
    },
    {
      id: 2,
      name: "Class 2",
      capacity: 25,
      grade: 7,
      section: "B",
      students: [
        { id: 3, name: "Student 3", email: "student3@example.com" },
        { id: 4, name: "Student 4", email: "student4@example.com" },
      ],
    },
    {
      id: 3,
      name: "Class 3",
      capacity: 28,
      grade: 5,
      section: "R",
      students: [
        { id: 5, name: "Student 5", email: "student5@example.com" },
        { id: 6, name: "Student 6", email: "student6@example.com" },
      ],
    },
    {
      id: 4,
      name: "Class 4",
      capacity: 32,
      grade: 1,
      section: "C",
      students: [
        { id: 7, name: "Student 7", email: "student7@example.com" },
        { id: 8, name: "Student 8", email: "student8@example.com" },
      ],
    },
    {
      id: 5,
      name: "Class 5",
      capacity: 27,
      grade: 6,
      section: "K",
      students: [
        { id: 9, name: "Student 9", email: "student9@example.com" },
        { id: 10, name: "Student 10", email: "student10@example.com" },
      ],
    },
    {
      id: 6,
      name: "Class 6",
      capacity: 29,
      grade: 5,
      section: "E",
      students: [
        { id: 11, name: "Student 11", email: "student11@example.com" },
        { id: 12, name: "Student 12", email: "student12@example.com" },
      ],
    },
    {
      id: 7,
      name: "Class 7",
      capacity: 26,
      grade: 7,
      section: "A",
      students: [
        { id: 13, name: "Student 13", email: "student13@example.com" },
        { id: 14, name: "Student 14", email: "student14@example.com" },
      ],
    },
    {
      id: 8,
      name: "Class 8",
      capacity: 31,
      grade: 2,
      section: "G",
      students: [
        { id: 15, name: "Student 15", email: "student15@example.com" },
        { id: 16, name: "Student 16", email: "student16@example.com" },
      ],
    },
    {
      id: 9,
      name: "Class 9",
      capacity: 24,
      grade: 3,
      section: "S",
      students: [
        { id: 17, name: "Student 17", email: "student17@example.com" },
        { id: 18, name: "Student 18", email: "student18@example.com" },
      ],
    },
    {
      id: 10,
      name: "Class 10",
      capacity: 30,
      grade: 7,
      section: "L",
      students: [
        { id: 19, name: "Student 19", email: "student19@example.com" },
        { id: 20, name: "Student 20", email: "student20@example.com" },
      ],
    },
  ],
  addClass: (formData) => {
    set((state) => {
      const newClass = {
        ...formData,
        id: state.classes.length + 1,
        students: [],
      };
      return { classes: [...state.classes, newClass] };
    });
  },

  editClass: (classId, editedValues) =>
    set((state) => {
      const updatedClasses = state.classes.map((classInfo) =>
        classInfo.id === classId ? { ...classInfo, ...editedValues } : classInfo
      );

      return { classes: updatedClasses };
    }),

  deleteClass: (classId) =>
    set((state) => ({
      classes: state.classes.filter((classInfo) => classInfo.id !== classId),
    })),
    
    addStudent: (classId, studentName, studentEmail) =>
  set((state) => {
    console.log('Updating state with new student:', classId, studentName, studentEmail);
    const updatedClasses = state.classes.map((classInfo) =>
      classInfo.id === classId
        ? {
            ...classInfo,
            students: [
              ...classInfo.students,
              { 
                id: classInfo.students.length + 1,
                name: studentName,
                email: studentEmail,
              },
            ],
          }
        : classInfo
    );

    return { classes: updatedClasses };
  }),

  deleteStudent: (classId, studentId) =>
    set((state) => ({
      classes: state.classes.map((classInfo) =>
        classInfo.id === classId
          ? {
              ...classInfo,
              students: classInfo.students.filter(
                (student) => student.id !== studentId
              ),
            }
          : classInfo
      ),
    })),
}));

export default useStore;
