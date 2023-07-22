import { Timestamp } from "firebase/firestore";

interface FormState {
  title: string;
  description: string;
  liveSiteUrl: string;
  githubUrl: string;
  category: string;
}

interface Post {
  id: string;
  createdAt: Timestamp;
  creatorDisplayName: string;
  creatorId: string;
  description: string;
  githubUrl: string;
  imageURL: string;
  liveSiteUrl: string;
  title: string;
}
