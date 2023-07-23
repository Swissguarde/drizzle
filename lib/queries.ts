import { firestore } from "@/firebase/clientApp";
import { Project } from "@/types";
import { collection, getDocs, query, where } from "firebase/firestore";

// export async function fetchAllPosts() {
//   try {
//     const postsCollection = collection(firestore, "posts");
//     const querySnapshot = await getDocs(postsCollection);
//     const postsResult = querySnapshot.docs.map((doc) => ({
//       id: doc.id,
//       ...doc.data(),
//     }));
//     return postsResult as Project[];
//   } catch (error: any) {
//     console.log("fetchAllPostsError", error.message);
//   }
// }

export async function fetchAllPosts(category?: string | null) {
  try {
    let postsRef = collection(firestore, "posts");
    let postsQuery;

    if (category) {
      postsQuery = query(postsRef, where("category", "==", category));
    } else {
      postsQuery = postsRef;
    }

    const querySnapshot = await getDocs(postsQuery);

    const postsResult = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return postsResult;
  } catch (error: any) {
    console.log("fetchCategoryError", error.message);
  }
}
