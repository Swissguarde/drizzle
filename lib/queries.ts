import { firestore } from "@/firebase/clientApp";
import { Post } from "@/types";
import { collection, getDocs } from "firebase/firestore";

export async function fetchAllPosts() {
  try {
    const postsCollection = collection(firestore, "posts");
    const querySnapshot = await getDocs(postsCollection);
    const postsResult = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return postsResult as Post[];
  } catch (error: any) {
    console.log("fetchAllPostsError", error.message);
  }
}
