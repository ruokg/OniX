// Import Firebase dependencies
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/9.6.2/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDY36HyaLbQ3xn27jnHfmhPsuwK9Tdv09Y",
  authDomain: "onix-proyect-4f8c5.firebaseapp.com",
  projectId: "onix-proyect-4f8c5",
  storageBucket: "onix-proyect-4f8c5.appspot.com",
  messagingSenderId: "520123890334",
  appId: "1:520123890334:web:4b8d8c485de82eec40198f"
};

// Initialize Firebase and Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Firestore functions
export const saveTask = (title, description, category) =>
  addDoc(collection(db, "tasks"), { title, description, category });

export const onGetTasks = (callback) =>
  onSnapshot(collection(db, "tasks"), callback);

export const deleteTask = (id) => deleteDoc(doc(db, "tasks", id));

export const getTask = (id) => getDoc(doc(db, "tasks", id));

export const updateTask = (id, newFields) =>
  updateDoc(doc(db, "tasks", id), newFields);

export const getTasks = () => getDocs(collection(db, "tasks"));

// DOM elements
const taskForm = document.getElementById("task-form");
const tasksContainer = document.getElementById("tasks-container");
const imagePreview = document.getElementById("image-preview");

let editStatus = false;
let id = "";

// Function to update image preview
const updateImagePreview = (url) => {
  if (url) {
    imagePreview.innerHTML = `<img src="${url}" alt="Image" style="max-width: 100%; height: auto;"/>`;
  } else {
    imagePreview.innerHTML = "";
  }
};

// Fetch and display tasks when the page loads
window.addEventListener("DOMContentLoaded", async (e) => {
  onGetTasks((querySnapshot) => {
    tasksContainer.innerHTML = "";
    querySnapshot.forEach((doc) => {
      const task = doc.data();
      tasksContainer.innerHTML += `
        <div class="product-card">
          <h3 class="h5">${task.title}</h3>
          <p>${task.description}</p>
          <p><strong>Categoría:</strong></p>
          <img src="${task.category}" alt="Image" style="max-width: 100%; height: auto;"/>
          <div>
            <button class="btn btn-primary btn-delete" data-id="${doc.id}">
              🗑 Delete
            </button>
            <button class="btn btn-secondary btn-edit" data-id="${doc.id}">
              🖉 Edit
            </button>
          </div>
        </div>`;
    });

    // Delete task event
    const btnsDelete = tasksContainer.querySelectorAll(".btn-delete");
    btnsDelete.forEach((btn) =>
      btn.addEventListener("click", async ({ target: { dataset } }) => {
        try {
          await deleteTask(dataset.id);
        } catch (error) {
          console.error(error);
        }
      })
    );

    // Edit task event
    const btnsEdit = tasksContainer.querySelectorAll(".btn-edit");
    btnsEdit.forEach((btn) => {
      btn.addEventListener("click", async (e) => {
        try {
          const doc = await getTask(e.target.dataset.id);
          const task = doc.data();
          taskForm["task-title"].value = task.title;
          taskForm["task-description"].value = task.description;
          taskForm["task-category"].value = task.category;

          updateImagePreview(task.category);

          editStatus = true;
          id = doc.id;
          taskForm["btn-task-form"].innerText = "Update";
        } catch (error) {
          console.error(error);
        }
      });
    });
  });
});

// Submit task form event
taskForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = taskForm["task-title"].value;
  const description = taskForm["task-description"].value;
  const category = taskForm["task-category"].value;

  try {
    if (!editStatus) {
      await saveTask(title, description, category);
    } else {
      await updateTask(id, {
        title,
        description,
        category,
      });

      editStatus = false;
      id = "";
      taskForm["btn-task-form"].innerText = "Save";
    }

    taskForm.reset();
    taskForm["task-title"].focus();
    updateImagePreview(""); // Clear the image preview
  } catch (error) {
    console.error(error);
  }
});

// Update image preview on input change
taskForm["task-category"].addEventListener("input", (e) => {
  updateImagePreview(e.target.value);
});
