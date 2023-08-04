import { firestore, storage } from "@/firebase/clientApp";
import { Project } from "@/types";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { revalidatePath } from "next/cache";
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
    revalidatePath("/");
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
      return JSON.parse(
        safeJsonStringify({
          id: projectsDocSnap.id,
          ...projectsDocSnap.data(),
        })
      );
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

export async function getUserProjects(
  userId: string,
  projectIdToExclude?: string
) {
  try {
    const projectsRef = collection(firestore, "projects");
    const q = query(projectsRef, where("creatorId", "==", userId));
    const querySnapshot = await getDocs(q);
    const projects: Project[] = [];

    querySnapshot.forEach((doc) => {
      if (doc.id !== projectIdToExclude) {
        projects.push(
          JSON.parse(
            safeJsonStringify({
              id: doc.id,
              ...doc.data(),
            })
          )
        );
      }
    });

    return projects;
  } catch (error: any) {
    console.log("getUserProjectsError", error.message);
  }
}

export async function onDeleteProject(project: Project): Promise<boolean> {
  try {
    if (project.imageURL) {
      const imageRef = ref(storage, `projects/${project.id}/image`);
      await deleteObject(imageRef);
    }
    const postDocRef = doc(firestore, "projects", project.id);
    await deleteDoc(postDocRef);
    revalidatePath(`/profile/dzPhwfvsFCSETbLibL8FCAZao283`);
  } catch (error) {
    return false;
  }
  return true;
}
