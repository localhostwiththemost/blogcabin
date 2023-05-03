import { collection, addDoc } from "firebase/firestore";

// Add a document to the "blogCollection" collection
async function addBlog(db, blog) {
  const blogCollection = collection(db, "blogCollection");
  await addDoc(blogCollection, blog);
}

export { addBlog };
