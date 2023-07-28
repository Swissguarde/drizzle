import { firestore } from "@/firebase/clientApp";
import { Project } from "@/types";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import safeJsonStringify from "safe-json-stringify";

// export async function fetchAllprojects() {
//   try {
//     const projectsCollection = collection(firestore, "projects");
//     const querySnapshot = await getDocs(projectsCollection);
//     const projectsResult = querySnapshot.docs.map((doc) => ({
//       id: doc.id,
//       ...doc.data(),
//     }));
//     return projectsResult as Project[];
//   } catch (error: any) {
//     console.log("fetchAllprojectsError", error.message);
//   }
// }

export async function fetchAllProjects(category?: string | null) {
  try {
    let projectsRef = collection(firestore, "projects");
    let projectsQuery;

    if (category) {
      projectsQuery = query(projectsRef, where("category", "==", category));
    } else {
      projectsQuery = projectsRef;
    }

    const querySnapshot = await getDocs(projectsQuery);

    const projectsResult = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const data = JSON.parse(safeJsonStringify(projectsResult));

    return data;
  } catch (error: any) {
    console.log("fetchAllProjectsError", error.message);
  }
}

export async function getProjectDetail(id: string) {
  try {
    const projectsCollection = collection(firestore, "projects");
    const projectsDocRef = doc(projectsCollection, id);
    const projectsDocSnap = await getDoc(projectsDocRef);
    if (projectsDocSnap.exists()) {
      return JSON.parse(safeJsonStringify(projectsDocSnap.data()));
    } else {
      console.log("Project does not exist");
    }
  } catch (error: any) {
    console.log("getProjectDetailError", error.message);
  }
}

export async function getRelatedProjects(
  category: string,
  projectIdToExclude: string
) {
  try {
    const docRef = collection(firestore, "projects");

    const q = query(docRef, where("category", "==", category));
    const querySnapshot = await getDocs(q);
    const result: Project[] = [];
    querySnapshot.forEach((doc) => {
      if (doc.id !== projectIdToExclude) {
        result.push(JSON.parse(safeJsonStringify(doc.data())));
      }
    });
    return result;
  } catch (error: any) {
    console.log("getRelatedProjectsError", error.message);
  }
}

export async function getUserProjects(userId: string) {
  try {
    const projectsRef = collection(firestore, "projects");
    const q = query(projectsRef, where("creatorId", "==", userId));
    const querySnapshot = await getDocs(q);

    const projectsResult = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const projects = JSON.parse(safeJsonStringify(projectsResult));
    return projects;
  } catch (error: any) {
    console.log("getUserProjectsError", error.message);
  }
}

// async function fetchProjectsByUser(userId) {
//   const projectsRef = collection(db, "projects");

//   // Create a query to fetch projects by the given user ID
//   const q = query(projectsRef, where("userId", "==", userId));

//   // Execute the query
//   const querySnapshot = await getDocs(q);
//   const projects = [];

//   querySnapshot.forEach((doc) => {
//     projects.push({ id: doc.id, ...doc.data() });
//   });

//   return projects;
// }
