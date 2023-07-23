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

    return projectsResult;
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
      return projectsDocSnap.data();
    } else {
      console.log("Project does not exist");
    }
  } catch (error: any) {
    console.log("getProjectDetailError", error.message);
  }
}
