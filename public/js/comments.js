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
export const saveTask = (title, description) =>
  addDoc(collection(db, "tasks"), { title, description });

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

let editStatus = false;
let id = "";

// Fetch and display tasks when the page loads
window.addEventListener("DOMContentLoaded", async (e) => {
  onGetTasks((querySnapshot) => {
    tasksContainer.innerHTML = "";
    querySnapshot.forEach((doc) => {
      const task = doc.data();
      tasksContainer.innerHTML += `
        <div class="card card-body mt-2 border-primary">
          <h3 class="h5">${task.title}</h3>
          <p>${task.description}</p>
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

  const title = taskForm["task-title"];
  const description = taskForm["task-description"];

  try {
    if (!editStatus) {
      await saveTask(title.value, description.value);
    } else {
      await updateTask(id, {
        title: title.value,
        description: description.value,
      });

      editStatus = false;
      id = "";
      taskForm["btn-task-form"].innerText = "Save";
    }

    taskForm.reset();
    title.focus();
  } catch (error) {
    console.error(error);
  }
});
